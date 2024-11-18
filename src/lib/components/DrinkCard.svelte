<script lang="ts">
	import type { DrinkExcerpt } from '$lib/types';
	import Button from '$lib/components/Button.svelte'

	interface DrinkCardProps {
		drink: DrinkExcerpt,
		onshowDetail: (id: string) => void,
	}

	let { drink, onshowDetail }: DrinkCardProps = $props()
</script>

<style lang="scss">
	div.drink-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 8px 4px;
		height: 400px;
		width: 300px;
		overflow: hidden;
		outline: solid 3px forestgreen;

		&:hover {
			background-color: #efefef;

			& Button {
				display: block;
			}
		}

		&.alcoholic {
			outline-color: crimson;

			& .header {
				background-color: crimson;
			}
		}

		& .header {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			text-align: center;
			padding: 4px;
			color: #ffffff;
			background-color: forestgreen;
		}

		& .drink-name {
			text-align: center;
		}

		img, div {
			flex: 0 0 auto;
		}
	}
</style>

{#if drink}
	<div class="drink-card" class:alcoholic={drink.alcoholic}>
		<div class="header">{ drink.alcoholic ? 'Alcoholic' : 'Non-Alcoholic' }</div>
		{#if drink.thumbnailUrl}
			<img src={drink.thumbnailUrl} alt={drink.name} />
		{:else}
			<div>placeholder</div>
		{/if}
		<div class="drink-name"><strong>{ drink.name }</strong></div>
		<Button label="See details" onclick={() => onshowDetail(drink.id)} />
	</div>
{/if}