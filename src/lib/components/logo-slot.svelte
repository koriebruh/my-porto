<script lang="ts">
	type Props = { name: string; src?: string; onDark?: boolean };
	let { name, src, onDark = false }: Props = $props();
</script>

{#if src}
	<div
		class="inline-flex h-14 shrink-0 items-center justify-center rounded-lg border border-text-primary/10 px-3 transition-transform hover:scale-105"
		class:bg-white={!onDark}
		class:bg-[#0f172a]={onDark}
	>
		<img {src} alt="{name} logo" class="h-full max-h-9 w-auto object-contain" />
	</div>
{:else}
	<div
		class="glass flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border-dashed! font-display text-xs font-semibold text-text-faint"
		title="logo placeholder — {name}"
	>
		{name.charAt(0)}
	</div>
{/if}
