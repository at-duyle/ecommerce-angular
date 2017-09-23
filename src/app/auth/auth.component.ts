import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/services';
import { Subscription } from 'rxjs';

import * as $ from 'jquery';

import { Error } from '../shared/models/error';
import { UserService } from '../shared/services';
import { CartService } from '../shared/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {
  errors: Error;
  subscription: Subscription;
  returnUrl: string;
  constructor(
    private notify: NotificationService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.errors = new Error();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  ngAfterViewInit(){
  }

  login(loginForm: NgForm){
    let credentials = loginForm.value;
    this.subscription = this.userService
    .attemptAuth(credentials)
    .subscribe(
      (data: any) => {
        setTimeout(function(){
        }, 4000);
        let cart = data.user.cart;
        if(cart == null){
          let cartTemp = this.cartService.getToken();
          if(cartTemp != undefined ){
            cartTemp = JSON.parse(cartTemp);
            this.cartService.destroyToken();
            this.cartService.updateCart(cartTemp, 'sync');
          }
        } else {
          cart = JSON.parse(cart['cart']);
          if(cart.length > 0){
            let cartTemp = this.cartService.getToken();
            if(cartTemp != undefined ){
              cartTemp = JSON.parse(cartTemp);
              for(let c of cart){
                let index = cartTemp.findIndex(x => x.slug === c.slug);
                if(index == -1){
                  cartTemp.push(c);
                } else {
                  cartTemp[index].quantity = (Number(cartTemp[index].quantity)) + (Number(c.quantity));
                }
              }
              this.cartService.destroyToken();
              this.cartService.updateCart(cartTemp, 'sync');
            } else {
              this.cartService.updateCart(cart, 'sync');
            }
          } else {
            let cartTemp = this.cartService.getToken();
            if(cartTemp !== undefined){
              cartTemp = JSON.parse(cartTemp);
              console.log(cartTemp);
              for(let c of cart){
                let index = cartTemp.findIndex(x => x.slug === c.slug);
                if(index == -1){
                  cartTemp.push(c);
                } else {
                  cartTemp[index].quantity = (Number(cartTemp[index].quantity)) + (Number(c.quantity));
                }
              }
              this.cartService.destroyToken();
              this.cartService.updateCart(cartTemp, 'sync');
            }
          }
        }
        this.router.navigateByUrl(this.returnUrl);
      },
      (err: any) => {
        this.notify.printErrorMessage(err.errors);
      }
      );
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }
}
