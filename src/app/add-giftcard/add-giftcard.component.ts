import { Component, OnInit } from '@angular/core';

export interface Product {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-add-giftcard',
  templateUrl: './add-giftcard.component.html',
  styleUrls: ['./add-giftcard.component.scss']
})
export class AddGiftcardComponent implements OnInit {
  products: Product[] = [
    {text: 'Amazon', cols: 2, rows: 1 },
    {text: 'Wal-Mart', cols: 2, rows: 1},
    {text: 'Applebees', cols: 2, rows: 1},
    {text: 'Best Buy', cols: 2, rows: 1},
    {text: 'iTunes', cols: 2, rows: 1},
    {text: 'Chick-fil-a', cols: 2, rows: 1},
    {text: 'Whole Foods', cols: 2, rows: 1},
    {text: 'Gamestop', cols: 2, rows: 1}
  ];

  themes = [
    'Restaurants',
    'Online',
    'Retail',
    'Music',
    'Grocery'
  ];
  constructor() { }

  ngOnInit() {
  }

}
