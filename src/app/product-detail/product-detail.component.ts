import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from '../shared/services';
import { NotificationService } from '../shared/services';
import { Product } from '../shared/models/product';
import { CartService } from '../shared';
import { CommentService } from '../shared/services';

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
  productId: string;
  subComments: Subscription;
  comments: Array<any>;
  totalReview: number;
  reviewForm: any;
  subReview: Subscription;
  newComment: any;
  subCheckPermission: Subscription;
  permission: boolean;
  productServiceSubscription: Subscription;
  length: any;
  public isRequesting: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notify: NotificationService,
    private cartService: CartService,
    private commentService: CommentService,
    private formBuilder: FormBuilder
    ) {
    this.reviewForm = this.formBuilder.group({
      content: new FormControl('', [Validators.required])
    });
    this.refresh();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.productServiceSubscription = this.productService.getProductDetail(params).subscribe(
        (data: any) => {
          this.product = data;
          this.fetchData();
          this.checkPermission();
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

  fetchData() {
    this.subComments = this.commentService.getCommentsOfProduct(this.product.id).subscribe(
      (data: any) => {
        this.comments = data;
        this.length = this.comments.length / 5;
        this.totalReview = this.comments.length;
      }
      );
  }

  checkPermission() {
    this.subCheckPermission = this.productService.checkPermissionReview(this.product.slug).subscribe(
      (data: any) => {
        this.permission = data;
      }, (err: any) => {
        console.log(err);
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

  addReview(){
    let content = this.reviewForm.value;
    this.subReview = this.productService.addReview(this.product.slug, content).subscribe(
      (data: any) => {
        this.newComment = data.comment;
        this.fetchData();
        this.reviewForm.controls.content.patchValue('');
      }
      );
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
    if(this.subComments != undefined){
      this.subComments.unsubscribe();
    }
    if(this.subReview != undefined){
      this.subReview.unsubscribe();
    }
    if(this.subCheckPermission != undefined){
      this.subCheckPermission.unsubscribe();
    }
    if(this.productServiceSubscription != undefined){
      this.productServiceSubscription.unsubscribe();
    }
  }

}
