import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProductsByCategoryComponent } from '../products-by-category/products-by-category.component';

import {
  ApiService,
  JwtService,
  UserService,
  NoAuthGuardService,
  AuthGuardService,
  NotificationService,
  CategoryService,
  ProductService
} from '../shared';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'categories/:slug/:type/products', component: ProductsByCategoryComponent }
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
export class HomeModule { }
