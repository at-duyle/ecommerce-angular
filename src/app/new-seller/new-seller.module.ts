import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSellerComponent } from './new-seller.component';
import { RouterModule, Routes } from '@angular/router';

import {
  ApiService,
  JwtService,
  UserService,
  NotificationService,
} from '../shared';

const routes: Routes = [
  { path: 'request_new_seller', component: NewSellerComponent }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: []
})
export class NewSellerModule { }
