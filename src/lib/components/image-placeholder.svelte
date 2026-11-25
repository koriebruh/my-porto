<script lang="ts">
	type Props = {
		label: string;
		aspect?: string;
		class?: string;
		images?: string[];
		/** small versions shown in the grid; `images` opens in the lightbox */
		thumbs?: string[];
		layout?: 'masonry' | 'row';
	};

	let {
		label,
		aspect = 'aspect-video',
		class: className = '',
		images = [],
		thumbs = [],
		layout = 'masonry'
	}: Props = $props();

	// move the lightbox to <body>: tilted (rotated) cards would otherwise trap a fixed overlay
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	}

	let openIndex = $state<number | null>(null);
	let closeBtn: HTMLButtonElement | undefined = $state();

	const step = (d: number) => {
		if (openIndex === null) return;
		openIndex = (openIndex + d + images.length) % images.length;
	};

	function onKeydown(e: KeyboardEvent) {
		if (openIndex === null) return;
		if (e.key === 'Escape') openIndex = null;
		else if (e.key === 'ArrowRight') step(1);
		else if (e.key === 'ArrowLeft') step(-1);
	}

	// lock page scroll and focus the close button while the lightbox is open
	$effect(() => {
		if (openIndex === null) return;
		document.body.style.overflow = 'hidden';
		closeBtn?.focus();
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if images.length > 1 && layout === 'row'}
	<div class="flex flex-wrap gap-4 {className}">
		{#each images as src, i (src)}
			<button
				type="button"
				onclick={() => (openIndex = i)}
				class="group sticker-sm block h-40 cursor-zoom-in overflow-hidden rounded-xl bg-[#fff] p-1.5 sm:h-48"
			>
				<img
					src={thumbs[i] ?? src}
					decoding="async"
					alt={label}
					class="h-full w-auto rounded-lg object-cover"
					loading="lazy"
				/>
			</button>
		{/each}
	</div>
{:else if images.length > 1}
	<div class="columns-1 gap-3 sm:columns-2 {className}">
		{#each images as src, i (src)}
			<button
				type="button"
				onclick={() => (openIndex = i)}
				class="group sticker-sm mb-3 block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#fff] p-1.5"
			>
				<img
					src={thumbs[i] ?? src}
					decoding="async"
					alt={label}
					class="w-full rounded-lg object-contain"
					loading="lazy"
				/>
			</button>
		{/each}
	</div>
{:else if images.length === 1}
	<button
		type="button"
		onclick={() => (openIndex = 0)}
		class="group sticker-sm block w-fit max-w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#fff] p-1.5 {className}"
	>
		<img
			src={thumbs[0] ?? images[0]}
			decoding="async"
			alt={label}
			class="h-40 w-auto max-w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-48"
			loading="lazy"
		/>
	</button>
{:else}
	<div
		class="glass flex {aspect} w-full flex-col items-center justify-center gap-2 rounded-[3px] border-dashed! text-center {className}"
	>
		<svg
			viewBox="0 0 24 24"
			width="22"
			height="22"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			class="text-text-faint"
		>
			<rect x="3" y="4" width="18" height="16" rx="2" />
			<circle cx="9" cy="10" r="1.5" />
			<path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2 0L4 19" />
		</svg>
		<p class="text-xs text-text-faint">{label}</p>
	</div>
{/if}

{#if openIndex !== null}
	<div
		use:portal
		class="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d47]/75 p-4 backdrop-blur-sm sm:p-10"
		role="dialog"
		aria-modal="true"
		aria-label={label}
	>
		<button
			type="button"
			aria-label="Close photo"
			tabindex="-1"
			onclick={() => (openIndex = null)}
			class="absolute inset-0 h-full w-full cursor-zoom-out"
		></button>

		<figure class="lightbox-in sticker relative m-0 -rotate-1 rounded-2xl bg-[#fff] p-3 pb-4">
			<span
				class="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-3 bg-sun/80"
				aria-hidden="true"
			></span>
			{#key openIndex}
				<img
					src={images[openIndex]}
					alt="{label} {openIndex + 1} of {images.length}"
					class="max-h-[72vh] max-w-[84vw] rounded-xl object-contain sm:max-w-[80vw]"
				/>
			{/key}
			<figcaption
				class="mt-3 flex items-center justify-between gap-6 px-1 font-hand text-2xl font-bold text-[#1f1d47]"
			>
				<span>{label}</span>
				{#if images.length > 1}
					<span class="shrink-0">{openIndex + 1} of {images.length}</span>
				{/if}
			</figcaption>
		</figure>

		{#if images.length > 1}
			<button
				type="button"
				aria-label="Previous photo"
				onclick={() => step(-1)}
				class="lightbox-nav left-3 sm:left-8"
			>
				<svg
					viewBox="0 0 24 24"
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" /></svg
				>
			</button>
			<button
				type="button"
				aria-label="Next photo"
				onclick={() => step(1)}
				class="lightbox-nav right-3 sm:right-8"
			>
				<svg
					viewBox="0 0 24 24"
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" /></svg
				>
			</button>
		{/if}

		<button
			bind:this={closeBtn}
			type="button"
			aria-label="Close photo"
			onclick={() => (openIndex = null)}
			class="sticker-sm absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-sun text-[#1f1d47] sm:top-6 sm:right-6"
		>
			<svg
				viewBox="0 0 24 24"
				width="18"
				height="18"
				fill="none"
				stroke="currentColor"
				stroke-width="3"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" /></svg
			>
		</button>
	</div>
{/if}

<style>
	.lightbox-nav {
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		display: flex;
		height: 2.75rem;
		width: 2.75rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: #fff;
		color: #1f1d47;
		border: 2.5px solid #1f1d47;
		box-shadow: 3px 3px 0 #1f1d47;
		cursor: pointer;
	}
	.lightbox-nav:hover {
		background: var(--color-sun);
	}
	.lightbox-in {
		animation: lightbox-in 320ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}
	@keyframes lightbox-in {
		from {
			opacity: 0;
			transform: scale(0.92) translateY(16px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.lightbox-in {
			animation: none;
		}
	}
</style>
