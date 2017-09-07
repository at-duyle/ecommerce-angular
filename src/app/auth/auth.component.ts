import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router
    ) {
    this.errors = new Error();
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  login(loginForm: NgForm){
    let credentials = loginForm.value;
    this.subscription = this.userService
    .attemptAuth(credentials)
    .subscribe(
      (data: any) => {
        let cart = data.user.cart;
        if(cart !== null){
          let cartTemp = this.cartService.getToken();
          if(cartTemp !== undefined){
            cartTemp = JSON.parse(cartTemp);
            for(let c of JSON.parse(cart['cart'])){
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
            this.cartService.updateCart(JSON.parse(cart['cart']), 'sync');
          }
        }
        this.router.navigateByUrl('/');
      },
      (err: any) => {
        this.errors = err.errors;
        console.log(err);
      }
      );
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }
}
