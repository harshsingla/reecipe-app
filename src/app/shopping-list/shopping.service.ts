import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingService {
  currentIngredient = new Subject<number>();
  recipeChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("lemons", 2),
    new Ingredient("tomatoes", 2),
  ];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientById(index: number) {
    return this.ingredients.slice()[index];
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.recipeChanged.next(this.ingredients.slice());
  }

  addRecipeIngredientsToIngredients(ingredient: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredient];
    this.recipeChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.recipeChanged.next(this.ingredients.slice());
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.recipeChanged.next(this.ingredients.slice());
  }
}
