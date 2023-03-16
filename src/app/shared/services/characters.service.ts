import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICharacterResponse } from '../interfaces/ICharacter';
import { IResultResponse } from '../interfaces/IResult';

@Injectable({
  providedIn: 'root'
})
export class CharactersService implements Resolve<IResultResponse>{
  private url = environment.BACKEND_URL;
  private api = { characters: `${this.url}/character` };

  constructor(
    private http: HttpClient,
  ) { }

  getAll(page:number): Observable<ICharacterResponse> {
    return this.http.get<ICharacterResponse>(`${this.api.characters}/?page=${page}`);
  }

  getOne(id: number): Observable<IResultResponse> {
    return this.http.get<IResultResponse>(`${this.api.characters}/${id}`);
  }

  getFiltered(name: string | null): Observable<ICharacterResponse> {
    return this.http.get<ICharacterResponse>(`${this.api.characters}/?name=${name}`);
  }

  resolve(route: ActivatedRouteSnapshot): IResultResponse | Promise<IResultResponse> | Observable<IResultResponse> {
    const currentID = Number(route.paramMap.get('id'));
    return this.getOne(currentID);
  }
}
