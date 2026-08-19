<script module lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	export const badgeVariants = cva(
		'inline-flex items-center gap-1.5 rounded-none px-2.5 py-1 font-mono text-[11px] font-medium',
		{
			variants: {
				variant: {
					default: 'glass text-text-primary',
					up: 'glass text-text-muted',
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
