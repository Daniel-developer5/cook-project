import { Controller, Get, Post, Request } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor (private recipesService: RecipesService) {}

  @Post('add')
  async add(@Request() req): Promise<any> {
    const { id, recipe } = req.body

    return await this.recipesService.addRecipe(id, recipe)
  } 

  @Get('get')
  async getAllRecipes(@Request() req): Promise<any> {
    return await this.recipesService.getAllRecipes()
  } 
}
