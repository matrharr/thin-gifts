import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal') paypalElement: ElementRef;
  paidFor = false;
  
  constructor() { }

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: '',
                amount: {
                  currency_code: 'USD',
                  value: 1
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
        },
        onError: err => {
          console.log(err)
        }
      })
      .render(this.paypalElement.nativeElement);
  }

}
