import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from '../home/home.component';
import { ProductsByCategoryComponent } from '../products-by-category/products-by-category.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

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
  { path: 'home', component: MainComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'categories/:slug/:type/products', component: ProductsByCategoryComponent },
    { path: 'product/:slug', component: ProductDetailComponent }
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
export class MainModule { }
