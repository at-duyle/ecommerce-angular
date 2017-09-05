import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SlimScroll } from 'angular-io-slimscroll';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models';
import { UserService } from '../../services'
import { Shop } from '../../models';
import { ShopService } from '../../services'

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  currentUser: User;
  shops: Array<Shop>;
  subcriptionUser: Subscription;
  subcriptionShop: Subscription;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private router: Router
    ) {}

  ngOnInit() {
    this.subcriptionUser = this.userService.currentUser.subscribe(
      (userData) => {
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
  }

  ngAfterViewInit(){

  }

  onClick = (id :any) => {
    if(id === '#myCarousel-prev'){
      $('#myCarousel').carousel('prev');
    } else{
      $('#myCarousel').carousel('next');
    }
  }

  ngOnDestroy(){
    if(this.subcriptionUser != undefined){
      this.subcriptionUser.unsubscribe();
    }
    if(this.subcriptionShop != undefined){
      this.subcriptionShop.unsubscribe();
    }
  }
}
