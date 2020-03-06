import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { file } from '../models/file';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  public urlAddress  = ".";

  constructor(private http: HttpClient) { }

  getAllDocuments(postId: number): Observable<file[]> {
    return this.http.get<file[]>(this.urlAddress + '/api/uploadfiles/' + postId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}


deleteBlogPost(idfordelete: number): Observable<file> {
  return this.http.delete<file>(this.urlAddress + '/api/uploadfiles/' + idfordelete)
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

public getPDF(nazwaPliku): Observable<Blob> {
  //const options = { responseType: 'blob' }; there is no use of this
      let uri = this.urlAddress + '/api/downloadfiles?fileName=' + nazwaPliku;
      // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
      return this.http.get(uri, { responseType: 'blob' });
  }


}

