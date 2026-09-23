<script lang="ts">
	import gsap from 'gsap';
	import Badge from '$lib/components/ui/badge.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import TechIcon, { hasTechIcon } from '$lib/components/tech-icon.svelte';

	type Project = {
		name: string;
		href: string;
		docsHref?: string;
		stack: string[];
		quote: string;
		points: string[];
	};

	let { project, onclose }: { project: Project | null; onclose: () => void } = $props();

	let backdrop: HTMLDivElement | undefined = $state();
	let panel: HTMLDivElement | undefined = $state();
	let closeBtn: HTMLButtonElement | undefined = $state();

	$effect(() => {
		if (!project || !backdrop || !panel) return;

		document.body.style.overflow = 'hidden';
		closeBtn?.focus();

		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' });
			gsap.fromTo(
				panel,
				{ opacity: 0, y: 16, scale: 0.97 },
				{ opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
			);
		}

		return () => {
			document.body.style.overflow = '';
		};
	});

	function onKeydown(e: KeyboardEvent) {
		if (project && e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if project}
	<div
		bind:this={backdrop}
		class="fixed inset-0 z-50 flex items-center justify-center bg-void/70 p-5 backdrop-blur-sm"
	>
		<button
			type="button"
			class="absolute inset-0 h-full w-full cursor-default"
			aria-label="Close dialog"
			onclick={onclose}
		></button>
		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-labelledby="project-modal-title"
			class="glass relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg p-6 sm:p-8"
		>
			<div class="mb-6 flex items-start justify-between gap-4">
				<h3 id="project-modal-title" class="font-display text-2xl font-bold text-text-primary">
					{project.name}
				</h3>
				<button
					bind:this={closeBtn}
					type="button"
					onclick={onclose}
					aria-label="Close"
					class="glass flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-accent"
				>
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
					</svg>
				</button>
			</div>

			<div class="mb-6 flex flex-wrap gap-1.5">
				{#each project.stack as tech (tech)}
					{#if hasTechIcon(tech)}
						<Badge variant="up" class="p-1.5" title={tech}
							><TechIcon name={tech} /><span class="sr-only">{tech}</span></Badge
						>
					{:else}
						<Badge variant="up">{tech}</Badge>
					{/if}
				{/each}
			</div>

			<p
				class="mb-6 rounded-lg border-l-2 border-accent bg-text-primary/5 px-4 py-3 text-base text-text-primary italic"
			>
				"{project.quote}"
			</p>

			<ul class="mb-8 space-y-2">
				{#each project.points as point (point)}
					<li class="flex gap-2 text-sm text-text-muted">
						<span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint"></span>
						{point}
					</li>
				{/each}
			</ul>

			<div class="flex flex-wrap gap-3">
				<Button href={project.href} target="_blank" rel="noreferrer" size="sm">View source ↗</Button
				>
				{#if project.docsHref}
					<Button
						variant="outline"
						href={project.docsHref}
						target="_blank"
						rel="noreferrer"
						size="sm">Docs ↗</Button
					>
				{/if}
			</div>
		</div>
	</div>
{/if}
