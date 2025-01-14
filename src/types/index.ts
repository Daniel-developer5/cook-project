export type Category = 'beef' | 'chicken' | 'breakfast'

export interface Recipe {
  title: string,
  category: Category,
  ingredients: Array<{ [key: string]: string, }>,
  instructions: string[],
  mark: number,
  marks: number[],
  image: string,
}

export interface GetRecipeParams {
  category: string,
  search: string,
  limit: number,
}
