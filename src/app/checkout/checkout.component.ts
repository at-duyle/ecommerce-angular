import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services';
import { MerchantApiService, CartService } from '../shared/services';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from '../shared/services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cities: Array<any>;
  districts: Array<any>;
  wards: Array<any>;
  addressForm: any;
  cityValue: any;
  deliveryAddress: any;
  flag: boolean;
  currentUser: any;
  cart: any;
  userSubcription: Subscription;
  selectSubcription: Subscription;
  citySubcription: Subscription;
  cityApiSubcription: Subscription;
  districtSubcription: Subscription;
  districtApiSubcription: Subscription;
  wardApiSubcription: Subscription;
  cartSubcription: Subscription;
  totalPriceSubcription: Subscription;
  totalPrice:number;
  confirmOrderSubcription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private merchantApiService: MerchantApiService,
    private cartService: CartService,
    private notify: NotificationService
    ) { 
    this.addressForm = this.formBuilder.group({
      select: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('',[Validators.required]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('',[Validators.required]),
      address: new FormControl('', [Validators.required])
    });
    this.cities = [{CityId:'', CityName: '--- Please Select ---'}];
    this.districts = [{ProvinceId:'', ProvinceName: '--- Please Select ---'}];
    this.wards = [{WardId:'', WardName: '--- Please Select ---'}];
    this.flag = false;
  }

  ngOnInit() {
    this.userSubcription = this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
      );
    this.selectSubcription = this.addressForm.controls.select.valueChanges.subscribe(
      (data: any) => {
        this.flag = data;
        if(data === false){
          this.addressForm.controls.name.patchValue('');
          this.addressForm.controls.address.patchValue('');
          this.addressForm.controls.city.patchValue('');
          this.addressForm.controls.district.patchValue('');
          this.addressForm.controls.ward.patchValue('');
        } else {
          this.addressForm.controls.name.patchValue(this.currentUser.name);
          this.addressForm.controls.address.patchValue(this.currentUser.address);
          this.addressForm
          .controls
          .city
          .patchValue(this.currentUser.city);
        }
      }
      );
    this.cityApiSubcription = this.merchantApiService.getCity().subscribe(
      (data: any) => {
        this.cities = this.cities.concat(data.data);
      }
      );
    this.citySubcription = this.addressForm.controls.city.valueChanges.subscribe(
      (val: any) => {
        var cityId = val.split('-', 1)[0];
        if(cityId != ''){
          this.districtApiSubcription = this.merchantApiService.getDistrict(cityId).subscribe(
            (data: any) => {
              this.districts = [{ProvinceId:'', ProvinceName: '--- Please Select ---'}];
              this.districts = this.districts.concat(data.data);
              if(this.flag === true){
                this.addressForm
                .controls
                .district
                .patchValue(this.currentUser.district);
              }
            }
            );
        } else {
          this.districts = [{ProvinceId:'', ProvinceName: '--- Please Select ---'}];
          this.addressForm.controls.district.patchValue('');
        }
      });
    this.districtSubcription = this.addressForm.controls.district.valueChanges.subscribe(
      (val: any) => {
        var districtId = val.split('-', 1)[0];
        if(districtId != ''){
          this.merchantApiService.getWard(districtId).subscribe(
            (data: any) => {
              this.wards = [{WardId:'', WardName: '--- Please Select ---'}];
              this.wards = this.wards.concat(data.data);
              if(this.flag === true){
                this.addressForm
                .controls
                .ward
                .patchValue(this.currentUser.ward);
              }
            }
            );
        } else {
          this.wards = [{WardId:'', WardName: '--- Please Select ---'}];
          this.addressForm.controls.ward.patchValue('');
        }
      });
    this.cartSubcription = this.cartService.cart.subscribe(
      (data: any) => {
        this.cart = data;
      }
      );
    this.totalPriceSubcription = this.cartService.totalPrice.subscribe(
      (data: any) => {
        this.totalPrice = data;
      }
      );
  }

  addAddress(){
    this.deliveryAddress =this.addressForm.value;
  }

  confirmOrder(){
    this.confirmOrderSubcription =this.cartService.createOrder(this.deliveryAddress).subscribe(
      (data: any) => {
        this.router.navigateByUrl('');
        this.notify.printSuccessMessage(data.message);
      },
      (err: any) => {
        if(Array.isArray(err)){
          for (let error of err) {
            this.notify.printErrorMessage(error);
          }
        } else {
          this.notify.printErrorMessage(err.errors);
        }
      }
      )
  }

  ngOnDestroy(){
    if(this.userSubcription != undefined){
      this.userSubcription.unsubscribe();
    }
    if(this.selectSubcription != undefined){
      this.selectSubcription.unsubscribe();
    }
    if(this.citySubcription != undefined){
      this.citySubcription.unsubscribe();
    }
    if(this.cityApiSubcription != undefined){
      this.cityApiSubcription.unsubscribe();
    }
    if(this.districtSubcription != undefined){
      this.districtSubcription.unsubscribe();
    }
    if(this.districtApiSubcription != undefined){
      this.districtApiSubcription.unsubscribe();
    }
    if(this.wardApiSubcription != undefined){
      this.wardApiSubcription.unsubscribe();
    }
    if(this.confirmOrderSubcription != undefined){
      this.confirmOrderSubcription.unsubscribe();
    }
  }
}
