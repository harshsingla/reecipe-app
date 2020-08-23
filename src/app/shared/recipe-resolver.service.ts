import { Injectable } from "@angular/core";
import { DataStorageService } from "./data-storage.service";
import {
  Resolve,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Recipe } from "../recipes/recipe-list/recipe-model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length) {
      return recipes;
    } else {
      return this.dataStorageService.fetchData();
    }
  }
}
