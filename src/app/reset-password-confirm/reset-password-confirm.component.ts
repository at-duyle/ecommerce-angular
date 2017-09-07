import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/services';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent implements OnInit, OnDestroy {

  resetToken: any;
  resetForm: any;
  emailForm: any;
  controlConfirmPassword: any;
  controlEmail: any;
  subcription: Subscription;
  resetPassSub: Subscription;
  message: string;
  success: string;

  constructor( private formBuilder: FormBuilder,
    private notify: NotificationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    this.resetForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    });

    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.resetPassSub = this.route.params.subscribe(
      (params: any) => {
        this.resetToken = params.resetToken;
      }
    );

    this.controlConfirmPassword = 
    this.resetForm.controls.password_confirmation.valueChanges.subscribe(
      (val: any) => {
        if(val != null){
          let password = this.resetForm.controls.password.value;
          this.resetForm.controls.password.setErrors({'Error': true});
          if(password == null || password == ''){
            this.resetForm.controls.password_confirmation.reset();
          } else{
            this.resetForm.controls.password.setErrors(null);
            if(val !== password){
              this.resetForm.controls.password_confirmation.setErrors({'Error': true});
            } else {
              this.resetForm.controls.password_confirmation.setErrors(null);
            }
          }
        }
    });

    this.controlEmail =
    this.emailForm.controls.email.valueChanges.subscribe(
      (val: any) => {
        let pattern = new RegExp(/\w+@\w+\.{1}[a-zA-Z]{2,}/);
        if(!pattern.test(val)){
          this.emailForm.controls.email.setErrors({'Error': true});
        } else {
          this.emailForm.controls.email.setErrors(null);
        }
      });
  }

  sendRequest() {
    let email = this.emailForm.value
    this.subcription = this.userService.sendEmailResetPassword(email).subscribe(
      (data: any) => {
        this.message = data.message;
      },
      (err: any) => {
        this.notify.printErrorMessage(err.errors);
      }
    );
  }

  reset() {
    let password = this.resetForm.value.password;
    let passwordConfirmation = this.resetForm.value.password_confirmation;
    this.userService.resetPassword(this.resetToken, password, passwordConfirmation).subscribe(
      (data: any) => {
        this.success = data.message;
        this.notify.printSuccessMessage(data.message);
      },
      (err: any) => {
        this.notify.printErrorMessage(err.errors);
      }
    );
  }

  ngOnDestroy() {
    if(this.subcription != undefined){
      this.subcription.unsubscribe();
    }
    if(this.resetPassSub != undefined){
      this.resetPassSub.unsubscribe();
    }
    if(this.controlConfirmPassword != undefined){
      this.controlConfirmPassword.unsubscribe();
    }
    if(this.controlEmail != undefined){
      this.controlEmail.unsubscribe();
    }
  }

}
