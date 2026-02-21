<script lang="ts">
	import { getPosts } from '$lib/utils/posts';
	import type { Post } from '$lib/utils/posts';
	import { onMount } from 'svelte';

	const posts: Post[] = getPosts();

	let darkMode = $state(false);

	onMount(() => {
		const stored = localStorage.getItem('darkMode');
		if (stored !== null) {
			darkMode = stored === 'true';
		} else {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		applyTheme();
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('darkMode', String(darkMode));
		applyTheme();
	}

	function applyTheme() {
		document.documentElement.classList.toggle('dark', darkMode);
	}
</script>

<div class="hero">
	<h1>Welcome</h1>
	<p>Thoughts on programming, design, and technology.</p>
</div>

<section class="posts-section">
	<h2>Recent Posts</h2>

	{#each posts as post}
		<a href="/{post.slug}" class="post-card">
			<h3>{post.title}</h3>
			<time>{post.date}</time>
			<p>{post.description}</p>
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
</style>
