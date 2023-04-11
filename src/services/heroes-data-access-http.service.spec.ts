import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import {
  anything,
  deepEqual,
  instance,
  mock,
  reset,
  verify,
  when,
} from "ts-mockito";
import { HeroesDataAccessHttpService } from "./heroes-data-access-http.service";

describe("HeroesDataAccessHttpService", () => {
  const mockedHttpClient = mock(HttpClient);
  const heroesDataAccessService = new HeroesDataAccessHttpService(
    instance(mockedHttpClient)
  );

  afterEach(() => {
    reset(mockedHttpClient);
  });

  it("Should be defined", () => {
    expect(heroesDataAccessService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should get all heroes", (done) => {
      const expectedResult = [
        { id: "0c42d7cb-d452-484c-831e-2fab38e09e12", name: "superman" },
        { id: "d6488caa-c03e-4248-a800-567cf33ab9e3", name: "spiderman" },
        { id: "14a129b5-1c04-4be2-baa0-0832a46bb5d1", name: "batman" },
        {
          id: "d3eb5f0b-da5e-4eea-af78-b7855f98ee46",
          name: "capitan america",
        },
        { id: "61683b64-57df-4669-90aa-63b7271c365d", name: "lobezno" },
        { id: "0ee6287c-6a31-4279-b0b1-a442bac5a16e", name: "hulk" },
      ];
      when(mockedHttpClient.get("/heroes", undefined)).thenReturn(
        of(expectedResult)
      );
      heroesDataAccessService.getAll().subscribe((result) => {
        expect(result).toEqual(expectedResult);
        verify(mockedHttpClient.get("/heroes", undefined)).once();
        done();
      });
    });

    it("Should get all heroes filtered by name", (done) => {
      const expectedResult = [
        { id: "0c42d7cb-d452-484c-831e-2fab38e09e12", name: "superman" },
        { id: "d6488caa-c03e-4248-a800-567cf33ab9e3", name: "spiderman" },
        { id: "14a129b5-1c04-4be2-baa0-0832a46bb5d1", name: "batman" },
      ];
      when(mockedHttpClient.get("/heroes", anything())).thenReturn(
        of(expectedResult as any)
      );
      heroesDataAccessService.getAll("man").subscribe((result) => {
        expect(result).toEqual(expectedResult);
        verify(mockedHttpClient.get("/heroes", anything())).once();
        done();
      });
    });
  });

  describe("#getOne", () => {
    it("Should get hero by id", (done) => {
      const expectedResult = {
        id: "0c42d7cb-d452-484c-831e-2fab38e09e12",
        name: "superman",
      };
      when(
        mockedHttpClient.get("/heroes/0c42d7cb-d452-484c-831e-2fab38e09e12")
      ).thenReturn(of(expectedResult));
      heroesDataAccessService
        .getOne("0c42d7cb-d452-484c-831e-2fab38e09e12")
        .subscribe((result) => {
          expect(result).toEqual(expectedResult);
          verify(
            mockedHttpClient.get("/heroes/0c42d7cb-d452-484c-831e-2fab38e09e12")
          ).once();
          done();
        });
    });
  });

  describe("#createOne", () => {
    it("Should create a hero", (done) => {
      const expectedResult = {
        id: "0c42d7cb-d452-484c-831e-2fab38e09e12",
        name: "new hero",
      };
      when(
        mockedHttpClient.post("/heroes", deepEqual({ name: "new hero" }))
      ).thenReturn(of(expectedResult));
      heroesDataAccessService.createOne("new hero").subscribe((result) => {
        expect(result.id).toBeDefined();
        expect(result.name).toEqual("new hero");
        verify(
          mockedHttpClient.post("/heroes", deepEqual({ name: "new hero" }))
        ).once();
        done();
      });
    });
  });

  describe("#updateOne", () => {
    it("Should update a hero", (done) => {
      const expectedResult = {
        id: "0c42d7cb-d452-484c-831e-2fab38e09e12",
        name: "new name",
      };
      when(
        mockedHttpClient.put(
          "/heroes/0c42d7cb-d452-484c-831e-2fab38e09e12",
          deepEqual({ name: "new name" })
        )
      ).thenReturn(of(expectedResult));
      heroesDataAccessService
        .updateOne("0c42d7cb-d452-484c-831e-2fab38e09e12", "new name")
        .subscribe((result) => {
          expect(result!.id).toBeDefined();
          expect(result!.name).toEqual("new name");
          verify(
            mockedHttpClient.put(
              "/heroes/0c42d7cb-d452-484c-831e-2fab38e09e12",
              deepEqual({ name: "new name" })
            )
          ).once();
          done();
        });
    });
  });

  describe("#deleteOne", () => {
    it("Should delete a hero", (done) => {
      const expectedResult = { success: true };
      when(
        mockedHttpClient.delete("/heroes/0c42d7cb-d452-484c-831e-2fab38e09e12")
      ).thenReturn(of(expectedResult));

      heroesDataAccessService
        .deleteOne("0c42d7cb-d452-484c-831e-2fab38e09e12")
        .subscribe((result) => {
          expect(result).toBeTruthy();
          verify(
            mockedHttpClient.delete(
              "/heroes/0c42d7cb-d452-484c-831e-2fab38e09e12"
            )
          ).once();
          done();
        });
    });
  });
});
