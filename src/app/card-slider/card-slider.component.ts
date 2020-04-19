import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';

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
  @Input() readOnly = false;

  constructor(private ApiService: ApiService) { }

  ngOnInit() {
    this.cardSliderColumns = (window.innerWidth <= 400) ? 9 : 18;
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

  saveMessage(e) {
    // get text from dom
    const message = {message:this.message.nativeElement.value}
    this.ApiService.addToCart(message)
      .subscribe((data:any) => {
        console.log(data);
      })
  }

}
