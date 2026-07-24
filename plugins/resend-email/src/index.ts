import type { PluginDescriptor } from "emdash";

export function resendEmail(): PluginDescriptor {
	return {
		id: "resend-email",
		version: "1.0.0",
		format: "native",
		entrypoint: "resend-email/sandbox",
		capabilities: ["email:provide", "network:fetch"],
		allowedHosts: ["api.resend.com"],
	};
}
