<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button, type BitsPrimitiveButtonAttributes } from 'bits-ui';
	import { type VariantProps, tv } from 'tailwind-variants';

	const variants = tv({
		base: 'p-1',
		variants: {
			variant: {
				tool: 'text-xs font-serif border border-border p-1 rounded-md bg-background transition-all hover:bg-secondary text-muted-foreground hover:text-foreground'
			}
		}
	});

	type Variant = VariantProps<typeof variants>['variant'];

	type Props = BitsPrimitiveButtonAttributes & {
			variant: Variant;
			className?: string;
		};

	const { children, class: className, variant = 'tool' }: Props = $props();
</script>

<Button.Root class={cn(variants({ variant }), className)}>
	{@render children()}
</Button.Root>
