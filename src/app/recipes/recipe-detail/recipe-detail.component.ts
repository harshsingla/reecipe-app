import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe-list/recipe-model";
import { ShoppingService } from "src/app/shopping-list/shopping.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  recipeDetailData: Recipe;

  constructor(
    private shoppingService: ShoppingService,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.recipeId = param["id"];
      this.recipeDetailData = this.recipeService.getRecipeById(param["id"])!;
      if (!this.recipeDetailData) {
        this.router.navigate(["/recipe"]);
      }
    });
  }
  addIngredientsTOShoppingList() {
    this.shoppingService.addRecipeIngredientsToIngredients(
      this.recipeDetailData.ingredients
    );
  }

  onEditRecipeClick() {
    this.router.navigate(["recipe", this.recipeId, "edit"]);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(["recipe"]);
  }
}
