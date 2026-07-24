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
				handler: async ({ message }, _ctx) => {
					const apiKey = process.env.RESEND_API_KEY;
					const from = process.env.RESEND_FROM;

					if (!apiKey) throw new Error("[resend-email] RESEND_API_KEY Worker secret not set — run: wrangler secret put RESEND_API_KEY");
					if (!from) throw new Error("[resend-email] RESEND_FROM Worker secret not set — run: wrangler secret put RESEND_FROM");

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
