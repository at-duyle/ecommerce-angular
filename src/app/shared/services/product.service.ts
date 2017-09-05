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
    return this.apiService.get('/categories/'+ categorical.slug + '/products_category?type=' + categorical.type)
    .map(data => data.products);
  }

  getBestSeller(): Observable<Array<Product>>{
    return this.apiService.get('/products_best_seller')
    .map(data => data.products);
  }

  getNewProduct(): Observable<Array<Product>>{
    return this.apiService.get('/products_newest')
    .map(data => data.products);
  }

  getProductDetail(slug: any): Observable<any>{
    return this.apiService.get('/products/' + slug.slug)
    .map(data => data.product);
  }

  searchKeyword(keyword: string): Observable<Array<Product>>{
    return this.apiService.get('/search?q=' + keyword)
    .map(data => data.products);
  }

  getProductByShop(slug: any): Observable<Array<Product>>{
    return this.apiService.get('/shops/'+ slug + '/products_shop')
    .map(data => data.products);
  }
}
