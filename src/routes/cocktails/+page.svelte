<script lang="ts">
	import DrinkCard from '$lib/components/DrinkCard.svelte'
	import Button from '$lib/components/Button.svelte'
	import Dialog from '$lib/components/Dialog.svelte'

	import { getDrink, searchDrinks } from '$lib/cocktailApi';
	import type { Drink, DrinkExcerpt } from '$lib/types'

	let error: string = $state('')
	let searchStr: string = $state('')
	let drinks: DrinkExcerpt[] = $state([])
	let drink: Drink = $state({} as Drink)
	let loading: boolean = $state(false)

	let dialog: any

	const getData = async () => {
		drinks = []
		if (!searchStr) {
			error = 'Search string is required'
			return
		}

		loading = true
		drinks = await searchDrinks(searchStr)
		loading = false
	}

	const onshowDetail = async (id: string) => {
		drink = await getDrink(id)
		if (drink) {
			dialog.showModal()
		}
	}
</script>

<style lang="scss">
	div.search-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;

		span.error-msg {
			color: crimson;
		}
	}

	div.drinks-container {
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 16px;
	}
</style>

<div class="search-container">
	<h3>Search cocktails api</h3>

	<div>
		<input type="text" bind:value={searchStr} placeholder="Search cocktails" onkeyup={() => error = ''} required />
		<Button onclick={getData} label="Search" {loading} />
	</div>

	{#if error}
		<span class="error-msg">{error}</span>
	{/if}

	<div class="drinks-container">
		{#each drinks as drink (drink.id)}
			<DrinkCard {drink} {onshowDetail} />
		{/each}
	</div>
</div>

<Dialog bind:dialog title={drink.name}>
	<ul class="details-ingredients">
		{#each drink.ingredientsAndMeasures as im}
			<li>
				<strong>{im.ingredient}</strong>
				{#if im.measure}
					: {im.measure}
				{/if}
				</li>
		{/each}
	</ul>
	<div><strong>Instructions</strong>: {drink.instructions}</div>
</Dialog>

