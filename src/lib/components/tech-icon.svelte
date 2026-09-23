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
		siSpringboot,
		siTypescript,
		siRust,
		siClickhouse,
		siElasticsearch,
		siRabbitmq,
		siPrometheus,
		siGrafana,
		siJaeger,
		siOpentelemetry,
		siTemporal,
		siK6,
		siMinio,
		siLinux,
		siGin,
		siOpenjdk
	} from 'simple-icons';

	// gRPC has no simple-icons entry; this is its real mark, extracted from the
	// official grpc.io site logo (the wordmark's icon-only portion), which lives
	// in its own coordinate space rather than the usual 24x24 grid.
	const GRPC_MARK =
		'M23.0105 11.6979L11.2639 23.5324l11.8342 11.7468 10.0115-.0372-10.4982-10.4145 51.842-.1923-4.5437 4.5747 5.0057-.0186 5.8734-5.9171-5.917-5.8733-5.0057.0186 4.5776 4.5412-51.8418.1922 10.4203-10.492z';

	// Brand marks that are pure/near black — swapped for white in dark mode.
	const icons: Record<string, { path: string; hex: string; darkHex?: string; viewBox?: string }> =
		{
			Go: siGo,
			'Go Fiber': siGo,
			Gin: siGin,
			// Java has no official simple-icons mark (Oracle doesn't license one); OpenJDK's
			// duke/cup mark is the standard stand-in used across dev tooling.
			Java: { path: siOpenjdk.path, hex: siOpenjdk.hex, darkHex: 'ffffff' },
			gRPC: { path: GRPC_MARK, hex: '4d4d4d', darkHex: 'ffffff', viewBox: '0 0 92 45' },
		Python: siPython,
		PostgreSQL: siPostgresql,
		MySQL: { path: siMysql.path, hex: siMysql.hex, darkHex: 'ffffff' },
		Redis: siRedis,
		'Apache Kafka': { path: siApachekafka.path, hex: siApachekafka.hex, darkHex: 'ffffff' },
		Docker: siDocker,
		Git: siGit,
		'Spring Boot': siSpringboot,
		'Spring Cloud Gateway': siSpringboot,
		TypeScript: siTypescript,
		Rust: { path: siRust.path, hex: siRust.hex, darkHex: 'ffffff' },
		ClickHouse: siClickhouse,
		Elasticsearch: siElasticsearch,
		RabbitMQ: siRabbitmq,
		Prometheus: siPrometheus,
		Grafana: siGrafana,
		Jaeger: siJaeger,
		OpenTelemetry: { path: siOpentelemetry.path, hex: siOpentelemetry.hex, darkHex: 'ffffff' },
		Temporal: { path: siTemporal.path, hex: siTemporal.hex, darkHex: 'ffffff' },
		k6: siK6,
		MinIO: siMinio,
		Linux: siLinux
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
		viewBox={icon.viewBox ?? '0 0 24 24'}
		width="20"
		height="20"
		fill="#{hex}"
		class={className}
		aria-hidden="true"
	>
		<path d={icon.path} />
	</svg>
{/if}
