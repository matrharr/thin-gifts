import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {
  cartProductId: string;

  constructor(private route: ActivatedRoute) { 
    this.cartProductId = this.route.snapshot.params.id;
  }

  ngOnInit() {
  }

}
