<script lang="ts">
	let visible = $state(false);
	let progress = $state(0);

	function onScroll() {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
		visible = window.scrollY > 800;
	}

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// ring around the button fills up as you scroll down the page
	const R = 25;
	const C = 2 * Math.PI * R;
</script>

<svelte:window onscroll={onScroll} />

{#if visible}
	<button
		type="button"
		onclick={scrollTop}
		aria-label="Back to top"
		class="to-top fixed right-5 bottom-5 z-40 h-14 w-14 cursor-pointer sm:right-8 sm:bottom-8"
	>
		<svg viewBox="0 0 60 60" class="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
			<circle cx="30" cy="30" r={R} fill="none" class="ring-track" stroke-width="5" />
			<circle
				cx="30"
				cy="30"
				r={R}
				fill="none"
				class="ring-fill"
				stroke-width="5"
				stroke-linecap="round"
				stroke-dasharray={C}
				stroke-dashoffset={C * (1 - progress)}
			/>
		</svg>
		<span
			class="face absolute inset-[9px] flex items-center justify-center rounded-full border-[2.5px] border-[#1f1d47] bg-sun text-[#1f1d47]"
		>
			<svg
				viewBox="0 0 24 24"
				width="18"
				height="18"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				aria-hidden="true"
			>
				<path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</span>
	</button>
{/if}

<style>
	.to-top {
		animation: to-top-in 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}
	.ring-track {
		stroke: var(--color-sky);
	}
	.ring-fill {
		stroke: var(--color-accent);
		transition: stroke-dashoffset 120ms linear;
	}
	.face {
		box-shadow: 2px 2px 0 #1f1d47;
		transition: translate 150ms ease;
	}
	.to-top:hover .face {
		translate: 0 -3px;
	}
	@keyframes to-top-in {
		from {
			opacity: 0;
			scale: 0.6;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.to-top {
			animation: none;
		}
	}
</style>
