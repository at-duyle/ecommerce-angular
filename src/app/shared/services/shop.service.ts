import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../services';
import { Shop } from '../models/shop';

@Injectable()
export class ShopService {

  constructor(
    private apiService: ApiService,
    private http: Http
    ) { }

  getShops(): Observable<Array<Shop>>{
    return this.apiService.get('/shops')
    .map(data => data.shops);
  }

  getDetailShop(slug: any): Observable<Shop>{
    return this.apiService.get('/shops/' + slug)
    .map(data => data.shop);
  }

}
