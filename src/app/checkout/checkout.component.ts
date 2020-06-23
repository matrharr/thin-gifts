import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartId: string;
  cart: any;
  total: number;
  shoppingCartProducts: number[];
  shoppingCartProductsCount: number;

  constructor(private ApiService: ApiService, private route: ActivatedRoute) { 
    this.cartId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.ApiService.getCart(this.cartId)
      .subscribe((data: any) => {
        console.log(data)
        this.cart = data;
        this.shoppingCartProducts = data.shopping_cart_products_detail;
        this.shoppingCartProductsCount = this.shoppingCartProducts.length;
        this.total = data.total_price.price__sum;
      });
  }

}
