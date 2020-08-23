import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "./shopping.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subscriptions: Subscription;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();

    this.subscriptions = this.shoppingService.recipeChanged.subscribe((res) => {
      this.ingredients = res;
    });
  }

  onIngredientClick(index: number) {
    this.shoppingService.currentIngredient.next(index);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
