export interface IngredientAndMeasure {
	ingredient: string
	measure: string
}

export interface DrinkExcerpt {
	id: string
	name: string
	alcoholic: boolean
	thumbnailUrl: string
}

export interface Drink extends DrinkExcerpt {
	ingredientsAndMeasures: IngredientAndMeasure[]
	instructions: string
}
