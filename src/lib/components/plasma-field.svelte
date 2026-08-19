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

		vec3 blob(vec2 uv, vec2 center, vec3 color, float radius) {
			float d = length(uv - center);
			float glow = radius / (d * d + 0.01);
			return color * glow * 0.06;
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / uResolution.xy;
			float aspect = uResolution.x / uResolution.y;
			uv.x *= aspect;

			vec2 c1 = vec2(0.26 * aspect + 0.18 * sin(uTime * 0.15), 0.28 + 0.14 * cos(uTime * 0.12));
			vec2 c2 = vec2(0.76 * aspect + 0.2 * cos(uTime * 0.11), 0.68 + 0.16 * sin(uTime * 0.09));

			vec3 accent = vec3(0.765, 0.961, 0.235);

			vec3 col = vec3(0.016, 0.018, 0.02);
			col += blob(uv, c1, accent, 0.07) * 0.7;
			col += blob(uv, c2, accent, 0.05) * 0.4;

			col = min(col, vec3(0.42));
			gl_FragColor = vec4(col, 1.0);
		}
	`;

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
		};
	});
</script>

<canvas
	bind:this={canvas}
	aria-hidden="true"
	class="pointer-events-none fixed inset-0 h-full w-full"
></canvas>
