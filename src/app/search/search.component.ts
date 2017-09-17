import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from '../shared/services';
import { ProductService } from '../shared/services';
import { Product } from '../shared/models/product';
import { CartService } from '../shared';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  products: Array<Product>;
  product: Product;
  subscription: Subscription;
  subscriptionCheckQuantity: Subscription;
  queryParam: string;
  error: string;
  message: string;
  productServiceSubscription: Subscription;

  constructor( private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private notify: NotificationService,
    private cartService: CartService
    ) { 
    this.products = [];
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      params => {
        this.queryParam = params['q'];
        this.productServiceSubscription = this.productService.searchKeyword(this.queryParam).subscribe(
          (data: any) => {
            if(data != undefined){
              this.products = data;
              this.error = '';
              this.message = this.products.length + ' results found for \'' + this.queryParam + '\'';
            } else {
              this.products = undefined;
              this.error = 'No results found for \'' + this.queryParam + '\'';
            }
            
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
            this.error = err.errors;
          });
      }
      );
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
      this.subscription.unsubscribe();
    }
    if(this.productServiceSubscription != undefined){
      this.productServiceSubscription.unsubscribe();
    }
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
