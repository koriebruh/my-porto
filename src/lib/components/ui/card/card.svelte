<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="card"
	class={cn(
		'flex flex-col border border-text-primary/10 bg-text-primary/[0.02] transition-all duration-300',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
