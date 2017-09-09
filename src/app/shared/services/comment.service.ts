import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../services';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

  constructor(
    private apiService: ApiService,
    private http: Http) { }

  getCommentsOfProduct(product_id): Observable<Array<Comment>>{
    return this.apiService.get('/products/'+ product_id +'/comments')
           .map(data => data.comments);
  }
}
