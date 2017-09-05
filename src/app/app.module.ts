import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';

// Import Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuBarComponent } from './shared/layouts/menu-bar/menu-bar.component';
import { SliderComponent } from './slider/slider.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { MainComponent } from './main/main.component';

// Import your libraries
import { SlimScroll } from 'angular-io-slimscroll';

//Import Modules
import { AuthModule } from './auth/auth.module';
import { LogoutModule } from './logout/logout.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { ShopDetailModule } from './shop-detail/shop-detail.module';
import { MainModule } from './main/main.module';

// Import services
import {
  ApiService,
  JwtService,
  UserService,
  NoAuthGuardService,
  AuthGuardService,
  NotificationService,
  CategoryService,
  ProductService,
  OrderService,
  ShopService,
  CartService
} from './shared';

//Import Directives
import { ShowAuthedDirective } from './shared/directives/show-authed.directive';

// Import Pipes
import { ImageProductPipe } from './shared/pipes/image-product.pipe';
import { ProfileComponent } from './profile/profile.component';
import { OrderByProductsPipe } from './shared/pipes/order-by-products.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AvailableProductPipe } from './shared/pipes/available-product.pipe';
import { RoundPricePipe } from './shared/pipes/round-price.pipe';
import { SearchComponent } from './search/search.component';
import { OrderByTimePipe } from './shared/pipes/order-by-time.pipe';
import { CarouselPipe } from './shared/pipes/carousel.pipe';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';


const routes: Routes = [
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
    MainComponent,
    ImageProductPipe,
    ProfileComponent,
    OrderByProductsPipe,
    ProductDetailComponent,
    AvailableProductPipe,
    RoundPricePipe,
    SearchComponent,
    OrderByTimePipe,
    CarouselPipe,
    ShopDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvYzBYOmXgVn8H6jCwr-M_djo3wK3ZDFE'
    }),
    routing,
    AuthModule,
    LogoutModule,
    RegisterModule,
    ProfileModule,
    ShopDetailModule,
    MainModule
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
    ProductService,
    OrderService,
    ShopService,
    CartService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
