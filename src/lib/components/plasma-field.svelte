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

		float hash(vec2 p) {
			return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
		}

		float softBlob(vec2 uv, vec2 center, float radius) {
			float d = length(uv - center) / radius;
			return smoothstep(1.0, 0.0, d);
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / uResolution.xy;
			float aspect = uResolution.x / uResolution.y;
			vec2 p = uv;
			p.x *= aspect;

			float t = uTime * 0.03;
			vec2 c1 = vec2(0.18 * aspect + 0.16 * sin(t * 1.1), 0.22 + 0.14 * cos(t * 0.8));
			vec2 c2 = vec2(0.82 * aspect + 0.16 * cos(t * 0.9), 0.78 + 0.14 * sin(t * 1.2));
			vec2 c3 = vec2(0.5 * aspect + 0.22 * sin(t * 0.6 + 2.1), 0.5 + 0.2 * cos(t * 0.5 + 1.3));

			vec3 col = uBase;
			col = mix(col, uColor1, softBlob(p, c1, 0.65) * 0.32);
			col = mix(col, uColor2, softBlob(p, c2, 0.6) * 0.24);
			col = mix(col, uColor1, softBlob(p, c3, 0.7) * 0.14);

			float grain = (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.015;
			col += grain;

			gl_FragColor = vec4(col, 1.0);
		}
	`;

	const THEME_COLORS = {
		light: { base: [1, 1, 1], c1: [0.145, 0.388, 0.922], c2: [0.02, 0.588, 0.412] },
		dark: { base: [0.043, 0.071, 0.125], c1: [0.231, 0.51, 0.965], c2: [0.063, 0.725, 0.506] }
	};

	onMount(() => {
		const gl = canvas.getContext('webgl');
		if (!gl) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		function compile(type: number, source: string) {
			const shader = gl!.createShader(type)!;
			gl!.shaderSource(shader, source);
			gl!.compileShader(shader);
			if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
				console.error('plasma-field shader compile error:', gl!.getShaderInfoLog(shader));
			}
			return shader;
		}

		const program = gl.createProgram()!;
		gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
		gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('plasma-field program link error:', gl.getProgramInfoLog(program));
		}
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
			if (!canvas.parentElement) return;
			const rect = canvas.parentElement.getBoundingClientRect();
			canvas.width = rect.width * Math.min(devicePixelRatio, 1.5);
			canvas.height = rect.height * Math.min(devicePixelRatio, 1.5);
			gl!.viewport(0, 0, canvas.width, canvas.height);
			gl!.uniform2f(uResolution, canvas.width, canvas.height);
		}
		resize();
		window.addEventListener('resize', resize);

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
	class="pointer-events-none absolute inset-0 h-full w-full"
></canvas>
