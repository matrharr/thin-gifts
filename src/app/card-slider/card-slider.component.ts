import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

export let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];



@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider2.component.html',
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent implements OnInit {
  @ViewChild("message", {static: false}) message: ElementRef
  @ViewChild("message") set message1(message:ElementRef) {
    if(this.messageData){
      this.message.nativeElement.value = this.messageData;
    }
  }
  @ViewChild("simpleMessage") simpleMessage: ElementRef
  slides = [
    'cover',
    'card',
    'addressing'
  ];
  
  fontOptions = [
    { value: 'CURSIVE', text: 'Cursive' },
    { value: 'REGULAR', text: 'Regular' },
  ];

  sizeOptions = [
    { value: '', text: '' },
    { value: 16, text: '16' },
    { value: 32, text: '32' },
    { value: 64, text: '64' },
  ];

  colorOptions = [
    { value: 'BLACK', text: 'Black' },
    { value: 'LIGHT_BLUE', text: 'Light Blue' },
  ];

  current = 1;
  cardSliderColumns: number;
  card: any;
  states = states;
  loading: boolean;
  messageData: any;
  font = 'CURSIVE';
  color = 'BLACK';
  @Input() cartProductId: string;
  @Input() readOnly = false;

  constructor(
    private ApiService: ApiService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.cardSliderColumns = (window.innerWidth <= 400) ? 9 : 18;
    this.ApiService.getCartProduct(this.cartProductId)
      .subscribe((data:any) => {
        console.log(data)
        this.card = data;
        this.loading = false;
        if (data.message) {
          this.messageData = data.message;
        }
      })
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

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
      color: this.color,
      font: this.font,
      return_address: returnAddress,
      recipient_address: recipientAddress
    }
    this.ApiService.updateCartProduct(reqData, this.cartProductId)
      .subscribe((data:any) => {
        console.log(data);
        this.router.navigate(['/checkout', data.shopping_cart])
      })
  }

  saveSimpleMessage() {
    const message = this.simpleMessage.nativeElement.value;
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

  onFontChange(value) {
    this.font = value;
    if(value === "regular") {
      this.message.nativeElement.style.fontFamily = "Times New Roman";
    }
    else if(value === "cursive") {
      this.message.nativeElement.style.fontFamily = "Cursive";
    }
  }

  onColorChange(value) {
    this.color = value;
    if(value === "black") {
      this.message.nativeElement.style.color = "black";
    }
    else if(value === "blue") {
      this.message.nativeElement.style.color = "rgb(90,128,152)";
    }
  }

}
