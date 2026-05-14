import { defineMiddleware } from "astro:middleware";
import { getEmDashCollection } from "emdash";

export const onRequest = defineMiddleware(async (context, next) => {
	if (context.url.pathname !== "/sitemap.xml") {
		return next();
	}

	const origin = context.url.origin;

	const [
		{ entries: licenciaturas },
		{ entries: maestrias },
		{ entries: posts },
		{ entries: pages },
	] = await Promise.all([
		getEmDashCollection("licenciaturas", {}),
		getEmDashCollection("maestrias", {}),
		getEmDashCollection("posts", { orderBy: { published_at: "desc" } }),
		getEmDashCollection("pages", {}),
	]);

	const staticRoutes = [
		{ loc: "/", priority: "1.0", changefreq: "weekly" },
		{ loc: "/licenciaturas", priority: "0.9", changefreq: "monthly" },
		{ loc: "/maestrias", priority: "0.9", changefreq: "monthly" },
		{ loc: "/posts", priority: "0.8", changefreq: "daily" },
		{ loc: "/ejercicio-profesional", priority: "0.7", changefreq: "monthly" },
		{ loc: "/congreso-2026", priority: "0.8", changefreq: "weekly" },
		{ loc: "/reglamento", priority: "0.5", changefreq: "yearly" },
	];

	const dynamicRoutes = [
		...licenciaturas
			.filter((e) => e.data.slug)
			.map((e) => ({ loc: `/licenciaturas/${e.data.slug}`, priority: "0.8", changefreq: "monthly" })),
		...maestrias
			.filter((e) => e.data.slug)
			.map((e) => ({ loc: `/maestrias/${e.data.slug}`, priority: "0.8", changefreq: "monthly" })),
		...posts
			.filter((e) => e.data.slug)
			.map((e) => ({ loc: `/posts/${e.data.slug}`, priority: "0.7", changefreq: "never" })),
		...pages
			.filter((e) => e.data.slug)
			.map((e) => ({ loc: `/${e.data.slug}`, priority: "0.6", changefreq: "monthly" })),
	];

	const rows = [...staticRoutes, ...dynamicRoutes]
		.map(
			(r) =>
				`  <url>\n    <loc>${origin}${r.loc}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
		)
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
});
