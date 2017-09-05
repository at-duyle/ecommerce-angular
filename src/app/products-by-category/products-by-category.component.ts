import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../shared/services';
import { NotificationService } from '../shared/services';
import { Product } from '../shared/models/product';
import { CartService } from '../shared';

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
  orders: Array<any>;
  selectedOrder: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notify: NotificationService,
    private router: Router,
    private cartService: CartService
    ) { 
    this.products = [];
    this.orders = ['Default', 'Price (Low -> High)', 'Price (High -> Low)'];
    this.selectedOrder = this.orders[0];
  }

  ngOnInit() {
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
            $(".fancybox-fast-view").fancybox({
              href: '#product-pop-up',
              'beforeLoad': function() {
                $(".product-main-image img:nth-child(2)").remove();
              } 
            });
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
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }

  addCart(product: any, quantity: number){
    quantity === 0 ? quantity = $('#product-quantity').val() : quantity;
    if(quantity <= product.quantity){
      this.cartService.addCart(product, (Number(quantity)));
    } else {
      this.notify.printWarningMessage( product.name + ' are out of stock!');
    }
    $('#product-quantity').val(1);
  }

  view = (product: Product) => {
    this.product = product;
    $(document).ready(function() {
      $(".product-quantity .form-control").TouchSpin({
        verticalbuttons: true
      });
      $('.product-main-image').zoom({url: $('.product-main-image img')
        .attr('data-BigImgSrc')});
    });
  }

  detail = (slug: any) => {
    this.router.navigateByUrl('/home/product/' + slug);
  }
}
