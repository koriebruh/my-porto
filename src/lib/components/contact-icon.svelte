<script module lang="ts">
	import { siGmail, siWhatsapp, siGithub } from 'simple-icons';

	// GitHub's brand mark is near-black (#181717) — swapped for white in dark mode.
	const icons: Record<string, { path: string; hex: string; darkHex?: string }> = {
		email: siGmail,
		whatsapp: siWhatsapp,
		github: { path: siGithub.path, hex: siGithub.hex, darkHex: 'ffffff' }
	};
</script>

<script lang="ts">
	import { themeState } from '$lib/theme.svelte';

	type Props = { name: 'email' | 'whatsapp' | 'github' | 'linkedin' };
	let { name }: Props = $props();

	const icon = $derived(icons[name]);
	const hex = $derived(themeState.current === 'dark' && icon?.darkHex ? icon.darkHex : icon?.hex);
</script>

{#if icon}
	<svg viewBox="0 0 24 24" width="22" height="22" fill="#{hex}" aria-hidden="true">
		<path d={icon.path} />
	</svg>
{:else}
	<span class="font-display text-lg font-bold text-[#0A66C2]" aria-hidden="true">in</span>
{/if}
