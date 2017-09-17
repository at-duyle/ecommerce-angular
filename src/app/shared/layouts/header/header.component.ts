import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SlimScroll } from 'angular-io-slimscroll';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models';
import { UserService } from '../../services'
import { Shop } from '../../models';
import { ShopService } from '../../services'
import { CartService } from '../../services'

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: User;
  subcriptionUser: Subscription;
  subcriptionQuantity: Subscription;
  subcriptionTotalPrice: Subscription;
  subcriptionCart: Subscription;
  quantity: number;
  totalPrice:number;
  cart: Array<any>;
  keyword: any;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private router: Router,
    private cartService: CartService
    ) {
    this.quantity = 0;
    this.totalPrice = 0;
  }

  ngOnInit() {
    this.subcriptionUser = this.userService.currentUser.subscribe(
      (userData: any) => {
        this.currentUser = userData;
      }
      );
    this.subcriptionQuantity = this.cartService.quantity.subscribe(
      (data: any) => {
        this.quantity = data;
      }
      );
    this.subcriptionTotalPrice = this.cartService.totalPrice.subscribe(
      (data: any) => {
        this.totalPrice = data;
      }
      );
    this.subcriptionCart = this.cartService.cart.subscribe(
      (data: any) => {
        this.cart = data;
      }
      );
  }

  onClick = (id :any) => {
    if(id === '#myCarousel-prev'){
      $('#myCarousel').carousel('prev');
    } else{
      $('#myCarousel').carousel('next');
    }
  }

  deleteCart(product){
    this.cartService.deleteCart(product);
  }

  search(){
    this.router.navigate(['/home/search'], { queryParams: { q: this.keyword } });
    this.keyword = null;
  }

  ngOnDestroy(){
    if(this.subcriptionUser != undefined){
      this.subcriptionUser.unsubscribe();
    }
    if(this.subcriptionQuantity != undefined){
      this.subcriptionQuantity.unsubscribe();
    }
    if(this.subcriptionTotalPrice != undefined){
      this.subcriptionTotalPrice.unsubscribe();
    }
    if(this.subcriptionCart != undefined){
      this.subcriptionCart.unsubscribe();
    }
  }
}
