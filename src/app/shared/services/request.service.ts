import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class RequestService {

  constructor(
    private apiService: ApiService,
    private http: Http
    ) { }

  sendRequest(request): Observable<any> {
    return this.apiService.post('/requests', {request: request})
    .map(
      data => {
        return data;
      }
      );
  }

}
