import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent implements OnInit {
  @ViewChild("message") message: ElementRef
  slides = [
    'cover',
    'card',
    'addressing'
  ];
  
  fontOptions = [
    { value: '', text: '' },
    { value: 'arial', text: 'Arial' },
    { value: 'roboto', text: 'Roboto' },
    { value: 'verdana', text: 'Verdana' },
  ];

  sizeOptions = [
    { value: '', text: '' },
    { value: 16, text: '16' },
    { value: 32, text: '32' },
    { value: 64, text: '64' },
  ];

  colorOptions = [
    { value: '', text: '' },
    { value: 'blue', text: 'Blue' },
    { value: 'red', text: 'Red' },
    { value: 'green', text: 'Green' },
  ];

  current = 1;
  cardSliderColumns: number;
  @Input() cartProductId: string;
  @Input() readOnly = false;

  constructor(
    private ApiService: ApiService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.cardSliderColumns = (window.innerWidth <= 400) ? 9 : 18;
    // on individual this is fine, but on checkout, will need to sync this with multiple items, can't just pull id from url because that will be cart id not cart prod id
    this.ApiService.getCartProduct(this.cartProductId)
      .subscribe((data:any) => {
        console.log(data)
        if (data.message) {
          this.message.nativeElement.value = data.message;
        }
      })
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === 39) {
      this.moveRight();
    }

    if (event.keyCode === 37) {
      this.moveLeft();
    }
  }

  moveLeft() {
    if (this.current > 0) {
      this.current -= 1;
    }
  }

  moveRight() {
    if (this.current < 2) {
      this.current += 1;
    }
  }

  changeSlide(slide) {
    switch (slide) {
      case 'cover':
        this.current = 0;
        break;
      case 'card':
        this.current = 1;
        break;
      case 'addressing':
        this.current = 2;
        break;
    }
  }

  isCover() {
    return this.slides[this.current] === 'cover';
  }

  isCard() {
    return this.slides[this.current] === 'card';
  }

  isAddressing() {
    return this.slides[this.current] === 'addressing';
  }

  getReturnAddress() {
    return {
      name: 'Matt Harris',
      street: '509 e 85th street',
      city: 'New York',
      state: 'NY',
      code: '10028'
    }
  }

  getRecipientAddress() {
    return {
      name: 'Jen Fang',
      street: '360 state street',
      city: 'New Haven',
      state: 'CT',
      code: '06510'
    }
  }

  saveMessage(e) {
    const message = this.message.nativeElement.value;
    const returnAddress = this.getReturnAddress();
    const recipientAddress = this.getRecipientAddress();
    const reqData = {
      message: message,
      return_address: returnAddress,
      recipient_address: recipientAddress
    }
    this.ApiService.updateCartProduct(reqData, this.cartProductId)
      .subscribe((data:any) => {
        console.log(data);
        this.router.navigate(['/checkout', data.shopping_cart])
      })
  }

}
