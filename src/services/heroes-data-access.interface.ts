import { Observable } from "rxjs";
import { Hero } from "./hero.interface";

export interface HeroesDataAccessInterface {
  getAll(name?: string): Observable<Hero[]>;
  getOne(id: string): Observable<Hero | undefined>;
  createOne(name: string): Observable<Hero>;
  updateOne(id: string, name: string): Observable<Hero | undefined>;
  deleteOne(id: string): Observable<boolean>;
}
