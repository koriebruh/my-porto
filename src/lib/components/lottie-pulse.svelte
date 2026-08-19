<script lang="ts">
	import lottie from 'lottie-web';
	import pulseData from '$lib/assets/lottie/pulse-dots.json';

	let el: HTMLDivElement;

	$effect(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const anim = lottie.loadAnimation({
			container: el,
			renderer: 'svg',
			loop: true,
			autoplay: !reduceMotion,
			animationData: pulseData
		});
		return () => anim.destroy();
	});
</script>

<div bind:this={el} class="h-[18px] w-[54px]" aria-hidden="true"></div>
