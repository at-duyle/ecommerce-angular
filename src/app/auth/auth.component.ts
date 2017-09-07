import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/services';
import { Subscription } from 'rxjs';

import * as $ from 'jquery';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {
  errors: Error;
  subscription: Subscription;
  constructor(
    private userService: UserService,
    private router: Router,
    private notify: NotificationService
    ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  login(loginForm: NgForm){
    let credentials = loginForm.value;
    this.subscription = this.userService
    .attemptAuth(credentials)
    .subscribe(
      (data: any) => {
        this.router.navigateByUrl('/')
      },
      (err: any) => {
        this.notify.printErrorMessage(err.errors);
      }
      );
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }
}
