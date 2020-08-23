import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [{ path: "", component: AuthComponent }];
@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
