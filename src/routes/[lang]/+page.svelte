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
	<p class="tagline">{t.tagline}</p>
</div>

<section class="posts-section" aria-labelledby="recent-posts">
	<h2 id="recent-posts">{t.recentPosts} <span class="count">{posts.length}</span></h2>

	<ul class="post-list">
		{#each posts as post (post.slug)}
			<li>
				<a href={resolve(`/${data.lang}/${post.slug}` as '/')} class="post-card">
					<div class="post-top">
						<h3>{post.title}</h3>
						<span class="arrow" aria-hidden="true">→</span>
					</div>
					<p class="desc">{post.description}</p>
					<div class="meta">
						<time datetime={post.date}>{formatDate(post.date, data.lang)}</time>
						{#if post.fallback}
							<span class="fallback-badge" title={t.missingTranslation}>EN</span>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero {
		margin-bottom: 3rem;
		padding-top: 1rem;
	}

	.hero h1 {
		font-size: clamp(2.25rem, 6vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		color: var(--text-primary);
		margin: 0 0 0.6rem 0;
		line-height: 1.05;
		text-wrap: balance;
	}

	.tagline {
		color: var(--text-secondary);
		font-size: 1.1rem;
		margin: 0;
		max-width: 36ch;
		line-height: 1.6;
	}

	.posts-section h2 {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-muted);
		margin-bottom: 1.25rem;
		font-weight: 600;
	}

	.count {
		font-size: 0.72rem;
		font-weight: 700;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		color: var(--text-secondary);
		border-radius: 999px;
		padding: 0.05rem 0.55rem;
		letter-spacing: 0.02em;
	}

	.posts-section {
		display: flex;
		flex-direction: column;
	}

	.post-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.post-card {
		display: block;
		text-decoration: none;
		padding: 1.4rem 1.5rem 1.25rem;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 16px;
		transition:
			border-color 0.2s,
			box-shadow 0.25s,
			transform 0.25s,
			background 0.3s;
	}

	.post-card:hover {
		text-decoration: none;
		border-color: var(--border-hover);
		box-shadow: 0 8px 30px var(--shadow-color);
		transform: translateY(-2px);
	}
	.post-card:hover .arrow {
		transform: translateX(4px);
		color: var(--accent);
	}

	.post-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.post-card h3 {
		font-size: 1.2rem;
		font-weight: 650;
		color: var(--text-primary);
		margin: 0;
		letter-spacing: -0.02em;
		line-height: 1.35;
		text-wrap: pretty;
	}

	.arrow {
		flex-shrink: 0;
		color: var(--text-muted);
		font-size: 1.15rem;
		line-height: 1.4;
		transition:
			transform 0.2s,
			color 0.2s;
	}

	.desc {
		color: var(--text-secondary);
		font-size: 0.95rem;
		margin: 0.55rem 0 0 0;
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: 0.9rem;
	}

	.post-card time {
		font-size: 0.82rem;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}

	.fallback-badge {
		display: inline-block;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--text-secondary);
		border: 1px solid var(--border-color);
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
	}
</style>
