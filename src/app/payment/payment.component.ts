import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ApiService } from '../services/api.service';

declare var paypal;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @ViewChild('email', { static: true }) emailElement: ElementRef;
  paidFor = false;
  cartId: String;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  @Input() itemTotal: number;
  @Input() numProducts: number;
  stampCost: number;
  total: number;
  
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cartId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.stampCost = this.numProducts * 0.55;
    this.total = this.stampCost + this.itemTotal;
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: '',
                amount: {
                  currency_code: 'USD',
                  value: this.total
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const email = this.emailElement.nativeElement.value;
          if (this.emailFormControl.invalid) {
            alert('Please fill in a valid email');
            return;
          }
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
          debugger;
          console.log(err)
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  ngOnChanges(change) {
    this.stampCost = this.numProducts * 0.55;
    this.total = this.stampCost + this.itemTotal;
  }

}
