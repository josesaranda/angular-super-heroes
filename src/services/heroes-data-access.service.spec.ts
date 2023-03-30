import { HeroesDataAccessService } from "./heroes-data-access.service";

describe("HeroesDataAccessService", () => {
  const heroesDataAccessService = new HeroesDataAccessService();

  it("Should be defined", () => {
    expect(heroesDataAccessService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should get all heroes", (done) => {
      heroesDataAccessService.getAll().subscribe((result) => {
        expect(result).toEqual([
          { id: "0c42d7cb-d452-484c-831e-2fab38e09e12", name: "superman" },
          { id: "d6488caa-c03e-4248-a800-567cf33ab9e3", name: "spiderman" },
          { id: "14a129b5-1c04-4be2-baa0-0832a46bb5d1", name: "batman" },
          {
            id: "d3eb5f0b-da5e-4eea-af78-b7855f98ee46",
            name: "capitan america",
          },
          { id: "61683b64-57df-4669-90aa-63b7271c365d", name: "lobezno" },
          { id: "0ee6287c-6a31-4279-b0b1-a442bac5a16e", name: "hulk" },
        ]);
        done();
      });
    });

    it("Should get all heroes filtered by name", (done) => {
      heroesDataAccessService.getAll("man").subscribe((result) => {
        expect(result).toEqual([
          { id: "0c42d7cb-d452-484c-831e-2fab38e09e12", name: "superman" },
          { id: "d6488caa-c03e-4248-a800-567cf33ab9e3", name: "spiderman" },
          { id: "14a129b5-1c04-4be2-baa0-0832a46bb5d1", name: "batman" },
        ]);
        done();
      });
    });
  });

  describe("#getOne", () => {
    it("Should get hero by id", (done) => {
      heroesDataAccessService
        .getOne("0c42d7cb-d452-484c-831e-2fab38e09e12")
        .subscribe((result) => {
          expect(result).toEqual({
            id: "0c42d7cb-d452-484c-831e-2fab38e09e12",
            name: "superman",
          });
          done();
        });
    });

    it("Should return undefined when hero is not found", (done) => {
      heroesDataAccessService.getOne("2fab38e09e12").subscribe((result) => {
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe("#createOne", () => {
    it("Should create a hero", (done) => {
      heroesDataAccessService.createOne("new hero").subscribe((result) => {
        expect(result.id).toBeDefined();
        expect(result.name).toEqual("new hero");
        done();
      });
    });
  });

  describe("#updateOne", () => {
    it("Should update a hero", (done) => {
      heroesDataAccessService
        .updateOne("0c42d7cb-d452-484c-831e-2fab38e09e12", "new name")
        .subscribe((result) => {
          expect(result!.id).toBeDefined();
          expect(result!.name).toEqual("new name");
          done();
        });
    });
  });

  describe("#deleteOne", () => {
    it("Should delete a hero", (done) => {
      heroesDataAccessService
        .deleteOne("0c42d7cb-d452-484c-831e-2fab38e09e12")
        .subscribe((result) => {
          expect(result).toBeTruthy();
          done();
        });
    });
  });
});
