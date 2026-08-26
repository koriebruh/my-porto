<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	const VERT = `
		attribute vec2 aPos;
		void main() {
			gl_Position = vec4(aPos, 0.0, 1.0);
		}
	`;

	const FRAG = `
		precision mediump float;
		uniform float uTime;
		uniform vec2 uResolution;
		uniform vec3 uBase;
		uniform vec3 uColor1;
		uniform vec3 uColor2;

		float glow(vec2 uv, vec2 center, float radius) {
			float d = length(uv - center);
			return min(radius / (d * d + 0.02), 1.0);
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / uResolution.xy;
			float aspect = uResolution.x / uResolution.y;
			uv.x *= aspect;

			vec2 c1 = vec2(0.26 * aspect + 0.18 * sin(uTime * 0.15), 0.28 + 0.14 * cos(uTime * 0.12));
			vec2 c2 = vec2(0.76 * aspect + 0.2 * cos(uTime * 0.11), 0.68 + 0.16 * sin(uTime * 0.09));

			vec3 col = uBase;
			col = mix(col, uColor1, glow(uv, c1, 0.05) * 0.4);
			col = mix(col, uColor2, glow(uv, c2, 0.04) * 0.35);

			gl_FragColor = vec4(col, 1.0);
		}
	`;

	const THEME_COLORS = {
		light: { base: [1, 1, 1], c1: [0.231, 0.51, 0.965], c2: [0.976, 0.451, 0.086] },
		dark: { base: [0.043, 0.055, 0.078], c1: [0.376, 0.647, 0.98], c2: [0.984, 0.573, 0.235] }
	};

	onMount(() => {
		const gl = canvas.getContext('webgl');
		if (!gl) return;

		function compile(type: number, source: string) {
			const shader = gl!.createShader(type)!;
			gl!.shaderSource(shader, source);
			gl!.compileShader(shader);
			return shader;
		}

		const program = gl.createProgram()!;
		gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
		gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(program);
		gl.useProgram(program);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const aPos = gl.getAttribLocation(program, 'aPos');
		gl.enableVertexAttribArray(aPos);
		gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

		const uTime = gl.getUniformLocation(program, 'uTime');
		const uResolution = gl.getUniformLocation(program, 'uResolution');
		const uBase = gl.getUniformLocation(program, 'uBase');
		const uColor1 = gl.getUniformLocation(program, 'uColor1');
		const uColor2 = gl.getUniformLocation(program, 'uColor2');

		function setThemeUniforms() {
			const theme =
				document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
			const { base, c1, c2 } = THEME_COLORS[theme];
			gl!.uniform3f(uBase, base[0], base[1], base[2]);
			gl!.uniform3f(uColor1, c1[0], c1[1], c1[2]);
			gl!.uniform3f(uColor2, c2[0], c2[1], c2[2]);
		}
		setThemeUniforms();

		function onThemeChange() {
			setThemeUniforms();
			if (reduced) gl!.drawArrays(gl!.TRIANGLES, 0, 3);
		}
		window.addEventListener('themechange', onThemeChange);

		function resize() {
			canvas.width = window.innerWidth * Math.min(devicePixelRatio, 1.5);
			canvas.height = window.innerHeight * Math.min(devicePixelRatio, 1.5);
			gl!.viewport(0, 0, canvas.width, canvas.height);
			gl!.uniform2f(uResolution, canvas.width, canvas.height);
		}
		resize();
		window.addEventListener('resize', resize);

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let frameId: number;
		function draw(t: number) {
			gl!.uniform1f(uTime, t * 0.001);
			gl!.drawArrays(gl!.TRIANGLES, 0, 3);
			if (!reduced) frameId = requestAnimationFrame(draw);
		}
		draw(1200);

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('themechange', onThemeChange);
		};
	});
</script>

<canvas
	bind:this={canvas}
	aria-hidden="true"
	class="pointer-events-none fixed inset-0 h-full w-full"
></canvas>
