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
  cartId: string;

  constructor(
    private ApiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.cartId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.ApiService.getCart(this.cartId)
      .subscribe((data:any) => {
        console.log(data);
        this.cart = data;
        console.log(this.cart)
      });
  }

  deleteCartItem(item) {
    this.ApiService.deleteCartProduct(item.id)
      .subscribe((data:any) => {
        this.router.navigate(['/home']);
        console.log(data);
      })
  }

  editCartItem(item) {
    debugger
    this.router.navigate(['/add-message', item.id]);
  }

  goToCheckout() {
    this.router.navigate(['/checkout', this.cart.id]);
  }
}
