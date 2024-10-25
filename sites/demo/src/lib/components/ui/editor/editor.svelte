<script lang="ts">
	import * as p from '@logix/parsing/parser';
	import * as s from '@logix/parsing/scanner';
	import { Button } from '$lib/components/ui/button';

	const parser = p.new();
	const scanner = s.new();

	type Props = {
		raw?: string;
	};

	let { raw = '[XIC(Start),XIC(Motor)]XIO(Stop)OTE(Motor);' }: Props = $props();

	const parse = (code: string) => {
		const scannerRes = scanner.scan(code);

		if (scannerRes.isErr()) {
			error();
			return [];
		}

		const rungs = parser.parse(scannerRes.unwrap());

		return rungs;
	};

	const error = () => {};

	let rungs = $derived(parse(raw));

	let editorRemaining: HTMLDivElement;

	let width = $state(0);

	$effect(() => {
		width = editorRemaining.offsetWidth;
	});
</script>

<div class="border-border bg-background flex h-full flex-col rounded-lg border">
	<div class="border-border flex place-items-center gap-2 border-b px-3 py-2">
		<!-- header -->
		<Button>
			{'─┤ ├─'}
		</Button>
		<Button>
			{'─┤/├─'}
		</Button>
		<Button>
			{'─( )─'}
		</Button>
		<Button>
			{'─(L)─'}
		</Button>
		<Button>
			{'─(U)─'}
		</Button>
		<Button>
			{'─NOP─'}
		</Button>
		<Button>
			{'─AFI─'}
		</Button>
		<Button>
			{'─[ ]─'}
		</Button>
	</div>
	<div class="flex flex-grow flex-col">
		{#each rungs as rung, index}
			<div class="relative flex place-items-center">
				<div class="flex w-[75px] place-items-center justify-end pr-4">
					<span class="text-muted-foreground font-serif">
						{index}
					</span>
				</div>
				<div class="bg-border min-h-20 w-[1px]"></div>
				<div class="flex place-items-center">
					{#each new Array(10).fill(0, 0, 10) as _}
						<div class="bg-accent size-20 border-r"></div>
					{/each}
				</div>
			</div>
		{/each}
		<!-- just to fill the rest -->
		<div class="flex h-full flex-grow">
			<div class="flex w-[75px] place-items-center justify-end pr-2"></div>
			<div class="bg-border min-h-10 w-[1px]"></div>
			<div bind:this={editorRemaining} class="flex-grow"></div>
		</div>
	</div>
</div>
