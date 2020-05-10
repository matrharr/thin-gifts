import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @ViewChild('email', { static: true }) emailElement: ElementRef;
  paidFor = false;
  cartId: String;
  
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cartId = this.route.snapshot.params.id;
  }

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
          // const order = await actions.order.capture();
          const email = this.emailElement.nativeElement.value;
          this.ApiService.captureOrder(data.orderID, this.cartId, email)
            .subscribe((data:any) => {
              this.paidFor = true;
              console.log(data)
              // redirect to receipt page
              this.router.navigate(['/confirmation', data.id])
            })
        },
        onError: err => {
          // display to user
          console.log(err)
        }
      })
      .render(this.paypalElement.nativeElement);
  }

}
