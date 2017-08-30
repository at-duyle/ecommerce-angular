import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../shared/services';
import { NotificationService } from '../shared/services';
import { Product } from '../shared/models/product';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notify: NotificationService
    ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.productService.getProductDetail(params).subscribe(
        (data: any) => {
          console.log(data);
          this.product = data;
          $(document).ready(function(){
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
            $(".product-quantity .form-control").TouchSpin({
              verticalbuttons: true
            });
            $('.product-main-image').zoom({url: $('.product-main-image img')
              .attr('data-BigImgSrc')});
          });
        }, (err: any) => {
          if(Array.isArray(err)){
            for (let error of err) {
              this.notify.printErrorMessage(error);
            }
          } else {
            this.notify.printErrorMessage(err.errors);
          }
        })
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
