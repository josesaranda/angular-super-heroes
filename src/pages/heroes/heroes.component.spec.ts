import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HeroesService } from "@services/heroes.service";
import { of } from "rxjs";
import { instance, mock, verify, when } from "ts-mockito";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent", () => {
  const mockedSnackBar = mock(MatSnackBar);
  const mockedMatDialog = mock(MatDialog);
  const formBuilder = new FormBuilder();
  const mockedHeroesService = mock(HeroesService);
  const component: HeroesComponent = new HeroesComponent(
    instance(mockedSnackBar),
    instance(mockedMatDialog),
    formBuilder,
    instance(mockedHeroesService)
  );

  it("Should be defined and formGroup created", () => {
    expect(component).toBeDefined();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.controls["name"]).toBeDefined();
  });

  describe("#ngOnInit", () => {
    it("Should get heroes for first time and get heroes matching name", () => {
      when(mockedHeroesService.getAll()).thenReturn(
        of([{ id: "1", name: "superman" }])
      );
      component.ngOnInit();
      expect(component.datasource.data).toEqual([
        { id: "1", name: "superman" },
      ]);
      verify(mockedHeroesService.getAll()).once();

      when(mockedHeroesService.getAll("aaa")).thenReturn(of([]));
      component.formGroup.controls["name"].setValue("aaa");
      expect(component.datasource.data).toEqual([]);
      verify(mockedHeroesService.getAll("aaa")).once();
    });
  });
});
