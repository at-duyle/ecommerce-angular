import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../services';
import { Product } from '../models/product'

@Injectable()
export class ProductService {

  constructor(
    private apiService: ApiService,
    private http: Http
  ) { }

  getProductByCategory(categorical: any): Observable<Array<Product>>{
    console.log(categorical);
    return this.apiService.post('/categories/products', {categorical})
           .map(data => data.products);
  }

}
