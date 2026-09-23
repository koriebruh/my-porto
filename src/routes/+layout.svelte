<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import BackToTop from '$lib/components/back-to-top.svelte';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import StickyNav from '$lib/components/sticky-nav.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<StickyNav />
{@render children()}
<BackToTop />
<ThemeToggle />
