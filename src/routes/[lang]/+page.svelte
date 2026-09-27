<script lang="ts">
	import { getPosts } from '$lib/utils/posts';
	import { formatDate, getStrings } from '$lib/i18n';
	import { resolve } from '$app/paths';

	let { data } = $props();
	const t = $derived(getStrings(data.lang));
	const posts = $derived(getPosts(data.lang));
</script>

<svelte:head>
	<title>{t.welcome} — {t.siteName}</title>
	<meta name="description" content={t.tagline} />
</svelte:head>

<div class="hero">
	<h1>{t.welcome}</h1>
	<p>{t.tagline}</p>
</div>

<section class="posts-section">
	<h2>{t.recentPosts}</h2>

	{#each posts as post (post.slug)}
		<a href={resolve(`/${data.lang}/${post.slug}` as '/')} class="post-card">
			<div class="flex items-center justify-between">
				<h3>{post.title}</h3>
				<time datetime={post.date}>{formatDate(post.date, data.lang)}</time>
			</div>
			<p>{post.description}</p>
			{#if post.fallback}
				<p class="fallback-badge">EN</p>
			{/if}
		</a>
	{/each}
</section>

<style>
	.hero {
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 2.5rem;
		font-weight: 700;
		letter-spacing: -0.04em;
		color: var(--text-primary);
		margin: 0 0 0.5rem 0;
		line-height: 1.1;
	}

	.hero p {
		color: var(--text-secondary);
		font-size: 1.1rem;
		margin: 0;
	}

	.posts-section h2 {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		font-weight: 500;
	}

	.posts-section {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.post-card {
		display: block;
		text-decoration: none;
		padding: 1.5rem;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.post-card:hover {
		text-decoration: none;
		border-color: var(--border-hover);
		box-shadow: 0 4px 20px var(--shadow-color);
		transform: translateY(-2px);
	}

	.post-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 0.5rem 0;
		letter-spacing: -0.02em;
	}

	.post-card time {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.post-card p {
		color: var(--text-secondary);
		font-size: 0.95rem;
		margin: 0.75rem 0 0 0;
		line-height: 1.6;
	}

	.fallback-badge {
		display: inline-block;
		font-size: 0.7rem;
		border: 1px solid var(--border-color);
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
		margin-top: 0.75rem;
	}
</style>
