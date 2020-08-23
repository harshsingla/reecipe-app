import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "./dropdown.directive";
import { LoaderComponent } from "./loader/loader.component";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  declarations: [
    DropdownDirective,
    LoaderComponent,
    AlertComponent,
    PlaceholderDirective,
  ],

  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    DropdownDirective,
    LoaderComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
