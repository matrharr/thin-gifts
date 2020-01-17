import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardListComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'Happy Thanksgiving', cols: 2, rows: 1 },
    {text: 'Merry Christmas', cols: 2, rows: 1},
    {text: 'Valentines', cols: 2, rows: 1},
    {text: 'Thank You', cols: 2, rows: 1},
    {text: 'Happy Birthday', cols: 2, rows: 1},
    {text: 'Being there', cols: 2, rows: 1},
    {text: 'Wedding', cols: 2, rows: 1},
    {text: 'Bar Mitzvah', cols: 2, rows: 1}
  ];

  themes = [
    'Christmas',
    'Thanksgiving',
    'Birthday',
    'Thank You',
    'Valentines'
  ];
  constructor() { }

  ngOnInit() {
  }

}
