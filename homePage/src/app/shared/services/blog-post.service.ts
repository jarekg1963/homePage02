import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { BlogPost } from '../models/BlogPost';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })

  };

  constructor(private http: HttpClient) {
    // this.myAppUrl = environment.urlAddress;
    this.myApiUrl = '.';
   }

   getBlogPosts(): Observable<BlogPost[]> {

    return this.http.get<BlogPost[]>(this.myApiUrl + '/api/BlogPosts/')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
    }

    getBlogPost(postId: number): Observable<BlogPost> {
      return this.http.get<BlogPost>(this.myApiUrl + '/api/BlogPosts/' + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }



  saveBlogPost(blogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.myApiUrl + '/api/BlogPosts/', JSON.stringify(blogPost), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

updateBlogPost(postId: number, blogPost): Observable<BlogPost> {
  return this.http.put<BlogPost>(this.myApiUrl + '/api/BlogPosts/' + postId, JSON.stringify(blogPost), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}


deleteBlogPost(postId: number): Observable<BlogPost> {
  return this.http.delete<BlogPost>(this.myApiUrl + '/api/BlogPosts/' + postId)
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
