import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from './services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cartItemCount: number;
  cartId: number;

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer, 
    private ApiService: ApiService,
    public dialog: MatDialog,
    private router: Router
  ){
    iconRegistry.addSvgIcon(
      'card',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/christmas-card.svg')
    );
    iconRegistry.addSvgIcon(
      'gift',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/gift-card.svg')
    );
    iconRegistry.addSvgIcon(
      'keyboard',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/keyboard.svg')
    );
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons8-facebook.svg')
    );
    iconRegistry.addSvgIcon(
      'instagram',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons8-instagram.svg')
    );
  }

  onRouteChange() {
    this.ApiService.getCartQuantity()
      .subscribe((data:any) => {
        this.cartItemCount = data.quantity;
        this.cartId = data.id;
      });
  }

  openCartModal() {
    if (this.cartId) {
      this.router.navigate(['/shopping-cart', this.cartId])
    }
  }

}
