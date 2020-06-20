import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: any;
  isEmpty: boolean;
  cartId: string;
  loading: boolean;
  stampCost: number;
  total: number;

  constructor(
    private ApiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.cartId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.loading = true;
    this.ApiService.getCart(this.cartId)
      .subscribe((data:any) => {
        this.cart = data;
        console.log(this.cart)
        this.loading = false;
        if (this.cart.cart_products.length == 0) {
          this.isEmpty = true;
        }
        this.calcTotal();
      });
  }

  calcTotal() {
    if (!this.isEmpty) {
      this.stampCost = this.cart.cart_products.length * 0.55;
      this.total = this.stampCost + this.cart.total_price.price__sum;
    }
  }

  deleteCartItem(item) {
    this.ApiService.deleteCartProduct(item.id)
      .subscribe((data:any) => {
        this.router.navigate(['/home']);
        console.log(data);
      })
  }

  editCartItem(item) {
    this.router.navigate(['/add-message', item.id]);
  }

  goToCheckout() {
    this.router.navigate(['/checkout', this.cart.id]);
  }
}
