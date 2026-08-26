<script module lang="ts">
	import {
		siGo,
		siPython,
		siPostgresql,
		siMysql,
		siRedis,
		siApachekafka,
		siDocker,
		siGit,
		siSpringboot
	} from 'simple-icons';

	// Kafka's brand mark is near-black (#231F20) — swapped for white in dark mode.
	const icons: Record<string, { path: string; hex: string; darkHex?: string }> = {
		Go: siGo,
		'Go Fiber': siGo,
		Python: siPython,
		PostgreSQL: siPostgresql,
		MySQL: siMysql,
		Redis: siRedis,
		'Apache Kafka': { path: siApachekafka.path, hex: siApachekafka.hex, darkHex: 'ffffff' },
		Docker: siDocker,
		Git: siGit,
		'Spring Boot': siSpringboot,
		'Spring Cloud Gateway': siSpringboot
	};

	export function hasTechIcon(name: string) {
		return name in icons;
	}
</script>

<script lang="ts">
	import { themeState } from '$lib/theme.svelte';

	type Props = { name: string; class?: string };
	let { name, class: className = '' }: Props = $props();

	const icon = $derived(icons[name]);
	const hex = $derived(themeState.current === 'dark' && icon?.darkHex ? icon.darkHex : icon?.hex);
</script>

{#if icon}
	<svg
		viewBox="0 0 24 24"
		width="20"
		height="20"
		fill="#{hex}"
		class={className}
		aria-hidden="true"
	>
		<path d={icon.path} />
	</svg>
{/if}
