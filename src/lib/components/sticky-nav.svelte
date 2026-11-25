<script lang="ts">
	import { onMount } from 'svelte';

	const links = [
		{ href: '#experience', label: 'Experience' },
		{ href: '#education', label: 'Education' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#stack', label: 'Stack' },
		{ href: '#contact', label: 'Contact' }
	];

	let active = $state('');

	onMount(() => {
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
			observer.disconnect();
		};
	});
</script>

<nav class="fixed inset-x-0 top-4 z-30 px-4">
	<div
		class="sticker-sm mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full bg-void py-2 pr-2 pl-5"
	>
		<a href="#top" class="font-display text-lg font-bold whitespace-nowrap text-text-primary">
			JamalKya <span lang="ja" class="text-accent">菜々美</span>
		</a>
		<a
			href="#contact"
			class="rounded-full bg-sun px-4 py-1.5 font-display text-sm font-semibold text-[#1f1d47] sm:hidden"
			>Say hi</a
		>
		<ul class="hidden gap-1 sm:flex">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						aria-current={active === link.href ? 'location' : undefined}
						class="block rounded-full px-3 py-1.5 font-display text-sm font-semibold text-text-primary transition-colors hover:bg-sky"
						class:bg-sun={active === link.href}
						class:text-[#1f1d47]={active === link.href}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
