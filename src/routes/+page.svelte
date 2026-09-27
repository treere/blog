<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { getLocaleFromNavigator } from '$lib/i18n';

	onMount(async () => {
		const lang = getLocaleFromNavigator();
		await goto(resolve(`/${lang}` as '/'), { replaceState: true });
	});
</script>

<svelte:head>
	<title>Blog</title>
	<meta http-equiv="refresh" content="0; url=/en" />
</svelte:head>

<main class="prose">
	<p>
		<a href={resolve('/en' as '/')}>English</a> · <a href={resolve('/it' as '/')}>Italiano</a>
	</p>
</main>
