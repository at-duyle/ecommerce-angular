import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { Cart } from '../models'
@Injectable()
export class CartService {
  private quantitySubject = new BehaviorSubject<number>(0);
  public quantity = this.quantitySubject.asObservable().distinctUntilChanged();
  private totalPriceSubject = new BehaviorSubject<number>(0);
  public totalPrice = this.totalPriceSubject.asObservable().distinctUntilChanged();

  constructor() {
    this.initialize();
  }

  private initialize(){
    let cart = this.getToken();
    let quantityTemp = 0;
    let totalPriceTemp = 0;
    if(cart != undefined || cart != null) {
      cart = JSON.parse(cart);
      for(let c of cart){
        quantityTemp += c.quantity;
        totalPriceTemp += c.quantity * c.price;
      }
      this.quantitySubject.next(quantityTemp);
      this.totalPriceSubject.next(totalPriceTemp);
    }
  }

  getToken(): any {
    return window.localStorage['cart'];
  }

  saveToken(cart: any) {
    window.localStorage['cart'] = JSON.stringify(cart);
  }

  destroyToken() {
    window.localStorage.removeItem('cart');
  }

  addCart(product: any, quantity: number){
    let quantityTemp = (Number(this.quantitySubject.getValue())) + (Number(quantity));
    this.quantitySubject.next(quantityTemp);
    let totalPriceTemp = this.totalPriceSubject.getValue() + quantity * Math.round(product.price * 0.8 );
    this.totalPriceSubject.next(totalPriceTemp);
    let cart = this.getToken();
    let image = '';
    product.images.length > 0 ? image = product.images[0].url : '';
    if(cart === undefined || cart === null){
      cart = new Array<any>();
      let image = '';
      cart.push(new Cart(
        product.slug, Math.round(product.price * 0.8 ), product.name, image, quantity
        ));
    } else {
      cart = JSON.parse(cart);
      let index = cart.findIndex(x => x.slug == product.slug);
      if(index === -1){
        cart.push(new Cart(
          product.slug, Math.round(product.price * 0.8 ), product.name, image, quantity
          ));
      } else {
        cart[index].quantity += quantity;
      }
    }
    this.saveToken(cart);
  }

}
