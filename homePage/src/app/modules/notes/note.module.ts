

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NotesService } from './notes.service';

import { NOTE_ROUTES } from './note.routes';
import { SortableHeaderDirective } from './note-list/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(NOTE_ROUTES, { useHash: true }),
    NgbModule
  ],
  declarations: [
    NoteListComponent,
    NoteEditComponent,
    SortableHeaderDirective
  ],
  providers: [NotesService],

  exports: []

})

export class NoteModule { }
