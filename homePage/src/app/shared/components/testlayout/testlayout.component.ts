import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testlayout',
  templateUrl: './testlayout.component.html',
  styleUrls: ['./testlayout.component.scss']
})
export class TestlayoutComponent implements OnInit {
  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];


  constructor() { }

  ngOnInit() {
  }

}
