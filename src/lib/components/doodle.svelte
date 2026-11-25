<script module lang="ts">
	// Hand-drawn doodles, all on a 100x100 canvas, stroked with currentColor.
	// `fill` entries are filled shapes (with an ink outline) instead of bare strokes.
	const doodles = {
		star: {
			d: 'M50 8 L61 37 L92 38 L67 57 L76 88 L50 70 L23 88 L33 57 L8 38 L39 37 Z',
			fill: true
		},
		sparkle: {
			d: 'M50 6 C53 34 66 47 94 50 C66 53 53 66 50 94 C47 66 34 53 6 50 C34 47 47 34 50 6 Z',
			fill: true
		},
		heart: {
			d: 'M50 86 C20 64 6 46 12 28 C18 12 40 10 50 30 C60 10 82 12 88 28 C94 46 80 64 50 86 Z',
			fill: true
		},
		sun: {
			d: 'M50 30 a20 20 0 1 0 0.1 0 Z M50 4 V16 M50 84 V96 M4 50 H16 M84 50 H96 M17 17 L26 26 M74 74 L83 83 M83 17 L74 26 M26 74 L17 83',
			fill: false
		},
		squiggle: {
			d: 'M4 60 C14 30 24 30 30 55 C36 80 46 80 52 52 C58 26 68 26 74 52 C80 78 90 76 96 46',
			fill: false
		},
		loop: { d: 'M6 70 C30 70 40 20 58 26 C76 32 60 62 46 52 C34 42 58 18 94 30', fill: false },
		arrow: { d: 'M10 20 C20 60 50 82 86 78 M70 64 L87 78 L70 92', fill: false },
		plane: {
			d: 'M6 46 L94 10 L66 90 L48 60 Z M48 60 L94 10 M48 60 L40 84 L56 70',
			fill: true
		},
		cloud: {
			d: 'M22 72 C6 72 6 50 22 50 C20 32 42 26 50 40 C56 22 84 26 80 48 C96 48 96 72 80 72 Z',
			fill: true
		},
		brackets: {
			d: 'M34 12 C20 12 24 40 12 50 C24 60 20 88 34 88 M66 12 C80 12 76 40 88 50 C76 60 80 88 66 88',
			fill: false
		},
		coffee: {
			d: 'M16 40 H72 V70 C72 84 62 90 44 90 C26 90 16 84 16 70 Z M72 48 C92 46 92 70 72 68 M32 28 C28 20 36 16 32 8 M48 28 C44 20 52 16 48 8',
			fill: true
		},
		circle: {
			d: 'M54 8 C84 10 96 40 88 66 C80 90 40 96 18 78 C2 62 6 28 30 14 C40 8 62 6 76 16',
			fill: false
		},
		underline: { d: 'M4 60 C30 48 70 46 96 52 M20 72 C44 64 70 64 86 68', fill: false }
	};
	export type DoodleName = keyof typeof doodles;
</script>

<script lang="ts">
	type Props = {
		name: DoodleName;
		class?: string;
		color?: string;
		stroke?: number;
	};
	let { name, class: className = '', color, stroke = 5 }: Props = $props();
	const doodle = $derived(doodles[name]);
</script>

<svg
	viewBox="0 0 100 100"
	class="pointer-events-none overflow-visible {className}"
	aria-hidden="true"
	focusable="false"
>
	<path
		d={doodle.d}
		fill={doodle.fill ? (color ?? 'currentColor') : 'none'}
		stroke={doodle.fill ? 'var(--color-text-primary)' : (color ?? 'currentColor')}
		stroke-width={stroke}
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
