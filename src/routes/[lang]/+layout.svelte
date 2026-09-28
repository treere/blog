<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { getStrings, switchLocalePath, type Locale } from '$lib/i18n';

	let { children, data } = $props();
	const lang = $derived(data.lang as Locale);
	const t = $derived(getStrings(lang));

	let darkMode = $state(false);

	$effect(() => {
		document.documentElement.lang = lang;
	});

	onMount(() => {
		// Stato iniziale già impostato dallo script anti-FOUC in app.html
		darkMode = document.documentElement.classList.contains('dark');
		// Segui il sistema live solo se l'utente non ha scelto manualmente
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			if (localStorage.getItem('theme') === null) {
				darkMode = e.matches;
				applyTheme();
			}
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		applyTheme();
	}

	function applyTheme() {
		document.documentElement.classList.toggle('dark', darkMode);
	}

	const enHref = $derived(switchLocalePath(page.url.pathname, 'en'));
	const itHref = $derived(switchLocalePath(page.url.pathname, 'it'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{t.siteName}</title>
</svelte:head>

<a class="skip-link" href="#main-content">{lang === 'it' ? 'Salta al contenuto' : 'Skip to content'}</a>

<header class="site-header">
	<div class="header-content">
		<a href={resolve(`/${lang}` as '/')} class="logo">
			<img src={favicon} alt="" class="logo-icon" />
			{t.siteName}
		</a>
		<div class="header-actions">
			<nav class="lang-switch" aria-label="Language">
				<a
					href={resolve(enHref as '/')}
					hreflang="en"
					aria-current={lang === 'en' ? 'page' : undefined}
					aria-label="English version"
				>
					EN
				</a>
				<span aria-hidden="true">|</span>
				<a
					href={resolve(itHref as '/')}
					hreflang="it"
					aria-current={lang === 'it' ? 'page' : undefined}
					aria-label="Versione italiana"
				>
					IT
				</a>
			</nav>
			<button
				class="theme-toggle"
				onclick={toggleDarkMode}
				aria-label={t.toggleTheme}
				aria-pressed={darkMode}
				title={t.toggleTheme}
			>
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
	</div>
</header>

<main id="main-content" class="prose dark:prose-invert">
	{@render children()}
</main>

<footer class="site-footer">
	<p>© {new Date().getFullYear()} {t.footer}</p>
</footer>

<style>
	.header-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.lang-switch {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		font-weight: 600;
		border: 1px solid var(--border-color);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
	}
	.lang-switch a {
		color: var(--text-secondary);
		text-decoration: none;
	}
	.lang-switch a:hover {
		color: var(--text-primary);
	}
	.lang-switch a[aria-current='page'] {
		color: var(--text-primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.lang-switch span {
		color: var(--border-color);
		font-weight: 400;
	}
</style>
