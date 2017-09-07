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
  shops: Array<Shop>;
  subcriptionUser: Subscription;
  subcriptionShop: Subscription;
  subcriptionQuantity: Subscription;
  subcriptionTotalPrice: Subscription;
  subcriptionCart: Subscription;
  quantity: number;
  totalPrice:number;
  cart: Array<any>;

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
    this.subcriptionShop = this.shopService.getShops().subscribe(
      (data) => {
        this.shops = data;
        $(document).ready(function(){
          $('.carousel-showmanymoveone .item').each(function(){
            var itemToClone = $(this);

            for (var i=1;i<4;i++) {
              itemToClone = itemToClone.next();

              // wrap around if at end of item collection
              if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
              }

              // grab item, clone, add marker class, add to collection
              itemToClone.children(':first-child').clone()
              .addClass("cloneditem-"+(i))
              .appendTo($(this));
            }
          });
        });
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

  ngOnDestroy(){
    if(this.subcriptionUser != undefined){
      this.subcriptionUser.unsubscribe();
    }
    if(this.subcriptionShop != undefined){
      this.subcriptionShop.unsubscribe();
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
