import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../services';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  constructor(
    private apiService: ApiService,
    private http: Http
  ) { }

  getOrdersOfUser(): Observable<Array<Order>>{
    return this.apiService.get('/users/1/delivery_orders')
           .map(data => data.delivery_orders);
  }
}
