import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: []
})
export class ProfileModule { }
