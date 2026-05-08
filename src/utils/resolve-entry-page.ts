import { getEmDashEntry, getSeoMeta, decodeSlug, getSiteSettings } from "emdash";
import { resolveStarterSiteIdentity } from "./site-identity";

type EntryPageResult =
	| { found: true; entry: any; cacheHint: any; seo: any; slug: string }
	| { found: false };

export async function resolveEntryPage(
	collection: string,
	rawSlug: string | undefined,
	siteUrl: string,
	makePath: (slug: string) => string,
): Promise<EntryPageResult> {
	const slug = decodeSlug(rawSlug);
	if (!slug) return { found: false };

	const { entry, cacheHint } = await (getEmDashEntry as any)(collection, slug);
	if (!entry) return { found: false };

	const { siteTitle } = resolveStarterSiteIdentity(await getSiteSettings());
	const seo = getSeoMeta(entry, { siteTitle, siteUrl, path: makePath(slug) });

	return { found: true, entry, cacheHint, seo, slug };
}
