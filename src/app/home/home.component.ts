import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { environment } from '../../environments/environment';
import { NotificationService } from '../shared/services';
import { ProductService } from '../shared';
import { Product } from '../shared/models';
import { CartService } from '../shared';

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
  subscriptionCheckQuantity: Subscription;
  bestSeller: Array<Product>;
  newProduct: Array<Product>;
  product: Product;
  hiddenSlider: boolean;
  previousUrl:string;

  constructor (
    private route: ActivatedRoute,
    private notify: NotificationService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
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
      }, (err: any) => {
        if(Array.isArray(err)){
          for (let error of err) {
            this.notify.printErrorMessage(error);
          }
        } else {
          this.notify.printErrorMessage(err.errors);
        }
      }
      );

    this.subscriptionNewProduct = this.productService.getNewProduct().subscribe(
      (data: any) => {
        this.newProduct = data;
        $(document).ready(function() {
          $(".fancybox-fast-view").fancybox({
            href: '#product-pop-up',
            'beforeLoad': function() {
              $(".product-main-image img:nth-child(2)").remove();
            } 
          });
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
          this.notify.printErrorMessage(err.errors);
        }
      }
      );
  }

  view = (product: Product) => {
    this.product = product;
    $(document).ready(function() {
      $(".product-quantity .form-control").TouchSpin({
        verticalbuttons: true,
      });
      $('.product-main-image').zoom({url: $('.product-main-image img')
        .attr('data-BigImgSrc')});
    });
  }

  detail = (slug: any) => {
    this.router.navigateByUrl('');
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
    if(this.subscriptionBestSeller != undefined){
      this.subscriptionBestSeller.unsubscribe();
    }
    if(this.subscriptionNewProduct != undefined){
      this.subscriptionNewProduct.unsubscribe();
    }
  }

}
