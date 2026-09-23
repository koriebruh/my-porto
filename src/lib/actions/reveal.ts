import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let pluginRegistered = false;
function ensurePlugin() {
	if (!pluginRegistered) {
		gsap.registerPlugin(ScrollTrigger);
		pluginRegistered = true;
	}
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function enter(node: HTMLElement, opts: { delay?: number } = {}) {
	if (reduced()) {
		gsap.set(node, { opacity: 1, y: 0, filter: 'blur(0px)' });
		return {};
	}

	const tween = gsap.fromTo(
		node,
		{ opacity: 0, y: 22, filter: 'blur(6px)' },
		{
			opacity: 1,
			y: 0,
			filter: 'blur(0px)',
			duration: 0.7,
			delay: (60 + (opts.delay ?? 0)) / 1000,
			ease: 'power2.out'
		}
	);
	return { destroy: () => tween.kill() };
}

export function reveal(node: HTMLElement, opts: { delay?: number } = {}) {
	if (reduced()) {
		gsap.set(node, { opacity: 1, y: 0, filter: 'blur(0px)' });
		return {};
	}
	ensurePlugin();

	const tween = gsap.fromTo(
		node,
		{ opacity: 0, y: 28, filter: 'blur(6px)' },
		{
			opacity: 1,
			y: 0,
			filter: 'blur(0px)',
			duration: 0.8,
			delay: (opts.delay ?? 0) / 1000,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: node,
				start: 'top 88%',
				toggleActions: 'play none none reverse'
			}
		}
	);
	return {
		destroy: () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}

export function countUp(
	node: HTMLElement,
	opts: { value: number; decimals?: number; prefix?: string; suffix?: string; delay?: number }
) {
	const decimals = opts.decimals ?? 0;
	const format = (n: number) => `${opts.prefix ?? ''}${n.toFixed(decimals)}${opts.suffix ?? ''}`;

	if (reduced()) {
		node.textContent = format(opts.value);
		return {};
	}
	ensurePlugin();

	const counter = { n: 0 };
	const tween = gsap.to(counter, {
		n: opts.value,
		duration: 1.4,
		delay: (opts.delay ?? 0) / 1000,
		ease: 'power2.out',
		onUpdate: () => {
			node.textContent = format(counter.n);
		},
		scrollTrigger: {
			trigger: node,
			start: 'top 90%',
			toggleActions: 'play none none none'
		}
	});
	return {
		destroy: () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}

export function parallax(node: HTMLElement, opts: { amount?: number } = {}) {
	if (reduced()) return {};
	ensurePlugin();

	const tween = gsap.to(node, {
		yPercent: opts.amount ?? 12,
		ease: 'none',
		scrollTrigger: {
			trigger: node.closest('section') ?? node,
			scrub: 0.6
		}
	});
	return {
		destroy: () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}
