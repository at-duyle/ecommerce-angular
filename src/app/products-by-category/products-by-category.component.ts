import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../shared/services';
import { NotificationService } from '../shared/services';
import { Product } from '../shared/models/product';

declare var $: any;

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent implements OnInit {
  products: Array<Product>;
  product: Product;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notify: NotificationService
    ) { 
    this.products = [];
  }

  ngOnInit() {
    $("#product-quantity").TouchSpin({
      verticalbuttons: true
    });
    this.subscription = this.route.params.subscribe(params => {
      this.productService.getProductByCategory(params).subscribe(
        (data: any) => {
          this.products = data;
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
        })
    });
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }

  view = (product: Product) => {
    this.product = product;
    $(document).ready(function() {
      $(".fancybox-fast-view").fancybox({
        href: '#product-pop-up'
      });
    });
  }
}
