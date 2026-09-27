<script lang="ts">
	import { getStrings } from '$lib/i18n';
	import { resolve } from '$app/paths';

	let { data } = $props();
	const t = $derived(getStrings(data.lang));
	const Content = $derived(data.Content);
</script>

<svelte:head>
	<title>{data.post.title} — {t.siteName}</title>
	<meta name="description" content={data.post.description} />
	{#if data.post.fallback}
		<!-- evita indicizzazione duplicata del fallback -->
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<a href={resolve(`/${data.lang}` as '/')} class="back">← {t.siteName}</a>

{#if data.post.fallback}
	<aside class="fallback-notice" role="note">
		{t.missingTranslation}
	</aside>
{/if}

<article>
	<Content />
</article>

<style>
	.back {
		display: inline-block;
		margin-bottom: 1.5rem;
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
	}
	.back:hover {
		color: var(--text-primary);
	}
	.fallback-notice {
		border: 1px solid var(--border-color);
		background: var(--card-bg);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}
</style>
