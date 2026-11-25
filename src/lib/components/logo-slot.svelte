<script lang="ts">
	type Props = { name: string; src?: string; onDark?: boolean };
	let { name, src, onDark = false }: Props = $props();
</script>

{#if src}
	<div
		class="sticker-sm inline-flex h-14 shrink-0 items-center justify-center rounded-2xl px-3"
		class:bg-white={!onDark}
		class:bg-[#17202a]={onDark}
	>
		<img {src} alt="{name} logo" class="h-full max-h-9 w-auto object-contain" />
	</div>
{:else}
	<div
		class="sticker-sm inline-flex h-14 shrink-0 items-center rounded-2xl bg-sky px-4 font-display text-lg font-bold text-[#1f1d47]"
	>
		{name}
	</div>
{/if}
