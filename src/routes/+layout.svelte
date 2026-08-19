<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import PlasmaField from '$lib/components/plasma-field.svelte';
	import BackToTop from '$lib/components/back-to-top.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<PlasmaField />
<div class="relative z-10">
	{@render children()}
</div>
<BackToTop />
