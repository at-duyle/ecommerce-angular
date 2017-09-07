import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { CartService } from './cart.service';

@Injectable()
export class UserCartService {

  constructor(
    private apiService: ApiService,
    private http: Http
    ) { }

  saveCart(cartTemp: any){
    return this.apiService.post('/carts', {cart: cartTemp})
    .map(
      data => {
        return data;
      }
      );
  }

}
