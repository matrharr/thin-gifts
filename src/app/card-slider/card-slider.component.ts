import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

export let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];



@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider2.component.html',
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent implements OnInit {
  @ViewChild("message", {static: false}) message: ElementRef
  @ViewChild("message") set message1(message:ElementRef) {
    if(this.messageData && this.message){
      this.message.nativeElement.value = this.messageData;
      if(this.color) {
        this.onColorChange(this.color);
      }
      if(this.font) {
        this.onFontChange(this.font);
      }
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

  addressForm: FormGroup;
  messageForm: FormGroup;
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
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loading = true;
    this.cardSliderColumns = (window.innerWidth <= 400) ? 9 : 18;
    this.ApiService.getCartProduct(this.cartProductId)
      .subscribe((data:any) => {
        console.log(data)
        this.card = data;
        this.loading = false;
        this.buildForm();
        if (data.message) {
          this.messageData = data.message;
          this.color = data.color;
          this.font = data.font;
        }
      })

  }

  getAddressInfoFromRes(data) {
    if(data) {
      return {
        name: data.name,
        street: data.street,
        street2: data.street2,
        city: data.city,
        state: data.state,
        code: data.code
      }
    }
    return {
      name: '',
      street: '',
      street2: '',
      city: '',
      state: '',
      code: ''
    }
  }

  buildForm() {
    const recipient = this.getAddressInfoFromRes(this.card.recipient_address);
    const ret = this.getAddressInfoFromRes(this.card.return_address);
    this.addressForm = this.fb.group({
      returnName: ret.name,
      returnAddress1: ret.street,
      returnAddress2: ret.street2,
      returnCity: ret.city,
      returnState: ret.state,
      returnZip: ret.code,
      recipientName: recipient.name,
      recipientAddress1: recipient.street,
      recipientAddress2: recipient.street2,
      recipientCity: recipient.city,
      recipientState: recipient.state,
      recipientZip: recipient.code 
    });
    this.messageForm = this.fb.group({
      text: this.messageData || ['Dear , \n\n\n\n    Best,']
    })
    if (this.readOnly) {
      this.addressForm.disable();
      this.messageForm.disable();
    }
  }

  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {

  //   if (event.keyCode === 39) {
  //     this.moveRight();
  //   }

  //   if (event.keyCode === 37) {
  //     this.moveLeft();
  //   }
  // }

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
      name: this.addressForm.value.returnName,
      street: this.addressForm.value.returnAddress1,
      street2: this.addressForm.value.returnAddress2,
      city: this.addressForm.value.returnCity,
      state: this.addressForm.value.returnState,
      code: this.addressForm.value.returnZip
    }
  }

  getRecipientAddress() {
    return {
      name: this.addressForm.value.recipientName,
      street: this.addressForm.value.recipientAddress1,
      street2: this.addressForm.value.recipientAddress2,
      city: this.addressForm.value.recipientCity,
      state: this.addressForm.value.recipientState,
      code: this.addressForm.value.recipientZip
    }
  }

  saveMessage(e) {
    const message = this.messageForm.value.text;
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
      color: "BLACK",
      font: "CURSIVE",
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
    if(value === "REGULAR") {
      this.message.nativeElement.style.fontFamily = "Times New Roman";
    }
    else if(value === "CURSIVE") {
      this.message.nativeElement.style.fontFamily = "Cursive";
    }
  }

  onColorChange(value) {
    this.color = value;
    if(value === "BLACK") {
      this.message.nativeElement.style.color = "black";
    }
    else if(value === "LIGHT_BLUE") {
      this.message.nativeElement.style.color = "rgb(90,128,152)";
    }
  }

  deleteCartId(id) {
    this.ApiService.deleteCartProduct(id)
      .subscribe((data:any) => {
        this.router.navigate(['/checkout', data.shopping_cart])
        console.log(data);
      })
  }

}
