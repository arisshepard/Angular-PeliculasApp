import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetailsResponse } from '../interfaces/movie-details-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';
import {
  ActorCreditsResponse,
  CastActor,
} from '../interfaces/actor-credits-response';
import { ActorDetailsResponse } from '../interfaces/actor-details-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  public carteleraPage = 1;
  public cargando = false;

  constructor(private http: HttpClient) {}

  // Todo esto tiene que ser string!!!
  get params(): any {
    return {
      api_key: environment.api_key,
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }

  getActorCredits(id: string): Observable<CastActor[]> {
    return this.http
      .get<ActorCreditsResponse>(
        `${environment.URL}/person/${id}/movie_credits?`,
        {
          params: this.params,
        }
      )
      .pipe(
        map((cast) => cast.cast),
        catchError(() => of(null))
      );
  }

  getActorDetails(id: string): Observable<ActorDetailsResponse> {
    return this.http
      .get<ActorDetailsResponse>(`${environment.URL}/person/${id}?`, {
        params: this.params,
      })
      .pipe(catchError(() => of(null)));
  }

  getCast(id: string): Observable<Cast[]> {
    const params = { ...this.params };

    return this.http
      .get<CreditsResponse>(`${environment.URL}/movie/${id}/credits?`, {
        params,
      })
      .pipe(
        map((credits: CreditsResponse) => credits.cast),
        catchError(() => of([]))
      );
  }

  getMovieDetails(id: string): Observable<MovieDetailsResponse> {
    const params = { ...this.params };

    return this.http
      .get<MovieDetailsResponse>(`${environment.URL}/movie/${id}?`, {
        params,
      })
      .pipe(catchError(() => of(null)));
  }

  getNowPlaying(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    // console.log('Cargando API');

    return this.http
      .get<CarteleraResponse>(`${environment.URL}/movie/now_playing?`, {
        params: this.params,
      })
      .pipe(
        map((respuesta: CarteleraResponse) => respuesta.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  resetPage(): void {
    this.carteleraPage = 1;
  }

  search(texto: string): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;

    // const params = { ...this.params, page: 1, query: texto };
    const params = { ...this.params, query: texto };

    return this.http
      .get<CarteleraResponse>(`${environment.URL}/search/movie`, {
        params,
      })
      .pipe(
        map((respuesta: CarteleraResponse) => respuesta.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }
}
