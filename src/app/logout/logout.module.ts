import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
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
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: []
})
export class LogoutModule { }
