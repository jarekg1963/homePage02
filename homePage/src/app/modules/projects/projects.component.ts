import { Component, OnInit } from '@angular/core';



import { Person } from 'src/app/shared/models/Person';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  tiles = [
    {text: 'Shiba', cols: 1, rows: 2, color: 'lightgreen'},

    {text: 'Doggy', cols: 1, rows: 2, color: 'lightpink'},
    {text: 'Dog', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Doggo', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Doge', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Some Dog', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Text', cols: 1, rows: 2, color: '#DDBDF1'},
  ];

  public cardList: Article[] = [];


  constructor() { }

  ngOnInit() {
    this.wczytajMocka();
  }

  wczytajMocka() {
    this.cardList.push({
      remarks: "http://via.placeholder.com/300",
      note: "Card No. ",
      description:
        "Angular ",
      url: "",
      createddate: "",
      group: "",
      id: 1
    });
    this.cardList.push({
      remarks: "http://via.placeholder.com/300",
      note: "Card No. ",
      description:
        "Angular",
      url: "",
      createddate: "",
      group: "",
      id: 2
    });
    this.cardList.push({
      remarks: "http://via.placeholder.com/300",
      note: "Card No. ",
      description:
        "Angular ",
      url: "",
      createddate: "",
      group: "",
      id: 3
    });
  }
}
