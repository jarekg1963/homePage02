
import { NgModule } from '@angular/core';
import {
   MatDatepickerModule,
   MatNativeDateModule,
   MatFormFieldModule,
   MatInputModule,
   MatTabsModule,
} from '@angular/material';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import {MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressBarModule } from '@angular/material';
import {MatProgressSpinnerModule } from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({

   imports: [
    MatMenuModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatGridListModule,
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatSelectModule,
      MatCheckboxModule,
      MatIconModule,
      MatTableModule,
      MatToolbarModule,
      MatPaginatorModule,
      MatSortModule,
      MatTabsModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatButtonToggleModule,
      MatRadioModule
   ],
   exports: [
    MatMenuModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      MatGridListModule,
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatSelectModule,
     MatCheckboxModule,
     MatFormFieldModule,
     MatIconModule,
     MatTableModule,
     MatToolbarModule,
     MatPaginatorModule,
     MatSortModule,
     MatTabsModule,
     MatProgressBarModule,
     MatProgressSpinnerModule,
     MatButtonToggleModule,
     MatRadioModule
   ],
   providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],

})

export class MaterialModule { }
