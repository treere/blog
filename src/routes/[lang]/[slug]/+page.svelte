<script lang="ts">
	import { formatDate, getStrings } from '$lib/i18n';
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

<a href={resolve(`/${data.lang}` as '/')} class="back">← {t.backHome}</a>

{#if data.post.fallback}
	<aside class="fallback-notice" role="note">
		<span aria-hidden="true">🌐</span>
		{t.missingTranslation}
	</aside>
{/if}

<div class="post-meta">
	<time datetime={data.post.date}>{formatDate(data.post.date, data.lang)}</time>
	<p class="lede">{data.post.description}</p>
</div>

<article class="post-body">
	<Content />
</article>

<style>
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-bottom: 1.75rem;
		color: var(--text-secondary);
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 999px;
		padding: 0.4rem 0.95rem;
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 500;
		transition:
			color 0.2s,
			border-color 0.2s,
			transform 0.2s;
	}
	.back:hover {
		color: var(--text-primary);
		border-color: var(--border-hover);
		transform: translateX(-2px);
	}
	.fallback-notice {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		border: 1px solid var(--border-color);
		border-left: 3px solid var(--accent);
		background: var(--card-bg);
		border-radius: 0 12px 12px 0;
		padding: 0.85rem 1.1rem;
		margin-bottom: 1.75rem;
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--text-secondary);
	}
	.post-meta {
		margin-bottom: 0.5rem;
	}
	.post-meta time {
		font-size: 0.85rem;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 600;
	}
	.lede {
		font-size: 1.15rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin: 0.5rem 0 0 0;
		text-wrap: pretty;
	}
	.post-body {
		margin-top: 1rem;
	}
	/* Riduci il margine dell'H1 del markdown: il lede fa già da sottotitolo */
	.post-body :global(h1):first-child {
		margin-top: 1.5rem;
	}
</style>
