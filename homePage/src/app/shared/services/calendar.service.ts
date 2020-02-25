import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { calendarE } from '../models/calendarE';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public urlAddress  = ".";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })

  };


  constructor(private http: HttpClient) { }

  Getcalendarevents(): Observable<calendarE> {
    return this.http.get<calendarE>(this.urlAddress + '/api/calendar/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getEventsToList = () =>  {
    return this.http.get(this.urlAddress + '/api/calendar/');
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

 saveBEvent(calEvent): Observable<calendarE> {
  return this.http.post<calendarE>(this.urlAddress +  '/api/calendar/', JSON.stringify(calEvent), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
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
