import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Category } from '../models';

@Injectable()
export class CategoryService {

  constructor(
    private apiService: ApiService,
    private http: Http
  ) { }

  getAll(): Observable<Array<Category>>{
    return this.apiService.get('/categories')
           .map(data => data.categories);
  }
}
