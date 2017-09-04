import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../shared/services';
import { Product } from '../shared/models/product';

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
  queryParam: string;
  error: string;
  message: string;

  constructor( private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,) { 
    this.products = [];
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      params => {
        this.queryParam = params['q'];
        this.productService.searchKeyword(this.queryParam).subscribe(
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
                href: '#product-pop-up'
              });
            });
          }, (err: any) => {
              this.error = err.errors;
          });
      }
    );
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
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
