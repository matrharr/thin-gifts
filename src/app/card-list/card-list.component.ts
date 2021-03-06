import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardListComponent implements OnInit {
  cards: any;
  categories: string[];
  loading: boolean;
  constructor(private ApiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.ApiService.getProducts('CA')
      .subscribe((data:any) => {
        console.log(data);
        this.cards = data.cards;
        this.categories = data.tags.map(t => t);
        // this.loading = false;
      });
  }

  addCardToCart(cardId) {
    const cartData = {
      product: cardId
    };
    console.log(cardId);
    this.ApiService.addToCart(cartData).
      subscribe((data:any) => {
        console.log(data);
        this.router.navigate(['/add-message', data.id]);
      })
  }


}
