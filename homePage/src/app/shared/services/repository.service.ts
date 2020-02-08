import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/article';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  public urlAddress  = ".";

  constructor(private http: HttpClient) { }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, this.urlAddress));
  }

  GetDatapipe(): Observable<Article> {
    return this.http.get<Article>(this.urlAddress + '/api/link/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  public Addnew = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, this.urlAddress), body, this.generateHeaders());
  }

  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route, this.urlAddress), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    console.log('from service ' + this.createCompleteRoute(route, this.urlAddress));
    return this.http.delete(this.createCompleteRoute(route, this.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
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


