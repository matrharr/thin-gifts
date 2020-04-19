import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-add-giftcard',
  templateUrl: './add-giftcard.component.html',
  styleUrls: ['./add-giftcard.component.scss']
})
export class AddGiftcardComponent implements OnInit {
  gifts: any;
  categories: string[]
  constructor(private ApiService: ApiService) { }

  ngOnInit() {
    this.ApiService.getProducts('GI')
      .subscribe((data:any) => {
        console.log(data);
        this.gifts = data.cards;
        this.categories = data.tags.map(t => t.name);
      });
  }

}
