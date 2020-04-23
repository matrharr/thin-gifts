import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private ApiService: ApiService) { }

  ngOnInit() {
    this.ApiService.getCart(73)
      .subscribe((data) => {
        console.log(data)
      });
  }

}
