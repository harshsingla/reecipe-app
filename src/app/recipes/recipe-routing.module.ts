import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeCreateComponent } from "./recipe-create/recipe-create.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolverService } from "../shared/recipe-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", component: RecipeStartComponent, pathMatch: "full" },
      { path: "create", component: RecipeCreateComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ":id/edit",
        component: RecipeCreateComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RecipeRoutingModule {}
