<script lang="ts">
	import { themeState, toggleTheme } from '$lib/theme.svelte';
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label="Toggle dark mode"
	class="glass fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-lg text-text-primary transition-colors hover:border-accent/50 hover:text-accent sm:bottom-8 sm:left-8"
>
	{#if themeState.current === 'dark'}
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
				stroke-linecap="round"
			/>
		</svg>
	{:else}
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" stroke-linejoin="round" />
		</svg>
	{/if}
</button>
