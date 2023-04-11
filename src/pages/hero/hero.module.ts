import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HeroComponent } from "./hero.component";
import { HeroRoutingModule } from "./hero.routing";
import { UppercaseModule } from "@directives/uppercase/uppercase.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    HeroRoutingModule,
    UppercaseModule,
  ],
  declarations: [HeroComponent],
})
export class HeroModule {}
