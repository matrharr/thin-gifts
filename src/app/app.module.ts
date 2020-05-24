import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CardListComponent } from './card-list/card-list.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddGiftcardComponent } from './add-giftcard/add-giftcard.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CardSliderComponent } from './card-slider/card-slider.component';
import {MatRadioModule} from '@angular/material/radio';
import { ProductListComponent } from './product-list/product-list.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CardListComponent,
    AddMessageComponent,
    AddAddressComponent,
    AddGiftcardComponent,
    CheckoutComponent,
    ConfirmationComponent,
    CardSliderComponent,
    ProductListComponent,
    PaymentComponent,
    ShoppingCartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ShoppingCartComponent]
})
export class AppModule { }
