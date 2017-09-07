import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../shared/services';
import { NotificationService } from '../shared/services';
import { Product } from '../shared/models/product';
import { CartService } from '../shared';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: any;
  subscription: Subscription;
  subscriptionCheckQuantity: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notify: NotificationService,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.productService.getProductDetail(params).subscribe(
        (data: any) => {
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

  addCart(product: any, quantity: number){
    let quantityTemp = 0;
    quantity === 0 ? quantity = $('#product-quantity').val() : quantity;
    quantityTemp = (Number(quantity));
    let productTemp = this.cartService.searchProduct(product);
    productTemp !== undefined ? quantity = (Number(productTemp.quantity)) + (Number(quantity)) : (Number(quantity));
    this.subscriptionCheckQuantity = this.cartService.checkQuantity(product.slug, quantity).subscribe(
      (data: any) => {
        if(data.message === 'Available'){
          this.cartService.addCart(product, quantityTemp);
        } else {
          if(data.quantity === 0){
            this.cartService.deleteCart(product);
            this.notify.printErrorMessage('"<strong>' + product.name + '</strong>"' + ' is out of stock!');
          } else {
            this.notify.printErrorMessage('"<strong>' + product.name 
              + '</strong>"' + ' has only '+ '<strong>' +data.quantity + '</strong>' + ' product(s)!');
          }
        }
      });
    $('#product-quantity').val(1);
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
    if(this.subscriptionCheckQuantity != undefined){
      this.subscriptionCheckQuantity.unsubscribe();
    }
  }

}
