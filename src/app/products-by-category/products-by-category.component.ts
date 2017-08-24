import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notify: NotificationService
    ) { 
    this.products = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService.getProductByCategory(params).subscribe(
        (data: any) => {
          this.products = data;
        }, (err: any) => {
          for (let error of err) {
            this.notify.printErrorMessage(error);
          }
        })
    });
  }

  ngAfterViewInit(){
    $(document).ready(function() {
      $(".fancybox-fast-view").fancybox();
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
      $("#product-quantity").TouchSpin({
        verticalbuttons: true
      });
      $("input[name='demo_vertical']").TouchSpin({
        verticalbuttons: true
      });
    });
  }

  view = (product: Product) => {
    this.product = product;
  }
}
