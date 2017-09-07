import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordConfirmComponent } from './reset-password-confirm.component';
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
  { path: 'reset_password', component: ResetPasswordConfirmComponent, canActivate: [NoAuthGuardService] },
  { path: 'reset/:resetToken', component: ResetPasswordConfirmComponent, canActivate: [NoAuthGuardService] }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: []
})
export class ResetPasswordConfirmModule { }
