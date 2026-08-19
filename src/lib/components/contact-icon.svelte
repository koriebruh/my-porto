<script module lang="ts">
	import { siGmail, siWhatsapp, siGithub } from 'simple-icons';

	// GitHub's brand mark is near-black (#181717) — unreadable on our dark bg, so it's shown in white instead.
	const icons: Record<string, { path: string; hex: string }> = {
		email: siGmail,
		whatsapp: siWhatsapp,
		github: { path: siGithub.path, hex: 'ffffff' }
	};
</script>

<script lang="ts">
	type Props = { name: 'email' | 'whatsapp' | 'github' | 'linkedin' };
	let { name }: Props = $props();

	const icon = $derived(icons[name]);
</script>

{#if icon}
	<svg viewBox="0 0 24 24" width="22" height="22" fill="#{icon.hex}" aria-hidden="true">
		<path d={icon.path} />
	</svg>
{:else}
	<span class="font-display text-lg font-bold text-[#0A66C2]" aria-hidden="true">in</span>
{/if}
