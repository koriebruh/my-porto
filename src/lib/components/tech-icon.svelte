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
		siOpenjdk,
		siSpring,
		siGmail,
		siWhatsapp,
		siGithub
	} from 'simple-icons';

	// gRPC has no simple-icons entry; this is its real mark, extracted from the
	// official grpc.io site logo (the wordmark's icon-only portion), which lives
	// in its own coordinate space rather than the usual 24x24 grid.
	const GRPC_MARK =
		'M23.0105 11.6979L11.2639 23.5324l11.8342 11.7468 10.0115-.0372-10.4982-10.4145 51.842-.1923-4.5437 4.5747 5.0057-.0186 5.8734-5.9171-5.917-5.8733-5.0057.0186 4.5776 4.5412-51.8418.1922 10.4203-10.492z';

	// Valkey's official mark, from valkey.io/img/Valkey-logo.svg (own 64x73 coordinate space).
	const VALKEY_MARK =
		'M13.48 60.69L1 52.88V19.5L31.53 2l29.79 17.53v35.11L31.05 71.69l-10.5-6.57V49.12l-5.7-3.56v-18.1l16.5-9.46 16.11 9.49v18.97l-12.76 7.19V46c3.83-1.47 6.57-5.26 6.57-9.73 0-5.76-4.56-10.39-10.11-10.39-5.56 0-10.12 4.63-10.12 10.39 0 4.47 2.75 8.26 6.57 9.73v14.47l3.65 2.29 22.37-12.6V23.92L31.48 10.88 8.68 23.95v24.68l4.8 3v9.06zM31.16 31.5c2.51 0 4.5 2.17 4.5 4.77 0 2.61-1.99 4.77-4.5 4.77-2.51 0-4.5-2.16-4.5-4.77 0-2.6 1.99-4.77 4.5-4.77z';

	// LinkedIn's "in" mark (no longer shipped by simple-icons).
	const LINKEDIN_MARK =
		'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.84 3.37-1.84 3.6 0 4.27 2.37 4.27 5.46v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z';

	// Doodle-style line icons for tools and concepts without an official mark.
	const line = (path: string, hex: string) => ({ path, hex, line: true });

	const icons: Record<string, { path: string; hex: string; viewBox?: string; line?: boolean }> = {
		Go: siGo,
		'Go Fiber': siGo,
		Gin: siGin,
		// Java has no official simple-icons mark (Oracle doesn't license one); OpenJDK's
		// duke/cup mark is the standard stand-in used across dev tooling.
		Java: siOpenjdk,
		gRPC: { path: GRPC_MARK, hex: '4d4d4d', viewBox: '0 0 92 45' },
		Python: siPython,
		PostgreSQL: siPostgresql,
		MySQL: siMysql,
		Redis: siRedis,
		'Apache Kafka': siApachekafka,
		Docker: siDocker,
		Git: siGit,
		'Spring Boot': siSpringboot,
		'Spring Cloud Gateway': siSpringboot,
		TypeScript: siTypescript,
		Rust: siRust,
		ClickHouse: siClickhouse,
		Elasticsearch: siElasticsearch,
		RabbitMQ: siRabbitmq,
		Prometheus: siPrometheus,
		Grafana: siGrafana,
		Jaeger: siJaeger,
		OpenTelemetry: siOpentelemetry,
		Temporal: siTemporal,
		k6: siK6,
		MinIO: siMinio,
		Linux: siLinux,
		Kafka: siApachekafka,
		Eureka: siSpring,
		Valkey: { path: VALKEY_MARK, hex: '123678', viewBox: '0 0 64 73' },
		SQL: line(
			'M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3ZM4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3',
			'e38c00'
		),
		GORM: line('M3 5h18v14H3ZM3 10h18M9 10v9M15 10v9', '00add8'),
		'REST API': line(
			'M8 4C6 4 6 6 6 8s-1 3-2 4c1 1 2 2 2 4s0 4 2 4M16 4c2 0 2 2 2 4s1 3 2 4c-1 1-2 2-2 4s0 4-2 4',
			'6ba539'
		),
		WebSocket: line('M4 9h14M14 5l4 4-4 4M20 15H6M10 11l-4 4 4 4', '1f1d47'),
		Microservices: line(
			'M3 3h7v7H3ZM14 3h7v7h-7ZM8.5 14h7v7h-7ZM10 6.5h4M6.5 10l3.5 4M17.5 10 14 14',
			'ff4f8b'
		),
		VPS: line('M4 4h16v6H4ZM4 14h16v6H4ZM8 7h.01M8 17h.01', '0080ff'),
		Email: siGmail,
		WhatsApp: siWhatsapp,
		GitHub: siGithub,
		LinkedIn: { path: LINKEDIN_MARK, hex: '0a66c2' }
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
		viewBox={icon.viewBox ?? '0 0 24 24'}
		width="20"
		height="20"
		fill={icon.line ? 'none' : `#${icon.hex}`}
		stroke={icon.line ? `#${icon.hex}` : undefined}
		stroke-width={icon.line ? 2.2 : undefined}
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}
		aria-hidden="true"
	>
		<path d={icon.path} />
	</svg>
{/if}
