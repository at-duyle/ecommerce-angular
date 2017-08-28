import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
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
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuardService] }
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
