<script lang="ts">
	type Scene = {
		key: string;
		title: string;
		steps: string[];
		note: string;
		failAt?: number;
		parkLast?: boolean;
	};

	const scenes: Scene[] = [
		{
			key: 'saga',
			title: 'Saga pattern',
			steps: ['Order Svc', 'Payment Svc', 'Inventory Svc', 'Shipping Svc'],
			failAt: 2,
			note: 'Inventory reservation fails — Payment and Order compensate in reverse to undo the transaction.'
		},
		{
			key: 'outbox',
			title: 'Transactional outbox',
			steps: ['Write DB', 'Outbox Table', 'Relay Poller', 'Message Broker'],
			note: 'Business write and event insert happen in one DB transaction, so an event is never lost even if the broker is down at write time.'
		},
		{
			key: 'dlq',
			title: 'Dead letter queue',
			steps: ['Consumer', 'Retry ×1', 'Retry ×2', 'Dead Letter Queue'],
			parkLast: true,
			note: 'A message that keeps failing gets retried with backoff, then parked in a DLQ for inspection instead of blocking the queue.'
		}
	];

	let index = $state<number | null>(null);

	const scene = $derived(index === null ? null : scenes[index]);
</script>

<div class="glass col-span-full rounded-none p-5 sm:p-6">
	<p class="mb-4 font-mono text-xs text-text-faint uppercase">pick a pattern</p>

	<div class="mb-5 flex flex-wrap gap-2">
		{#each scenes as s, i (s.key)}
			<button
				onclick={() => (index = i)}
				class="glass rounded-none px-3 py-1.5 font-mono text-xs uppercase transition-colors"
				class:border-accent={index === i}
				class:text-accent={index === i}
				class:text-text-muted={index !== i}
			>
				{s.title}
			</button>
		{/each}
	</div>

	{#if scene}
		<div class="relative mb-4 h-1 bg-white/10">
			<div
				class="pattern-dot absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
			></div>
		</div>

		<div class="flex justify-between gap-2">
			{#each scene.steps as step, i (step)}
				<div
					class="glass flex-1 rounded-none px-2 py-2 text-center font-mono text-[10px] text-text-muted uppercase sm:text-[11px]"
					class:border-fault!={scene.failAt === i ||
						(scene.parkLast && i === scene.steps.length - 1)}
					class:text-fault={scene.failAt === i}
				>
					{step}
				</div>
			{/each}
		</div>

		{#if scene.failAt !== undefined}
			<p class="mt-3 font-mono text-[11px] text-fault uppercase">↩ compensating backward</p>
		{/if}

		<p class="mt-4 max-w-2xl text-sm text-text-muted">{scene.note}</p>
	{:else}
		<p class="text-sm text-text-faint">Pick one above to see it play out.</p>
	{/if}
</div>

<style>
	@keyframes pattern-travel {
		0% {
			left: 1%;
		}
		100% {
			left: 97%;
		}
	}

	.pattern-dot {
		animation: pattern-travel 2.6s linear infinite alternate;
	}

	@media (prefers-reduced-motion: reduce) {
		.pattern-dot {
			animation: none;
			left: 50%;
		}
	}
</style>
