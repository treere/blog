import { error } from '@sveltejs/kit';
import { isLocale, type Locale } from '$lib/i18n';
import { getPostMeta, getSlugs } from '$lib/utils/posts';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return getSlugs().flatMap(({ slug }) => [
		{ lang: 'en', slug },
		{ lang: 'it', slug }
	]);
};

const contentModules = import.meta.glob('/src/content/*.*.svx');

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang as Locale;
	const { slug } = params;
	if (!isLocale(lang)) throw error(404, 'Language not supported');

	const meta = getPostMeta(slug, lang);
	if (!meta) throw error(404, 'Post not found');

	const loader = contentModules[meta.contentPath] as
		(() => Promise<{ default: unknown; metadata: unknown }>) | undefined;
	if (!loader) throw error(404, 'Post not found');
	const mod = await loader();

	return {
		lang,
		post: meta.post,
		Content: mod.default as ConstructorOfATypedSvelteComponent
	};
};
