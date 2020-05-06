import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cartItemCount: number

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private ApiService: ApiService){
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
  }

  onRouteChange() {
    this.ApiService.getCartQuantity()
      .subscribe((data:any) => {
        this.cartItemCount = data.quantity;
      });
  }

}
