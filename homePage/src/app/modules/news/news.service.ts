import { Article } from './../../shared/models/article';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  key = 'cc923539a8be40178ac40171df423f31';
  news: [];
  constructor(private http: HttpClient) { }

  // getTopHeadLines(){
  //   return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.key);
  // }


    getTopHeadLines(): Observable<[]> {
      return this.http.get<[]>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.key)
      .pipe(retry(1),
      catchError(this.errorHandler)
      );
  }


  getNewBySource(source): Observable<[]>{
    return this.http.get<[]>('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey='+ this.key)
    .pipe(retry(1),
    catchError(this.errorHandler)
    );
  }
  getSources(): Observable<[]>{
    return this.http.get<[]>('https://newsapi.org/v2/sources?apiKey=' + this.key)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
