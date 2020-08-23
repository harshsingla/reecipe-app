import { NgModule } from "@angular/core";
import {
  RouterModule,
  Routes,
  PreloadingStrategy,
  PreloadAllModules,
} from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "recipe",
    pathMatch: "full",
  },
  {
    path: "recipe",
    loadChildren: () =>
      import("./recipes/recipe.module").then((m) => m.RecipeModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        (m) => m.ShoppingListModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
