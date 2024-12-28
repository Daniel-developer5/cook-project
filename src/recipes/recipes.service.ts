import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe } from 'src/types';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addRecipe(_id: string, recipe: Recipe) {
    return await this.userModel.findOneAndUpdate({ _id }, { 
      $push: { recipies: { _id: new Types.ObjectId(), ...recipe } },
    })
  }

  async getAllRecipes() {
    const recipies = await this.userModel.find()

    return recipies
      .map(({ username, recipies }) => ({ username, recipies }))
      .filter(({ recipies }) => recipies.length)
  }
}
