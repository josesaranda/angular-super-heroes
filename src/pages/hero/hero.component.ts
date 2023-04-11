import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { HeroesService } from "@services/heroes.service";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
})
export class HeroComponent implements OnInit {
  id: string;
  isNew = false;

  formGroup: FormGroup;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly heroesService: HeroesService
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.isNew = this.id === "new";
    this.formGroup = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (!this.isNew) {
      this.heroesService.getOne(this.id).subscribe((hero) => {
        if (hero) this.formGroup.controls["name"].setValue(hero.name);
      });
    }
  }

  onClickSubmit(): void {
    this.isNew ? this.createHero() : this.updateHero();
  }

  private createHero(): void {
    this.heroesService.createOne(this.formGroup.value.name).subscribe(() => {
      this.snackBar.open("Heroe creado correctamente", undefined, {
        duration: 2000,
        verticalPosition: "top",
      });
      this.router.navigate(["/heroes"]);
    });
  }

  private updateHero(): void {
    this.heroesService
      .updateOne(this.id, this.formGroup.value.name)
      .subscribe(() => {
        this.snackBar.open("Heroe modificado correctamente", undefined, {
          duration: 2000,
          verticalPosition: "top",
        });
        this.router.navigate(["/heroes"]);
      });
  }
}
