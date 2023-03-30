import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DeleteDialogComponent } from "@components/delete-dialog/delete-dialog.component";
import { Hero } from "@services/heroes-data-access.service";
import { HeroesService } from "@services/heroes.service";
import { switchMap } from "rxjs";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HeroesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datasource = new MatTableDataSource<Hero>([]);
  formGroup: FormGroup;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly heroesService: HeroesService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [""],
    });
  }

  ngOnInit(): void {
    this.getAllHeroes();
    this.formGroup.controls["name"].valueChanges
      .pipe(switchMap((name) => this.heroesService.getAll(name)))
      .subscribe((heroes) => {
        this.datasource.data = heroes;
      });
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  openDeleteDialog(hero: Hero) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: { name: hero.name },
      width: "400px",
    });
    dialog.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.heroesService.deleteOne(hero.id).subscribe(() => {
          this.snackBar.open("Heroe elminado correctamente", undefined, {
            duration: 2000,
            verticalPosition: "top",
          });
          this.formGroup.reset();
          this.getAllHeroes();
        });
      }
    });
  }

  private getAllHeroes() {
    this.heroesService.getAll().subscribe((heroes) => {
      this.datasource.data = heroes;
    });
  }
}
