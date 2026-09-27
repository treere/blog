import { isLocale, type Locale } from '$lib/i18n';

export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	published?: boolean;
	locale: Locale;
	fallback?: boolean;
}

interface PostMetadata {
	title: string;
	date: string;
	description: string;
	published?: boolean;
}

const contentModules: Record<string, { metadata: PostMetadata }> = import.meta.glob(
	'/src/content/*.*.svx',
	{ eager: true }
);

function parsePath(path: string): { slug: string; locale: Locale } | null {
	const file = path.split('/').pop() ?? '';
	const match = file.match(/^(.+)\.(en|it)\.svx$/);
	if (!match) return null;
	const [, slug, lang] = match;
	if (!isLocale(lang)) return null;
	return { slug, locale: lang };
}

export function getSlugs(): { slug: string; locales: Locale[] }[] {
	const bySlug = new Map<string, Set<Locale>>();
	for (const path of Object.keys(contentModules)) {
		const parsed = parsePath(path);
		if (!parsed) continue;
		if (!bySlug.has(parsed.slug)) bySlug.set(parsed.slug, new Set());
		bySlug.get(parsed.slug)!.add(parsed.locale);
	}
	return [...bySlug.entries()].map(([slug, locales]) => ({ slug, locales: [...locales] }));
}

function resolveLocale(available: Locale[], wanted: Locale): Locale {
	if (available.includes(wanted)) return wanted;
	if (available.includes('en')) return 'en';
	return available[0];
}

function toPost(slug: string, actual: Locale, wanted: Locale): Post | null {
	const mod = contentModules[`/src/content/${slug}.${actual}.svx`];
	if (!mod || (mod.metadata.published ?? true) === false) return null;
	return {
		slug,
		title: mod.metadata.title,
		date: mod.metadata.date,
		description: mod.metadata.description,
		published: mod.metadata.published ?? true,
		locale: actual,
		fallback: actual !== wanted
	};
}

export function getPosts(locale: Locale): Post[] {
	return getSlugs()
		.map(({ slug, locales }) => toPost(slug, resolveLocale(locales, locale), locale))
		.filter((p): p is Post => p !== null)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostMeta(
	slug: string,
	locale: Locale
): { post: Post; contentPath: string } | null {
	const entry = getSlugs().find((e) => e.slug === slug);
	if (!entry) return null;
	const actual = resolveLocale(entry.locales, locale);
	const post = toPost(slug, actual, locale);
	if (!post) return null;
	return { post, contentPath: `/src/content/${slug}.${actual}.svx` };
}
