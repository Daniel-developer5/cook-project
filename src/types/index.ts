export type Category = 'beef' | 'chicken' | 'breakfast'

export interface Recipe {
  readonly _id: string,
  title: string,
  category: Category,
  ingredients: Array<{ [key: string]: string, }>,
  instructions: string[],
  mark: number,
}
