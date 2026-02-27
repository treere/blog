<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

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

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Blog</title>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism-okaidia.min.css"
	/>
</svelte:head>

<header>
	<div class="header-content">
		<a href="/" class="logo">
			<img src={favicon} alt="" class="logo-icon" />
			Blog
		</a>
		<button class="theme-toggle" onclick={toggleDarkMode} aria-label="Toggle dark mode">
			{#if darkMode}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="5"></circle>
					<line x1="12" y1="1" x2="12" y2="3"></line>
					<line x1="12" y1="21" x2="12" y2="23"></line>
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
					<line x1="1" y1="12" x2="3" y2="12"></line>
					<line x1="21" y1="12" x2="23" y2="12"></line>
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
				</svg>
			{/if}
		</button>
	</div>
</header>

<main class="prose dark:prose-invert">
	{@render children()}
</main>

<footer>
	<p>© {new Date().getFullYear()} Blog</p>
</footer>
