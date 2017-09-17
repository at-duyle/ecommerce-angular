import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Shop } from '../shared/models';
import { ShopService } from '../shared/services';
import { NotificationService } from '../shared/services';

@Component({
  selector: 'app-list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.scss']
})
export class ListShopsComponent implements OnInit {

  subcriptionShop: Subscription;
  shops: Array<Shop>;
  length: any;

  constructor(
    private shopService: ShopService,
    private notify: NotificationService
    ) {
    this.shops = [];
  }

  ngOnInit() {
    this.subcriptionShop = this.shopService.getShops().subscribe(
      (data) => {
        this.shops = data;
        this.shops.splice(0, 1);
        this.length = this.shops.length / 12;
      }, (err: any) => {
        if(Array.isArray(err)){
          for (let error of err) {
            this.notify.printErrorMessage(error);
          }
        } else {
          this.notify.printErrorMessage(err.errors);
        }
      });
  }

  ngOnDestroy(){
    if(this.subcriptionShop != undefined){
      this.subcriptionShop.unsubscribe();
    }
  }
}
