<script lang="ts">
	let visible = $state(false);

	function onScroll() {
		visible = window.scrollY > 800;
	}

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onscroll={onScroll} />

{#if visible}
	<button
		type="button"
		onclick={scrollTop}
		aria-label="Back to top"
		class="glass fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-none text-text-primary transition-colors hover:border-accent/50 hover:text-accent sm:right-8 sm:bottom-8"
	>
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>
{/if}
