import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';

// Import your library
import { SlimScroll } from 'angular-io-slimscroll';
import { HomeComponent } from './shared/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';

// Import services
import {
  ApiService,
  JwtService,
  UserService,
  NoAuthGuardService,
  AuthGuardService,
  NotificationService,
  CategoryService,
  ProductService
} from './shared';
import { ShowAuthedDirective } from './shared/directives/show-authed.directive';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuBarComponent } from './shared/layouts/menu-bar/menu-bar.component';
import { SliderComponent } from './slider/slider.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { RouterLinkDirective } from './shared/directives/router-link.directive';
import { ImageProductPipe } from './shared/pipes/image-product.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
        { path: 'categories/:id/:type/products', component: ProductsByCategoryComponent, outlet:'main'}
    ] },
  { path: 'login', component: AuthComponent, canActivate: [NoAuthGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuardService] },
  { path: 'error', component: ErrorComponent }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    SlimScroll,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthComponent,
    RegisterComponent,
    ShowAuthedDirective,
    ErrorComponent,
    LogoutComponent,
    MenuBarComponent,
    SliderComponent,
    ProductsByCategoryComponent,
    RouterLinkDirective,
    ImageProductPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    ShowAuthedDirective,
    ApiService,
    JwtService,
    UserService,
    NoAuthGuardService,
    AuthGuardService,
    NotificationService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
