import { HttpClient } from "@angular/common/http";
import { instance, mock } from "ts-mockito";
import { HeroesService } from "./heroes.service";

describe("HeroesService", () => {
  const heroesService = new HeroesService(instance(mock(HttpClient)));

  it("Should be defined", () => {
    expect(heroesService).toBeDefined();
    expect(heroesService.heroesDataAccessService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should call to heroes data access get all", () => {
      //@ts-ignore
      const spied = jest.spyOn(heroesService.heroesDataAccessService, "getAll");
      heroesService.getAll().subscribe();
      expect(spied).toHaveBeenCalled();
    });
  });

  describe("#getOne", () => {
    it("Should call to heroes data access get one", () => {
      //@ts-ignore
      const spied = jest.spyOn(heroesService.heroesDataAccessService, "getOne");
      heroesService.getOne("1").subscribe();
      expect(spied).toHaveBeenCalled();
    });
  });

  describe("#createOne", () => {
    it("Should call to heroes data access create one", () => {
      //@ts-ignore
      const spied = jest.spyOn(heroesService.heroesDataAccessService, "createOne");
      heroesService.createOne("spiderman").subscribe();
      expect(spied).toHaveBeenCalled();
    });
  });

  describe("#updateOne", () => {
    it("Should call to heroes data access update one", () => {
      //@ts-ignore
      const spied = jest.spyOn(heroesService.heroesDataAccessService, "updateOne");
      heroesService.updateOne("1", "spiderman").subscribe();
      expect(spied).toHaveBeenCalled();
    });
  });

  describe("#deleteOne", () => {
    it("Should call to heroes data access delete one", () => {
      //@ts-ignore
      const spied = jest.spyOn(heroesService.heroesDataAccessService, "deleteOne");
      heroesService.deleteOne("1").subscribe();
      expect(spied).toHaveBeenCalled();
    });
  });
});
