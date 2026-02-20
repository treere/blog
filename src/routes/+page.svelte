<script lang="ts">
	import { getPosts } from '$lib/utils/posts';
	import type { Post } from '$lib/utils/posts';

	const posts: Post[] = getPosts();
</script>

<h1>My Blog</h1>

<section>
	{#each posts as post}
		<a href="/{post.slug}" class="post-link">
			<h2>{post.title}</h2>
			<time>{post.date}</time>
			<p>{post.description}</p>
		</a>
	{/each}
</section>

<style>
	h1 {
		margin-bottom: 2rem;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-link {
		display: block;
		text-decoration: none;
		color: inherit;
		transition: opacity 0.2s;
	}

	.post-link:hover {
		text-decoration: none;
		opacity: 0.7;
	}

	.post-link h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
	}

	.post-link time {
		font-size: 0.85rem;
		color: oklch(0.45 0 0);
	}

	.post-link p {
		margin: 0.5rem 0 0 0;
		color: oklch(0.45 0 0);
	}
</style>
