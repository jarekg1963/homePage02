import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  id: string;

  note: Note;

  feedback: any = {};
  constructor( private route: ActivatedRoute,
               private router: Router,
               private noteService: NotesService) { }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Note()); }
          // this.id = id;
          return this.noteService.findById(id);
        })
      )
      .subscribe(note => {
          this.note = note;
          // this.note.id = +note.id;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.noteService.save(this.note).subscribe(
      note => {
        this.note = note;
        // this.note.id = +this.id;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/notes']);
  }

}


