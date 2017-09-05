import { NgModule } from '@angular/core';
import { ShopDetailComponent } from './shop-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import {
  ApiService,
  JwtService,
  ProductService,
  ShopService,
  NotificationService,
} from '../shared';

const routes: Routes = [
  { path: 'shop/:slug', component: ShopDetailComponent }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvYzBYOmXgVn8H6jCwr-M_djo3wK3ZDFE'
    }),
    routing
  ],
  declarations: []
})
export class ShopDetailModule { }
