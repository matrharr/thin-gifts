import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExploreModalComponent } from './explore-modal/explore-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'thin-gifts';
  shopExpanded = false;
  exploreExpanded = false;

  constructor(public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(ExploreModalComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  toggleMenu(menu) {
    switch (menu) {
      case 'explore':
        this.shopExpanded = false;
        this.exploreExpanded = !this.exploreExpanded;
        break;
      case 'shop':
        this.exploreExpanded = false;
        this.shopExpanded = !this.shopExpanded;
        break;
    }
  }
}
