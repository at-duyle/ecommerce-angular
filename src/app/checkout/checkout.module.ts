import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule, Routes } from '@angular/router';

import {
  ApiService,
  JwtService,
  UserService,
  NoAuthGuardService,
  AuthGuardService,
  NotificationService,
} from '../shared';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CheckoutModule { }
