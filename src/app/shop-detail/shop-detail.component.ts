import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from '../shared/services';

import { Shop } from '../shared/models/shop';
import { Product } from '../shared/models/product';
import { ShopService, ProductService } from '../shared/services';

declare var $: any;

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit, OnDestroy {
  shop: Shop;
  products: Array<Product>;
  product: Product;
  subscription: Subscription;
  public isRequesting: boolean;

  constructor( private shopService: ShopService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService) {
    this.refresh();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.shopService.getDetailShop(params.slug).subscribe(
        (data: any) => {
          window.scrollTo(0, 0);
          this.shop = data;
        }
        );
      this.productService.getProductByShop(params.slug).subscribe(
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
          this.stopRefreshing();
        }, () => {
          this.stopRefreshing();
        }
        );
    });
  }

  public refresh(): void {
    this.isRequesting = true;
  }

  private stopRefreshing() {
    this.isRequesting = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
