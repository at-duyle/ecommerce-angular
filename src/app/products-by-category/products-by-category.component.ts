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
  subscriptionCheckQuantity: Subscription;
  orders: Array<any>;
  selectedOrder: any;
  productServiceSubsription: Subscription;
  length: any;
  public isRequesting: boolean;

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
    this.refresh();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.productServiceSubsription = this.productService.getProductByCategory(params).subscribe(
        (data: any) => {
          window.scrollTo(0, 0);
          this.products = data;
          this.length = this.products.length / 12;
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
          this.stopRefreshing();
          if(Array.isArray(err)){
            for (let error of err) {
              this.notify.printErrorMessage(error);
            }
          } else {
            this.notify.printErrorMessage(err.errors);
          }
        }, () => {
          this.stopRefreshing();
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

  public refresh(): void {
    this.isRequesting = true;
  }

  private stopRefreshing() {
    this.isRequesting = false;
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
    if(this.subscriptionCheckQuantity != undefined){
      this.subscriptionCheckQuantity.unsubscribe();
    }
    if(this.productServiceSubsription != undefined){
      this.productServiceSubsription.unsubscribe();
    }
  }
}
