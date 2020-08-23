import { Injectable } from "@angular/core";
import { Recipe } from "./recipe-list/recipe-model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipeUpdated = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  constructor() {}

  /**
   * returns the copy of recipe
   */
  getRecipes() {
    return this.recipes.slice();
  }

  /**
   * gets recipe by id
   * @param recipeId recipe Id
   */
  getRecipeById(recipeId: number): Recipe {
    return this.recipes.slice()[recipeId];
  }

  /**
   * adds new recipe to the array
   * @param newRecipe new recipe data
   */
  addNewRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeUpdated.next(this.recipes.slice());
  }

  updateRecipe(updatedRecipe: Recipe, index: number) {
    this.recipes[index] = updatedRecipe;
  }

  deleteRecipe(recipeId: number) {
    this.recipes.splice(recipeId, 1);
    this.recipeUpdated.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeUpdated.next(this.recipes.slice());
  }
}
