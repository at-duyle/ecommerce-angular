import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';

@Injectable()
export class MerchantApiService {

  constructor(
    private apiService: ApiService,
    private http: Http
    ) { }

  getCity(): Observable<any> {
    return this.http.get('http://prod.boxme.vn/api/public/api/merchant/rest/lading/city')
    .map(res=> res.json());
  }

  getDistrict(cityId: any): Observable<any> {
    return this.http.get('http://prod.boxme.vn/api/public/api/merchant/rest/lading/province/' + cityId)
    .map(res=> res.json());
  }

  getWard(districtId: any): Observable<any> {
    return this.http.get('http://prod.boxme.vn/api/public/api/merchant/rest/lading/ward/' + districtId)
    .map(res=> res.json());
  }

}
