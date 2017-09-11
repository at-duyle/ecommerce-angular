import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { UserService } from './user.service';
import { UserCartService } from './user-cart.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { Cart } from '../models'
import { NotificationService } from './notification.service';

@Injectable()
export class CartService {
  private quantitySubject = new BehaviorSubject<number>(0);
  public quantity = this.quantitySubject.asObservable().distinctUntilChanged();
  private totalPriceSubject = new BehaviorSubject<number>(0);
  public totalPrice = this.totalPriceSubject.asObservable().distinctUntilChanged();
  private cartSubject = new BehaviorSubject<Array<any>>([]);
  public cart = this.cartSubject.asObservable().distinctUntilChanged();
  private statusSubject = new BehaviorSubject<any>(0);
  public status = this.statusSubject.asObservable().distinctUntilChanged();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private userCartService: UserCartService,
    private notify: NotificationService
    ) {
    this.initialize();
  }

  private initialize(){
    let cartTemp = this.getToken();
    let quantityTemp = 0;
    let totalPriceTemp = 0;
    if(cartTemp != undefined || cartTemp != null) {
      cartTemp = JSON.parse(cartTemp);
      for(let c of cartTemp){
        quantityTemp += c.quantity;
        totalPriceTemp += c.quantity * c.price;
      }
      this.quantitySubject.next(quantityTemp);
      this.totalPriceSubject.next(totalPriceTemp);
      this.cartSubject.next(cartTemp);
    }
  }

  getToken(): any {
    return window.localStorage['cart'];
  }

  saveToken(cartTemp: any, status: any) {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticate: any) => {
        window.localStorage['cart'] = JSON.stringify(cartTemp);
        this.cartSubject.next(cartTemp);
        if(isAuthenticate === true){
          this.userCartService.saveCart(JSON.stringify(cartTemp)).subscribe(
            (data) => {
            },
            (err) => {
              console.log(err);
            }
            );
        }
      });
  }

  destroyToken() {
    this.quantitySubject.next(0);
    this.totalPriceSubject.next(0);
    this.cartSubject.next([]);
    window.localStorage.removeItem('cart');
  }

  checkQuantity(slug: any, quantity: any){
    return this.apiService.get('/products/' + slug + '/check_quantity/' + quantity)
    .map(
      data => {
        return data.product;
      });
  }

  searchProduct(product: any){
    let cartTemp = this.getToken();
    if(cartTemp === undefined || cartTemp === null){
      return undefined;
    } else{
      cartTemp = JSON.parse(cartTemp);
      return cartTemp.find(x => x.slug == product.slug);
    }
  }

  addCart(product: any, quantity: number){
    let cartTemp = this.getToken();
    let image = '';
    product.images.length > 0 ? image = product.images[0].url : '';
    if(cartTemp === undefined || cartTemp === null){
      cartTemp = new Array<any>();
      let image = '';
      cartTemp.push(new Cart(
        product.slug, Math.round(product.price * 0.8 ), product.name, image, quantity
        ));
      let quantityTemp = (Number(this.quantitySubject.getValue())) + (Number(quantity));
      this.quantitySubject.next(quantityTemp);
      let totalPriceTemp = this.totalPriceSubject.getValue() + quantity * Math.round(product.price * 0.8 );
      this.totalPriceSubject.next(totalPriceTemp);
    } else {
      cartTemp = JSON.parse(cartTemp);
      let index = cartTemp.findIndex(x => x.slug == product.slug);
      if(index === -1){
        cartTemp.push(new Cart(
          product.slug, Math.round(product.price * 0.8 ), product.name, image, quantity
          ));
        let quantityTemp = (Number(this.quantitySubject.getValue())) + (Number(quantity));
        this.quantitySubject.next(quantityTemp);
        let totalPriceTemp = this.totalPriceSubject.getValue() + quantity * Math.round(product.price * 0.8 );
        this.totalPriceSubject.next(totalPriceTemp);
      } else {
        let quantityTotal = (Number(cartTemp[index].quantity)) + (Number(quantity));
        if(quantityTotal > 10){
          this.notify.printErrorMessage('You can only buy 10 products!');
        } else {
          let quantityTemp = (Number(this.quantitySubject.getValue())) + (Number(quantity));
          this.quantitySubject.next(quantityTemp);
          let totalPriceTemp = this.totalPriceSubject.getValue() + quantity * Math.round(product.price * 0.8 );
          this.totalPriceSubject.next(totalPriceTemp);
          cartTemp[index].quantity = quantityTotal;
        }
      }
    }
    this.saveToken(cartTemp, 'add');
  }

  // updateProductOfCart(product){
    //   let cartTemp = this.getToken();
    //   cartTemp = JSON.parse(cartTemp);
    //   let index = cartTemp.findIndex(x => x.slug == product.slug);
    //   let quantityTemp = (Number(this.quantitySubject.getValue())) - (cartTemp[index].quantity - (Number(product.quantity)));
    //   this.quantitySubject.next(quantityTemp);
    //   let totalPriceTemp = this.totalPriceSubject.getValue() - (cartTemp[index].quantity - (Number(product.quantity))) * (Number(product.price));
    //   this.totalPriceSubject.next(totalPriceTemp);
    //   cartTemp[index].quantity = product.quantity;
    //   this.saveToken(cartTemp, 'update');
    // }

    updateCart(cart: any, status: any){
      let quantityTemp = 0;
      let totalPriceTemp = 0;
      for(let c of cart){
        quantityTemp += c.quantity;
        totalPriceTemp += (c.quantity * c.price);
      }
      this.saveToken(cart, status);
      this.quantitySubject.next(quantityTemp);
      this.totalPriceSubject.next(totalPriceTemp);
      this.cartSubject.next(JSON.parse(this.getToken()));
    }

    deleteCart(product: any){
      let cartTemp = this.getToken();
      if(cartTemp !== undefined){
        cartTemp = JSON.parse(cartTemp);
        let index = cartTemp.findIndex(x => x.slug == product.slug);
        if(index > -1 ){
          let quantityTemp = (Number(this.quantitySubject.getValue())) - (Number(cartTemp[index].quantity));
          this.quantitySubject.next(quantityTemp);
          let totalPriceTemp = this.totalPriceSubject.getValue() - (Number(cartTemp[index].quantity)) * (Number(cartTemp[index].price));
          this.totalPriceSubject.next(totalPriceTemp);
          cartTemp.splice(index, 1);
          this.saveToken(cartTemp, 'delete');
          this.cartSubject.next(JSON.parse(this.getToken()));
        }
      }
    }

    createOrder(deliveryAddress: any){
      return this.apiService.post('/users/1/delivery_orders', {cart: deliveryAddress})
      .map(
        data => {
          this.destroyToken();
          return data;
        }
        );
    }

  }
