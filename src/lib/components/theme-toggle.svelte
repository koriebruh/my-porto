<script lang="ts">
	import { themeState, toggleTheme } from '$lib/theme.svelte';
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label="Toggle dark mode"
	class="group fixed bottom-5 left-5 z-40 h-14 w-14 cursor-pointer rounded-full border-[5px] border-sky sm:bottom-8 sm:left-8"
>
	<span
		class="absolute inset-[4px] flex items-center justify-center rounded-full border-[2.5px] border-[#1f1d47] bg-[#fff] text-[#1f1d47] shadow-[2px_2px_0_#1f1d47] transition-[translate,background-color] duration-150 group-hover:-translate-y-[3px] group-hover:bg-sun"
	>
		{#if themeState.current === 'dark'}
			<svg
				viewBox="0 0 24 24"
				width="18"
				height="18"
				fill="none"
				stroke="currentColor"
				stroke-width="2.6"
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
				stroke-width="2.6"
			>
				<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" stroke-linejoin="round" />
			</svg>
		{/if}
	</span>
</button>
