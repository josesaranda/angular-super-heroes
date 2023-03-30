import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hero, HeroesDataAccessService } from "./heroes-data-access.service";

@Injectable({
  providedIn: "root",
})
export class HeroesService {
  constructor(private heroesDataAccessService: HeroesDataAccessService) {}

  getAll(name?: string): Observable<Hero[]> {
    return this.heroesDataAccessService.getAll(name);
  }

  getOne(id: string): Observable<Hero | undefined> {
    return this.heroesDataAccessService.getOne(id);
  }

  createOne(name: string): Observable<Hero> {
    return this.heroesDataAccessService.createOne(name);
  }

  updateOne(id: string, name: string): Observable<Hero | undefined> {
    return this.heroesDataAccessService.updateOne(id, name);
  }

  deleteOne(id: string): Observable<boolean> {
    return this.heroesDataAccessService.deleteOne(id);
  }
}
