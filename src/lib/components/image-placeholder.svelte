<script lang="ts">
	type Props = {
		label: string;
		aspect?: string;
		class?: string;
		images?: string[];
		layout?: 'masonry' | 'row';
	};

	let {
		label,
		aspect = 'aspect-video',
		class: className = '',
		images = [],
		layout = 'masonry'
	}: Props = $props();

	let openIndex = $state<number | null>(null);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') openIndex = null;
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if images.length > 1 && layout === 'row'}
	<div class="flex flex-wrap gap-3 {className}">
		{#each images as src, i (src)}
			<button
				type="button"
				onclick={() => (openIndex = i)}
				class="group block h-40 cursor-zoom-in overflow-hidden rounded-none border border-white/15 sm:h-48"
			>
				<img
					{src}
					alt={label}
					class="h-full w-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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
				class="group mb-3 block w-full cursor-zoom-in overflow-hidden rounded-none border border-white/15"
			>
				<img
					{src}
					alt={label}
					class="w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
					loading="lazy"
				/>
			</button>
		{/each}
	</div>
{:else if images.length === 1}
	<button
		type="button"
		onclick={() => (openIndex = 0)}
		class="group block w-full cursor-zoom-in overflow-hidden rounded-none border border-white/15 {className}"
	>
		<img
			src={images[0]}
			alt={label}
			class="w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
			loading="lazy"
		/>
	</button>
{:else}
	<div
		class="glass flex {aspect} w-full flex-col items-center justify-center gap-2 rounded-none border-dashed! text-center {className}"
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
		<p class="font-mono text-[11px] text-text-faint uppercase">{label}</p>
	</div>
{/if}

{#if openIndex !== null}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10"
		role="dialog"
		aria-modal="true"
	>
		<button
			type="button"
			aria-label="Close"
			onclick={() => (openIndex = null)}
			class="absolute inset-0 h-full w-full cursor-zoom-out"
		></button>
		<img
			src={images[openIndex]}
			alt={label}
			class="relative max-h-[90vh] max-w-[90vw] border border-white/15 object-contain"
		/>
		<button
			type="button"
			aria-label="Close"
			onclick={() => (openIndex = null)}
			class="glass absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-none text-text-primary sm:top-6 sm:right-6"
		>
			✕
		</button>
	</div>
{/if}
