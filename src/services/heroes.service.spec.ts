import { of } from "rxjs";
import { instance, mock, verify, when } from "ts-mockito";
import { HeroesDataAccessService } from "./heroes-data-access.service";
import { HeroesService } from "./heroes.service";

describe("HeroesService", () => {
  const mockedHeroesDataAccessService = mock(HeroesDataAccessService);
  const heroesService = new HeroesService(
    instance(mockedHeroesDataAccessService)
  );

  it("Should be defined", () => {
    expect(heroesService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should call to heroes data access get all", () => {
      when(mockedHeroesDataAccessService.getAll(undefined)).thenReturn(of([]));
      heroesService.getAll().subscribe();
      verify(mockedHeroesDataAccessService.getAll(undefined)).once();
    });
  });

  describe("#getOne", () => {
    it("Should call to heroes data access get one", () => {
      when(mockedHeroesDataAccessService.getOne("1")).thenReturn(
        of({ id: "1", name: "spiderman" })
      );
      heroesService.getOne("1").subscribe();
      verify(mockedHeroesDataAccessService.getOne("1")).once();
    });
  });

  describe("#createOne", () => {
    it("Should call to heroes data access create one", () => {
      when(mockedHeroesDataAccessService.createOne("spiderman")).thenReturn(
        of({ id: "1", name: "spiderman" })
      );
      heroesService.createOne("spiderman").subscribe();
      verify(mockedHeroesDataAccessService.createOne("spiderman")).once();
    });
  });

  describe("#updateOne", () => {
    it("Should call to heroes data access update one", () => {
      when(
        mockedHeroesDataAccessService.updateOne("1", "spiderman")
      ).thenReturn(of({ id: "1", name: "spiderman" }));
      heroesService.updateOne("1", "spiderman").subscribe();
      verify(mockedHeroesDataAccessService.updateOne("1", "spiderman")).once();
    });
  });

  describe("#deleteOne", () => {
    it("Should call to heroes data access delete one", () => {
      when(mockedHeroesDataAccessService.deleteOne("1")).thenReturn(of(true));
      heroesService.deleteOne("1").subscribe();
      verify(mockedHeroesDataAccessService.deleteOne("1")).once();
    });
  });
});
