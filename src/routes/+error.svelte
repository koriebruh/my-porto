<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button.svelte';
	import devLost from '$lib/assets/illustrations/dev-lost.webp';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something broke'}, JamalKya Nanami</title>
</svelte:head>

<main class="flex min-h-screen items-center justify-center px-5 py-28">
	<div class="sticker w-full max-w-xl rounded-[2.5rem] bg-void p-8 text-center sm:p-12">
		<img src={devLost} width="520" height="514" alt="" class="mx-auto mb-4 w-48 sm:w-56" />
		<p class="mb-1 -rotate-2 font-hand text-3xl font-bold text-text-muted">
			{notFound ? 'Hmm, wrong turn.' : 'Oops, something broke.'}
		</p>
		<h1 class="mb-4 text-6xl leading-none font-bold sm:text-7xl">{page.status}</h1>
		<p class="mx-auto mb-8 max-w-[36ch] text-lg text-text-muted">
			{notFound
				? "This page doesn't exist, even on my map. Let's get you back home."
				: 'The server tripped over something. Try again in a moment, or head back home.'}
		</p>
		<Button href="/">Back to home</Button>
	</div>
</main>
