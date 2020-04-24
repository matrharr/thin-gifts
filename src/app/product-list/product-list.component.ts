import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { debug } from 'util';
import { ActivatedRoute, Router } from '@angular/router';

const productTypeMap = {
  'Card': 'CA',
  'Gift': 'GI'
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

  @Output() selectProduct = new EventEmitter()

  selectedFilters = [];

  constructor(
    private ApiService:ApiService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {
    // if tag filter in url, call func
  }

  onSelectProduct(productId) {
    this.selectProduct.emit(productId)
  }

  onFilterChange(e) {
    console.log(e)
    if (e.checked) {
      this.selectedFilters.push(e.source.value);
    } else {
      delete this.selectedFilters[this.selectedFilters.indexOf(e.source.value)];
    }
    console.log(this.selectedFilters)
    
    this.ApiService.getProductsByTag(productTypeMap[this.productName], this.selectedFilters)
      .subscribe((data:any) => {
        console.log(data);
        this.products = data.results;
      });
  }

}
