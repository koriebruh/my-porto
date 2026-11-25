<script lang="ts">
	import { onMount } from 'svelte';

	// A doodle "route map" on the right edge: one stop per section, a star that
	// travels down as you scroll. Replaces the native scrollbar on large screens.
	const stops = [
		{ id: 'experience', label: 'Experience' },
		{ id: 'education', label: 'Education' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'stack', label: 'Stack' },
		{ id: 'contact', label: 'Contact' }
	];

	let progress = $state(0);
	let positions = $state<number[]>([]);
	let shown = $state(false); // hidden over the hero
	let awake = $state(false); // fully visible while scrolling

	onMount(() => {
		let frame = 0;
		let sleep = 0;

		const measure = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			positions = stops.map(({ id }) => {
				const el = document.getElementById(id);
				return el && max > 0 ? Math.min(1, el.offsetTop / max) : 0;
			});
		};
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
			shown = window.scrollY > window.innerHeight * 0.6;
		};
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
			awake = true;
			clearTimeout(sleep);
			sleep = window.setTimeout(() => (awake = false), 1100);
		};

		measure();
		update();
		// images and pop-in cards change the page height after load
		const ro = new ResizeObserver(() => {
			measure();
			update();
		});
		ro.observe(document.body);
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			ro.disconnect();
			cancelAnimationFrame(frame);
			clearTimeout(sleep);
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<nav
	aria-label="Page sections"
	class="rail fixed top-1/2 right-4 z-30 hidden h-[62vh] w-8 lg:block"
	class:shown
	class:awake
>
	<span class="track" aria-hidden="true"></span>
	<span class="trail" style="height: {progress * 100}%" aria-hidden="true"></span>

	{#each stops as stop, i (stop.id)}
		<a
			href="/#{stop.id}"
			class="stop"
			class:passed={progress >= (positions[i] ?? 1) - 0.005}
			style="top: {(positions[i] ?? 0) * 100}%"
			aria-label={stop.label}
		>
			<span class="stop-label">{stop.label}</span>
		</a>
	{/each}

	<span class="marker" style="top: {progress * 100}%" aria-hidden="true">
		<svg viewBox="0 0 100 100" width="26" height="26">
			<path
				d="M50 8 L61 37 L92 38 L67 57 L76 88 L50 70 L23 88 L33 57 L8 38 L39 37 Z"
				fill="#ffcb3d"
				stroke="#1f1d47"
				stroke-width="8"
				stroke-linejoin="round"
			/>
		</svg>
	</span>
</nav>

<style>
	/* the rail replaces the native scrollbar where it is shown */
	@media (min-width: 1024px) {
		:global(html) {
			scrollbar-width: none;
		}
		:global(html::-webkit-scrollbar) {
			display: none;
		}
	}

	.rail {
		translate: 0 -50%;
		opacity: 0;
		pointer-events: none;
		transition: opacity 400ms ease;
	}
	/* faint while idle so it blends into the dotted paper, clear while in use */
	.rail.shown {
		opacity: 0.35;
		pointer-events: auto;
	}
	.rail.shown.awake,
	.rail.shown:hover,
	.rail.shown:focus-within {
		opacity: 1;
		transition-duration: 150ms;
	}
	.track,
	.trail {
		position: absolute;
		top: 0;
		left: 50%;
		translate: -50% 0;
		border-radius: 9999px;
	}
	.track {
		bottom: 0;
		border-left: 3px dashed color-mix(in srgb, var(--color-text-primary) 35%, transparent);
	}
	.trail {
		width: 3px;
		background: var(--color-accent);
	}

	.stop {
		position: absolute;
		left: 50%;
		width: 14px;
		height: 14px;
		translate: -50% -50%;
		border-radius: 9999px;
		background: var(--color-void);
		border: 2.5px solid var(--color-text-primary);
		transition:
			background-color 150ms ease,
			scale 150ms ease;
	}
	.stop.passed {
		background: var(--color-accent);
	}
	.stop:hover,
	.stop:focus-visible {
		scale: 1.3;
	}
	.stop-label {
		position: absolute;
		right: calc(100% + 12px);
		top: 50%;
		translate: 6px -50%;
		white-space: nowrap;
		padding: 0.25rem 0.65rem;
		border-radius: 9999px;
		background: var(--color-text-primary);
		color: var(--color-void);
		font: 600 0.8rem/1.2 var(--font-display);
		box-shadow: 2px 2px 0 var(--color-accent);
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 120ms ease,
			translate 120ms ease;
	}
	.stop:hover .stop-label,
	.stop:focus-visible .stop-label {
		opacity: 1;
		translate: 0 -50%;
	}

	.marker {
		position: absolute;
		left: 50%;
		translate: -50% -50%;
		pointer-events: none;
		filter: drop-shadow(2px 2px 0 #1f1d47);
	}
</style>
