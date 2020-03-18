import { Note } from './note';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoteFilter } from './note-filter';



const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  noteList: Note[] = [];

  api = 'http://localhost:80/api/notes';

  size$ = new BehaviorSubject<number>(0);


  constructor(private http: HttpClient) { }

  findById(id: string): Observable<Note> {
    const url = `${this.api}/${id}`;
    const params = { id };
    return this.http.get<Note>(url, {params, headers});
  }



  load(filter: NoteFilter): void {
    this.find(filter).subscribe(result => {
        this.noteList = result;

      },
      err => {
        console.error('error loading', err);
      }
    );
  }


  find(filter: NoteFilter): Observable<Note[]> {
    const params: any = {
      title: filter.title,
      sort: `${filter.column},${filter.direction}`,
      size: filter.size,
      page: filter.page
    };
    if (!filter.direction) { delete params.sort; }
    const userNotes = 'http://localhost:80/api/notes';
    return this.http.get(userNotes, { headers}).pipe(
      map((response: any) => {
      this.size$.next(response.totalElements);

      return response;
      })
    );
  }


  save(entity: Note): Observable<Note> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Note>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Note>(url, entity, {headers, params});
    }

  }



  delete(entity: Note): Observable<Note> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Note>(url, {headers, params});
    }
    return null;
  }

}

