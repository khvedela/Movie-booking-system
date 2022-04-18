import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { Movie } from "../models/movie.model";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private _url: string = 'https://localhost:44335';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie> {
    return this.http.get<Movie>(`${this._url}/api/Movie/GetAll`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createMovie(movieData: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this._url}/api/Movie/Create`, movieData)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
