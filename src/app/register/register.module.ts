import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterConfirmComponent } from '../register-confirm/register-confirm.component';
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
  { path: 'register', children: [
    { path: '', component: RegisterComponent, canActivate: [NoAuthGuardService] },
    { path: 'confirm', component: RegisterConfirmComponent },
    { path: 'accept/:userId/:confirmToken', component: RegisterConfirmComponent }
  ] }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: []
})
export class RegisterModule { }
