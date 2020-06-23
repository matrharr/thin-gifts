import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  orderId: string;
  order: any;
  today = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  constructor(private ApiService: ApiService, private route: ActivatedRoute) { 
    this.orderId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.ApiService.getOrder(this.orderId)
      .subscribe((data: any) => {
        console.log(data)
        this.order = data;
      });
  }

}
