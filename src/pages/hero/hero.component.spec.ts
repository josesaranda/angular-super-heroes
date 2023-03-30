import { FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { HeroesService } from "@services/heroes.service";
import { of } from "rxjs";
import { anything, instance, mock, verify, when } from "ts-mockito";
import { HeroComponent } from "./hero.component";

describe("HeroComponent", () => {
  const mockedSnackBar = mock(MatSnackBar);
  const mockedRouter = mock(Router);
  const mockedActivatedRoute = {
    snapshot: { params: { id: "1" } },
  } as unknown as ActivatedRoute;
  const mockedHeroesService = mock(HeroesService);
  const component: HeroComponent = new HeroComponent(
    instance(mockedSnackBar),
    instance(mockedRouter),
    mockedActivatedRoute,
    new FormBuilder(),
    instance(mockedHeroesService)
  );

  it("Should be defined", () => {
    expect(component).toBeDefined();
    expect(component.id).toBe("1");
    expect(component.isNew).toBeFalsy();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.controls["name"]).toBeDefined();
  });

  describe("#ngOnInit", () => {
    it("Should get hero if is not new", () => {
      when(mockedHeroesService.getOne("1")).thenReturn(
        of({ id: "1", name: "superman" })
      );
      component.ngOnInit();
      expect(component.formGroup.controls["name"].value).toBe("superman");
      verify(mockedHeroesService.getOne("1")).once();
    });
  });

  describe("#onClickSubmit", () => {
    it("Should create a new hero", () => {
      when(mockedHeroesService.createOne("spiderman")).thenReturn(
        of({ id: "1", name: "spiderman" })
      );
      component.formGroup.controls["name"].setValue("spiderman");
      component.isNew = true;
      component.onClickSubmit();

      verify(
        mockedSnackBar.open(
          "Heroe creado correctamente",
          anything(),
          anything()
        )
      ).once();
      verify(mockedHeroesService.createOne("spiderman")).once();
    });

    it("Should update a known hero", () => {
      component.formGroup.controls["name"].setValue("spiderman");
      expect(component.formGroup.controls["name"].value).toBe("spiderman");

      when(mockedHeroesService.updateOne("1", "batman")).thenReturn(
        of({ id: "1", name: "batman" })
      );

      component.formGroup.controls["name"].setValue("batman");
      component.isNew = false;
      component.onClickSubmit();

      verify(
        mockedSnackBar.open(
          "Heroe modificado correctamente",
          anything(),
          anything()
        )
      ).once();
      verify(mockedHeroesService.updateOne("1", "batman")).once();
    });
  });
});
