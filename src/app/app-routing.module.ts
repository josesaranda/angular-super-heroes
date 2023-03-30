import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full",
  },
  {
    path: "heroes",
    loadChildren: () =>
      import("@pages/heroes/heroes.module").then((m) => m.HeroesModule),
  },
  {
    path: "heroes/:id",
    loadChildren: () =>
      import("@pages/hero/hero.module").then((m) => m.HeroModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
