import { Component, OnInit } from '@angular/core';



import { Person } from 'src/app/shared/models/Person';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
 // persons: Person[] = [];
 persons: any;


title = 'angulardatatables';

message = '';

  constructor() { }

  ngOnInit() {
  }
}