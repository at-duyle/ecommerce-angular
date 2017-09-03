import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Error } from '../shared/models/error';
import { User } from '../shared/models';
import { Order } from '../shared/models';
import { UserService } from '../shared/services';
import { OrderService } from '../shared/services';
import { NotificationService } from '../shared/services';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentUser: User;
  profileForm: any;
  passwordForm: any;
  controlConfirmPass: any;
  controlEmail: any;
  controlFullname: any;
  errors: Error;
  subscription: Subscription;
  subPass: Subscription;

  orders: Array<Order>;
  products_orders: Array<any>;

  isDesc: boolean = false;
  direction: number;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private router: Router) {

    this.profileForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.maxLength(50)]),
      gender: new FormControl(),
      address: new FormControl('', [Validators.maxLength(200)]),
      description: new FormControl()
    });

    this.passwordForm = this.formBuilder.group({
      old_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.profileForm.patchValue(userData);
      }
      );
    this.orderService.getOrdersOfUser().subscribe(
      (data) => {
        console.log(data);
        this.orders = data;
      }
      );
    this.controlEmail = this.profileForm.controls.email.valueChanges.subscribe(
      (val: any) => {
        let pattern = new RegExp(/\w+@\w+\.{1}[a-zA-Z]{2,}/);
        if(!pattern.test(val)){
          this.profileForm.controls.email.setErrors({'Error': true});
        } else {
          this.profileForm.controls.email.setErrors(null);
        }
      });
    this.controlFullname = this.profileForm.controls.name.valueChanges.subscribe(
      (valid: any) => {
        let pattern = new RegExp(/^[a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/);
        if(!pattern.test(valid)){
          this.profileForm.controls.name.setErrors({'Error': true});
        } else {
          this.profileForm.controls.name.setErrors(null);
        }
      });
    this.controlConfirmPass = this.passwordForm.controls.password_confirmation.valueChanges.subscribe(
      (val: any) => {
        if(val != null){
          let password = this.passwordForm.controls.password.value;
          this.passwordForm.controls.password.setErrors({'Error': true});
          if(password == null || password == ''){
            this.passwordForm.controls.password_confirmation.reset();
          } else{
            this.passwordForm.controls.password.setErrors(null);
            if(val !== password){
              this.passwordForm.controls.password_confirmation.setErrors({'Error': true});
            } else {
              this.passwordForm.controls.password_confirmation.setErrors(null);
            }
          }
        }
      }
      );
  }

  sort(){
    this.isDesc = !this.isDesc; //change the direction    
    this.direction = this.isDesc ? 1 : -1;
};

  getOrderDetail(index){
    this.products_orders = this.orders[index].products_delivery_orders;
  }

  updateProfile(user){
    this.subscription = this.userService.update(user).subscribe(
      data => {
        this.router.navigateByUrl('/profile');
        this.profileForm.patchValue(data);
        this.notify.printSuccessMessage('Updated successful!');
      },
      err => {
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

  updatePassword(passwords){
    this.subPass = this.userService.updatePassword(passwords).subscribe(
      data => {
        this.router.navigateByUrl('/profile');
        this.notify.printSuccessMessage('Updated password successful!');
      },
      err => {
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

  ngOnDestroy() {
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
    if(this.subPass != undefined){
      this.subPass.unsubscribe();
    }
    if(this.controlEmail != undefined){
      this.controlEmail.unsubscribe();
    }
    if(this.controlFullname != undefined){
      this.controlFullname.unsubscribe();
    }
    if(this.controlConfirmPass != undefined){
      this.controlConfirmPass.unsubscribe();
    }
  }
}
