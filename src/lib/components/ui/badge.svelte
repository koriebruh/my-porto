<script module lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	export const badgeVariants = cva(
		'inline-flex items-center gap-1.5 rounded-full border-2 border-text-primary bg-[#fff] px-2.5 py-1 text-xs font-bold',
		{
			variants: {
				variant: {
					default: 'text-[#1f1d47]',
					up: 'text-[#1f1d47]',
					down: 'border border-fault/50 text-fault',
					paper: 'bg-accent text-void'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		variant?: BadgeVariant;
		class?: string;
		children: Snippet;
	} & HTMLAttributes<HTMLSpanElement>;

	let { variant = 'default', class: className, children, ...rest }: Props = $props();
</script>

<span class={cn(badgeVariants({ variant }), className)} {...rest}>
	{@render children()}
</span>
