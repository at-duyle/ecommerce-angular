import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Error } from '../shared/models/error';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  errors: Error;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.errors = new Error()
  }

  ngOnInit() {
    this.userService
    .purgeAuth()
    .subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigateByUrl('/')
      },
      (err: any) => {
        this.errors = err;
        console.log(this.errors);
      }
      );
  }

}
