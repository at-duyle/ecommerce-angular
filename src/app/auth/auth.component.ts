import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as $ from 'jquery';

import { Error } from '../shared/models/error';
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
    private router: Router
    ) {
    this.errors = new Error();
  }

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
        this.errors = err.errors;
        console.log(err);
      }
      );
  }

  ngOnDestroy(){
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }
}
