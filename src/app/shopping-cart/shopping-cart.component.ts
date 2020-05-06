import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: any

  constructor(
    private ApiService: ApiService,
    private router: Router,
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.ApiService.getCart(this.data.id)
      .subscribe((data:any) => {
        console.log(data);
        this.cart = data;
      });
  }

  deleteCartItem(item) {
    this.ApiService.deleteCartProduct(item.id)
      .subscribe((data:any) => {
        this.router.navigate(['/home']);
        this.dialogRef.close();
        console.log(data);
      })
  }

  goToCheckout() {
    this.router.navigate(['/checkout', this.cart.id]);
    this.dialogRef.close();
  }
}
