import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/services'
import { NgForm } from '@angular/forms';

import { Error } from '../shared/models/error';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  controlConfirmPassword: any;
  controlEmail: any;
  errors: Error;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private userService: UserService,
    private router: Router,

    ) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmation_password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.controlConfirmPassword = 
    this.registerForm.controls.confirmation_password.valueChanges.subscribe(
      (val: any) => {
        if(val != null){
          let password = this.registerForm.controls.password.value;
          this.registerForm.controls.password.setErrors({'Error': true});
          if(password == null || password == ''){
            this.registerForm.controls.confirmation_password.reset();
          } else{
            this.registerForm.controls.password.setErrors(null);
            if(val !== password){
              this.registerForm.controls.confirmation_password.setErrors({'Error': true});
            } else {
              this.registerForm.controls.confirmation_password.setErrors(null);
            }
          }
        }
      });
    this.controlEmail =
    this.registerForm.controls.email.valueChanges.subscribe(
      (val: any) => {
        let pattern = new RegExp(/\w+@\w+\.{1}[a-zA-Z]{2,}/);
        if(!pattern.test(val)){
          this.registerForm.controls.email.setErrors({'Error': true});
        } else {
          this.registerForm.controls.email.setErrors(null);
        }
      });
  }

  register(){
    let credentials = this.registerForm.value;
    this.userService
    .register(credentials)
    .subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      (err: any) => {
        this.errors = err.errors;
        // // this.router.navigateByUrl(this.router.url);
        // console.log(this.errors);
        for (let error of err.errors) {
          this.notify.printErrorMessage(error);
        }
      }
      );
  }

}
