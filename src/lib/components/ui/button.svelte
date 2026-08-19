<script module lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	export const buttonVariants = cva(
		'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-sm font-medium tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent) disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
		{
			variants: {
				variant: {
					default: 'bg-accent text-void font-semibold shadow-(--shadow-glow) hover:bg-accent-dim',
					outline: 'glass text-text-primary hover:border-accent/50 hover:text-accent',
					ghost: 'text-text-muted hover:text-text-primary'
				},
				size: {
					default: 'h-11 px-6',
					sm: 'h-9 px-4 text-xs'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		href?: string;
		children: Snippet;
	} & HTMLAnchorAttributes &
		HTMLButtonAttributes;

	let {
		variant = 'default',
		size = 'default',
		class: className,
		href,
		children,
		...rest
	}: Props = $props();
</script>

{#if href}
	<a {href} class={cn(buttonVariants({ variant, size }), className)} {...rest}>
		{@render children()}
	</a>
{:else}
	<button class={cn(buttonVariants({ variant, size }), className)} {...rest}>
		{@render children()}
	</button>
{/if}
