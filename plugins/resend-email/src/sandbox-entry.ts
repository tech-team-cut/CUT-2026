import { definePlugin } from "emdash";

export function createPlugin(_options: Record<string, unknown>) {
	return definePlugin({
		id: "resend-email",
		version: "1.0.0",
		capabilities: ["email:provide", "network:fetch"],
		allowedHosts: ["api.resend.com"],
		hooks: {
			"email:deliver": {
				exclusive: true,
				handler: async ({ message }, ctx) => {
					const apiKey = await ctx.kv.get<string>("settings:apiKey");
					const from = await ctx.kv.get<string>("settings:from");

					if (!apiKey) throw new Error("[resend-email] API key not set in plugin KV");
					if (!from) throw new Error("[resend-email] From address not set in plugin KV");

					const res = await fetch("https://api.resend.com/emails", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${apiKey}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							from,
							to: message.to,
							subject: message.subject,
							text: message.text,
							...(message.html ? { html: message.html } : {}),
						}),
					});

					if (!res.ok) {
						const body = await res.text().catch(() => "(no body)");
						throw new Error(`[resend-email] Delivery failed (${res.status}): ${body}`);
					}
				},
			},
		},
	});
}
