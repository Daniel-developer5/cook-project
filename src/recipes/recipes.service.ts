import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GetRecipeParams, Recipe } from 'src/types';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { getAverage } from 'src/utils';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addRecipe(_id: string, recipe: Recipe) {
    return await this.userModel.findOneAndUpdate({ _id }, { 
      $push: { recipes: { _id: new Types.ObjectId(), ...recipe, mark: 0, marks: [], } },
    })
  }

  async getAllRecipes(params) {
    const { category, search } = (params as GetRecipeParams)

    const recipes = await this.userModel.find()

    const allRecipes = []

    recipes
      .filter(({ recipes }) => recipes.length)
      .forEach(({ username, recipes }) => {
        recipes.forEach(recipe => {
          allRecipes.push({ ...recipe, username })
        })
      })

    return allRecipes
      .filter(recipe => {
        const matches = {
          category: true,
          search: true,
        }

        if (category && recipe.category !== category) {
          matches.category = false
        }

        if (search && !recipe.title.toLowerCase().includes(search.toLowerCase())) {
          matches.search = false
        }

        return Object.values(matches).every(match => match)
      })
  }

  async markRecipe(_id: string, mark: number) {
    const recipe = await this.userModel.aggregate([
      { $unwind: '$recipes', },
      { $match: { 'recipes._id': new Types.ObjectId(_id), }, },
      { $project: { 'recipes': 1, '_id': 0, }, }
    ])

    if (recipe.length) {
      const { marks } = recipe[0].recipes
      const newMarks = [ ...marks, +mark ]

      await this.userModel.updateOne(
        { 'recipes._id': new Types.ObjectId(_id), },
        { $set: { 
          'recipes.$.marks': newMarks, },
          'recipes.$.mark': getAverage(newMarks),
        }
      )
    }
  }

  async updateRecipe(_id: string, newRecipe) {
    const recipe = await this.userModel.aggregate([
      { $unwind: '$recipes', },
      { $match: { 'recipes._id': new Types.ObjectId(_id), }, },
      { $project: { 'recipes': 1, '_id': 0, }, }
    ])

    if (recipe.length) {
      const a = await this.userModel.updateOne(
        { 'recipes._id': new Types.ObjectId(_id), },
        { $set: { 'recipes.$': Object.assign(recipe[0].recipes, newRecipe), }, }
      )
    }
  }
}
