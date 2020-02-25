

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';





@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent implements OnInit {
  public data = [
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
];
title = 'angulardatatables';
dtOptions: DataTables.Settings = {};
  constructor( public dialogRef: MatDialogRef<FullcalendarComponent>) {

   }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }



}
