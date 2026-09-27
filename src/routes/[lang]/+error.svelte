<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { getStrings, isLocale } from '$lib/i18n';

	let { data } = $props();
	const lang = $derived(
		isLocale(data?.lang) ? data.lang : page.url.pathname.startsWith('/it') ? 'it' : 'en'
	);
	const t = $derived(getStrings(lang));
</script>

<svelte:head>
	<title>{page.status} {t.notFoundTitle} — {t.siteName}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="not-found">
	<h1>{page.status} — {t.notFoundTitle}</h1>
	<p>{t.notFoundMessage}</p>
	<a href={resolve(`/${lang}` as '/')}>{t.backHome}</a>
</div>

<style>
	.not-found {
		text-align: center;
		padding: 3rem 0;
	}
	.not-found h1 {
		font-size: 1.75rem;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}
	.not-found p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
	}
</style>
