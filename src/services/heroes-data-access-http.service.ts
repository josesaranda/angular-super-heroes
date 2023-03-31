import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Hero } from "./hero.interface";
import { HeroesDataAccessInterface } from "./heroes-data-access.interface";

export class HeroesDataAccessHttpService implements HeroesDataAccessInterface {
  private readonly baseURL = environment.baseURL; //mock-server base url

  constructor(private readonly httpClient: HttpClient) {}

  getAll(name?: string): Observable<Hero[]> {
    let options;
    if (name) {
      const params = new HttpParams();
      params.append(name, name);
      options = name ? { params } : undefined;
    }
    return this.httpClient.get<Hero[]>(this.baseURL + "/heroes", options);
  }

  getOne(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(this.baseURL + `/heroes/${id}`);
  }

  createOne(name: string): Observable<Hero> {
    return this.httpClient.post<Hero>(this.baseURL + "/heroes", { name });
  }

  updateOne(id: string, name: string): Observable<Hero | undefined> {
    return this.httpClient.put<Hero>(this.baseURL + `/heroes/${id}`, { name });
  }

  deleteOne(id: string): Observable<boolean> {
    return this.httpClient
      .delete<{ success: boolean }>(this.baseURL + `/heroes/${id}`)
      .pipe(map((result) => result.success));
  }
}
