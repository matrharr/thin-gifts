import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  cards: any;

  constructor(private ApiService: ApiService) { }

  ngOnInit() {
    this.ApiService.getProducts('CA', {limit: 3})
      .subscribe((data:any) => {
        console.log(data)
        this.cards = data.cards;
      });
  }

}
