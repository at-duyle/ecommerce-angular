import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { environment } from '../../environments/environment';
import { NotificationService } from '../shared/services';
import { ProductService } from '../shared';
import { Product } from '../shared/models';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  subscription: Subscription;
  subscriptionBestSeller: Subscription;
  subscriptionNewProduct: Subscription;
  bestSeller: Array<Product>;
  newProduct: Array<Product>;
  product: Product;
  hiddenSlider: boolean;

  constructor (
    private route: ActivatedRoute,
    private notify: NotificationService,
    private router: Router,
    private productService: ProductService
    ) {
    this.subscription = route.queryParams.subscribe(
      (queryParam: any) => {
        if(queryParam['ms'] != undefined){
          let message = environment.errors.find(x => x.code === queryParam['ms']).message;
          if(message != undefined){
            this.notify.printWarningMessage(message);
          }
        }
      }
      );
    this.bestSeller = [];
    this.newProduct = [];
  }

  ngOnInit() {
    this.subscriptionBestSeller = this.productService.getBestSeller().subscribe(
      (data: any) => {
        this.bestSeller = data;
        $(document).ready(function() {
          $(".fancybox-button").fancybox({
            groupAttr: 'data-rel',
            prevEffect: 'none',
            nextEffect: 'none',
            closeBtn: true,
            helpers: {
              title: {
                type: 'inside'
              }
            }
          });
        });
      }, (err: any) => {
        if(Array.isArray(err)){
          for (let error of err) {
            this.notify.printErrorMessage(error);
          }
        } else {
          this.notify.printErrorMessage(err.error);
        }
      }
      );
    
  }

  view = (product: Product) => {
    this.product = product;
    $(document).ready(function() {
      $(".fancybox-fast-view").fancybox({
        href: '#product-pop-up'
      });
    });
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }

}
