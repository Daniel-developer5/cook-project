import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Request as RequestType } from 'express';

@Controller('recipes')
export class RecipesController {
  constructor (private recipesService: RecipesService) {}

  @Post('add')
  async add(@Request() req): Promise<any> {
    const { id, recipe } = req.body

    return await this.recipesService.addRecipe(id, recipe)
  } 

  @Post('update')
  async update(@Request() req): Promise<any> {
    const { recipe } = req.body

    return await this.recipesService.updateRecipe(req.query.id, recipe)
  } 

  @Post('mark-recipe')
  async markRecipe(@Request() req): Promise<any> {
    const { id, mark } = req.body

    return await this.recipesService.markRecipe(id, mark)
  } 

  @Get('get')
  async getAllRecipes(@Request() req: RequestType): Promise<any> {
    return await this.recipesService.getAllRecipes(req.query)
  } 
}
