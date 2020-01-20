import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'thin-gifts';
  shopExpanded = false;
  exploreExpanded = false;

  expandShop() {
    this.shopExpanded = !this.shopExpanded;
  }

  expandExplore() {
    this.exploreExpanded = !this.exploreExpanded;
  }
}
