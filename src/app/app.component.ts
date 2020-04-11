import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
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

}
