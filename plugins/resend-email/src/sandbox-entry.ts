import { definePlugin } from "emdash";

export default definePlugin({
	hooks: {
		"email:deliver": {
			exclusive: true,
			handler: async ({ message }, ctx) => {
				const apiKey = await ctx.kv.get<string>("settings:apiKey");
				const from = await ctx.kv.get<string>("settings:from");
				if (!apiKey) throw new Error("[resend-email] API key not configured — set it in Admin → Extensions → resend-email");
				if (!from) throw new Error("[resend-email] From address not configured — set it in Admin → Extensions → resend-email");

				const res = await ctx.http!.fetch("https://api.resend.com/emails", {
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
	admin: {
		settingsSchema: {
			apiKey: {
				type: "secret",
				label: "Resend API Key",
				description: "From resend.com dashboard → API Keys",
			},
			from: {
				type: "string",
				label: "From Address",
				description: "e.g. noreply@cms.cut.com.mx — must be on a verified Resend domain",
			},
		},
	},
});
