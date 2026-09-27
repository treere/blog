import { isLocale } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = async ({ params }) => {
	if (!isLocale(params.lang)) {
		const { error } = await import('@sveltejs/kit');
		throw error(404, 'Language not supported');
	}
	return { lang: params.lang };
};
