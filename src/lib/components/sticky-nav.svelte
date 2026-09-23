<script lang="ts">
	import { onMount } from 'svelte';

	const links = [
		{ href: '#experience', label: 'Experience' },
		{ href: '#education', label: 'Education' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#stack', label: 'Stack' },
		{ href: '#contact', label: 'Contact' }
	];

	let visible = $state(false);
	let active = $state('');

	onMount(() => {
		const onScroll = () => {
			visible = window.scrollY > window.innerHeight * 0.55;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		const sections = links
			.map((l) => document.querySelector(l.href))
			.filter((el): el is Element => !!el);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active = `#${entry.target.id}`;
				}
			},
			{ rootMargin: '-40% 0px -50% 0px' }
		);
		sections.forEach((s) => observer.observe(s));

		return () => {
			window.removeEventListener('scroll', onScroll);
			observer.disconnect();
		};
	});
</script>

<nav
	aria-hidden={!visible}
	class="nav-blur fixed inset-x-0 top-0 z-30 border-b transition-all duration-300"
	class:opacity-0={!visible}
	class:-translate-y-full={!visible}
	class:pointer-events-none={!visible}
	style="background: color-mix(in srgb, var(--color-void) 78%, transparent); border-color: var(--color-border-glass);"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
		<a href="#top" tabindex={visible ? 0 : -1} class="font-display text-sm font-bold text-text-primary">
			JK <span class="text-accent">菜々美</span>
		</a>
		<ul class="hidden gap-6 sm:flex">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						tabindex={visible ? 0 : -1}
						aria-current={active === link.href ? 'location' : undefined}
						class="font-mono text-[11px] uppercase tracking-wide text-text-muted transition-colors hover:text-accent"
						class:text-accent={active === link.href}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
