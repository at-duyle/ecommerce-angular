import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Error } from '../shared/models/error';
import { User } from '../shared/models';
import { UserService } from '../shared/services';
import { NotificationService } from '../shared/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentUser: User;
  profileForm: any;
  controlEmail: any;
  controlFullname: any;
  errors: Error;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private router: Router) {

    this.profileForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.maxLength(50)]),
      gender: new FormControl(),
      avatar: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.maxLength(200)]),
      description: new FormControl()
    })
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.profileForm.patchValue(userData);
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
        let pattern = new RegExp(/^[a-zA-Z ]{1,30}$/);
        if(!pattern.test(valid)){
          this.profileForm.controls.name.setErrors({'Error': true});
        } else {
          this.profileForm.controls.name.setErrors(null);
        }
      });
  }

  updateProfile(user){
    this.subscription = this.userService.update(user).subscribe(
      data => {
        this.router.navigateByUrl('/profile');
        this.profileForm.patchValue(data); 
      },
      err => {
        if(Array.isArray(err)){
          for (let error of err) {
            this.notify.printErrorMessage(error);
          }
        } else {
          this.notify.printErrorMessage(err.error);
        }
      }
    );
  }

  ngOnDestroy() {
    if(this.controlEmail != undefined){
      this.controlEmail.unsubscribe();
    }
    if(this.controlFullname != undefined){
      this.controlFullname.unsubscribe();
    }
  }
}
