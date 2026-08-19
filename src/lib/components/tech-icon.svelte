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

	// Kafka's brand mark is near-black (#231F20) — unreadable on our dark bg, so it's shown in white instead.
	const icons: Record<string, { path: string; hex: string }> = {
		Go: siGo,
		'Go Fiber': siGo,
		Python: siPython,
		PostgreSQL: siPostgresql,
		MySQL: siMysql,
		Redis: siRedis,
		'Apache Kafka': { path: siApachekafka.path, hex: 'ffffff' },
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
	type Props = { name: string; class?: string };
	let { name, class: className = '' }: Props = $props();

	const icon = $derived(icons[name]);
</script>

{#if icon}
	<svg
		viewBox="0 0 24 24"
		width="20"
		height="20"
		fill="#{icon.hex}"
		class={className}
		aria-hidden="true"
	>
		<path d={icon.path} />
	</svg>
{/if}
