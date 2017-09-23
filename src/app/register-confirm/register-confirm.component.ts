import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from '../shared/services';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit, OnDestroy {

  confirmToken: any;
  userId: any;
  message: string;
  subscription: Subscription;
  newTokenSub: Subscription;

  constructor(
    private notify: NotificationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        window.scrollTo(0, 0);
        this.confirmToken = params.confirmToken;
        this.userId = params.userId;
        this.userService.registerConfirm(this.userId, this.confirmToken).subscribe(
          (data: any) => {
            this.message = data.message;
          },
          (err: any) => {
            console.log(err.errors);
          }
        );
      }
    );
  }

  newToken() {
    this.newTokenSub = this.userService.updateNewConfirmToken(this.userId).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
    this.router.navigateByUrl('/register/confirm');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
