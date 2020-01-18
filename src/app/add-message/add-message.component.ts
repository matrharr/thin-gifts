import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {
  slides = [
    'cover',
    'card',
    'addressing'
  ];
  current = 1;

  constructor() { }

  ngOnInit() {
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

  isCover() {
    return this.slides[this.current] === 'cover';
  }

  isCard() {
    return this.slides[this.current] === 'card';
  }

  isAddressing() {
    return this.slides[this.current] === 'addressing';
  }

}
