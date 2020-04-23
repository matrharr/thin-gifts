import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddGiftcardComponent } from './add-giftcard/add-giftcard.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { CardListComponent } from './card-list/card-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'add-address', component: AddAddressComponent },
  { path: 'add-giftcard', component: AddGiftcardComponent },
  { path: 'add-message/:id', component: AddMessageComponent },
  { path: 'card-list', component: CardListComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
