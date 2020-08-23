import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-create",
  templateUrl: "./recipe-create.component.html",
  styleUrls: ["./recipe-create.component.css"],
})
export class RecipeCreateComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  get recipeIngredients() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = param["id"];
      if (this.id) {
        this.editMode = true;
      }
    });
    this.initForm();
  }

  initForm() {
    this.recipeForm = this.fb.group({
      name: [null, Validators.required],
      imagePath: [null, Validators.required],
      description: [null, Validators.required],
      ingredients: this.fb.array([]),
    });

    if (this.editMode) {
      const data = this.recipeService.getRecipeById(this.id);
      this.recipeForm.patchValue(data);
      data.ingredients.forEach((ingredient) => {
        const group = this.fb.group({
          name: [ingredient.name, Validators.required],
          amount: [ingredient.amount, Validators.required],
        });
        (this.recipeForm.get("ingredients") as FormArray).push(group);
      });
    }
  }

  onAddIngredient() {
    (this.recipeForm.get("ingredients") as FormArray).push(
      this.fb.group({
        name: [null, Validators.required],
        amount: [null, Validators.required],
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    } else {
      this.recipeService.addNewRecipe(this.recipeForm.value);
    }

    this.router.navigate(["recipe"]);
  }

  deleteIngredient(ingredientIndex: number) {
    (this.recipeForm.get("ingredients") as FormArray).removeAt(ingredientIndex);
  }

  onCancel() {
    this.router.navigate(["recipe"]);
  }
}
