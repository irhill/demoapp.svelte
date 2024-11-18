import type { Drink, DrinkExcerpt, IngredientAndMeasure } from '$lib/types';

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'

const getIngredientsAndMeasures = (drink: any): IngredientAndMeasure[] => {
	// there are a maximum of 15 ingredients/measures combinations
	const res: IngredientAndMeasure[] = []
	const max = 15

	for (let i = 1; i < max; i++) {
		const ingredientIdx = `strIngredient${i}`
		const ingredient = drink[ingredientIdx]
		if (!ingredient) break

		const measureIdx = `strMeasure${i}`
		const measure = drink[measureIdx]

		res.push({ ingredient, measure })
	}

	return res
}

const getDrinkData = (drink: any): Drink => {
	return {
		id: drink.idDrink,
		name: drink.strDrink,
		alcoholic: drink.strAlcoholic.toLowerCase() === 'alcoholic',
		ingredientsAndMeasures: getIngredientsAndMeasures(drink),
		instructions: drink.strInstructions,
		thumbnailUrl: drink.strDrinkThumb,
	}
}

const getDrinksExcerpts = (drinksArray: any): DrinkExcerpt[] => {
	if (!drinksArray?.length) return []

	return drinksArray.map((drink: any) => ({
		id: drink.idDrink,
		name: drink.strDrink,
		alcoholic: drink.strAlcoholic.toLowerCase() === 'alcoholic',
		thumbnailUrl: drink.strDrinkThumb,
	}))
}

export async function searchDrinks(searchString: string): Promise<DrinkExcerpt[]> {
	const url =  `${baseUrl}search.php?s=${searchString}`

	const { drinks } = await fetch(url, {
		method: 'GET'
	}).then((res) => res.json())

	return getDrinksExcerpts(drinks)
}

export async function getDrink(drinkId: string): Promise<Drink> {
	const url =  `${baseUrl}lookup.php?i=${drinkId}`

	const { drinks } = await fetch(url, { method: 'GET' })
		.then((res) => res.json());

	return getDrinkData(drinks[0])
}