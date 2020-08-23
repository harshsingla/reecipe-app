import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingService } from "../shopping.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;
  ingredientForm: FormGroup;
  ingredientEditIndex: number;
  editMode: boolean = false;

  constructor(
    private shoppingService: ShoppingService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formInit();
    this.subscriptions = this.shoppingService.currentIngredient.subscribe(
      (res) => {
        if (res !== null) {
          this.ingredientEditIndex = res;
          this.editMode = true;
          const data = this.shoppingService.getIngredientById(res);
          this.ingredientForm.patchValue(data);
        }
      }
    );
  }

  addIngredient() {
    if (this.editMode) {
      this.shoppingService.updateIngredient(
        this.ingredientEditIndex,
        this.ingredientForm.value
      );
    } else {
      this.shoppingService.addNewIngredient(this.ingredientForm.value);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }
  deleteIngredient() {
    this.shoppingService.removeIngredient(this.ingredientEditIndex);
    this.editMode = false;
    this.clearIngredient();
  }
  clearIngredient() {
    this.ingredientForm.reset();
  }

  formInit() {
    this.ingredientForm = this.fb.group({
      name: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
