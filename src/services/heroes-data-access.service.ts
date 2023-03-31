import { Observable, of } from "rxjs";
import { v4 } from "uuid";
import { Hero } from "./hero.interface";
import { HeroesDataAccessInterface } from "./heroes-data-access.interface";

export class HeroesDataAccessService implements HeroesDataAccessInterface {
  heroes: Hero[] = [
    { id: "0c42d7cb-d452-484c-831e-2fab38e09e12", name: "superman" },
    { id: "d6488caa-c03e-4248-a800-567cf33ab9e3", name: "spiderman" },
    { id: "14a129b5-1c04-4be2-baa0-0832a46bb5d1", name: "batman" },
    { id: "d3eb5f0b-da5e-4eea-af78-b7855f98ee46", name: "capitan america" },
    { id: "61683b64-57df-4669-90aa-63b7271c365d", name: "lobezno" },
    { id: "0ee6287c-6a31-4279-b0b1-a442bac5a16e", name: "hulk" },
  ];
  constructor() {}

  getAll(name?: string): Observable<Hero[]> {
    if (!name) return of(this.heroes);
    const pattern = new RegExp(name, "i");
    return of(this.heroes.filter((hero) => hero.name.match(pattern)));
  }

  getOne(id: string): Observable<Hero | undefined> {
    const hero = this.heroes.find((hero) => hero.id === id);
    return of(hero);
  }

  createOne(name: string): Observable<Hero> {
    const hero = { id: v4(), name };
    this.heroes.unshift(hero);
    return of(hero);
  }

  updateOne(id: string, name: string): Observable<Hero | undefined> {
    const heroIndex = this.heroes.findIndex((hero) => hero.id === id);
    if (heroIndex !== -1) {
      this.heroes[heroIndex].name = name;
    }
    return of(this.heroes[heroIndex]);
  }

  deleteOne(id: string): Observable<boolean> {
    const heroIndex = this.heroes.findIndex((hero) => hero.id === id);
    if (heroIndex !== -1) {
      this.heroes.splice(heroIndex, 1);
      return of(true);
    } else {
      return of(false);
    }
  }
}
