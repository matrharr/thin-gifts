import { Component, OnInit, Input } from '@angular/core';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() filterOptions: string[];
  @Input() products: any;
  @Input() productName: string;

  constructor() { }

  ngOnInit() {
  }

}
