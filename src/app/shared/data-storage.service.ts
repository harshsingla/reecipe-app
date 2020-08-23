import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe-list/recipe-model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { RecipesComponent } from "../recipes/recipes.component";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  private getBaseUrl() {
    return "https://recipe-app-6c5e1.firebaseio.com/recipe.json";
  }
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    let recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.getBaseUrl(), recipes).subscribe((res) => {});
  }

  fetchData() {
    return this.http.get<Recipe[]>(this.getBaseUrl()).pipe(
      map((recipes) => {
        return recipes.map((res) => {
          return {
            ...res,
            ingredients: res.ingredients ? res.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
