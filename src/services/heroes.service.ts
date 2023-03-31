import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Hero } from "./hero.interface";
import { HeroesDataAccessHttpService } from "./heroes-data-access-http.service";
import { HeroesDataAccessInterface } from "./heroes-data-access.interface";
import { HeroesDataAccessService } from "./heroes-data-access.service";

@Injectable({
  providedIn: "root",
})
export class HeroesService {
  heroesDataAccessService: HeroesDataAccessInterface;

  constructor(private readonly httpClient: HttpClient) {
    if (environment.baseURL) {
      this.heroesDataAccessService = new HeroesDataAccessHttpService(
        this.httpClient
      );
    } else {
      this.heroesDataAccessService = new HeroesDataAccessService();
    }
  }

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
