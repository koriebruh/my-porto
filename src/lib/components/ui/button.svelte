<script module lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	export const buttonVariants = cva(
		'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-[3px] border-text-primary font-display font-semibold shadow-[4px_4px_0_var(--color-text-primary)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent) disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
		{
			variants: {
				variant: {
					default: 'bg-accent text-[#1f1d47]',
					outline: 'bg-void text-text-primary',
					ghost: 'text-text-muted hover:text-text-primary'
				},
				size: {
					default: 'h-12 px-7 text-lg',
					sm: 'h-10 px-5 text-sm'
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
