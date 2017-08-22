import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';

import { UserService } from '../services';

@Injectable()
export class NoAuthGuardService {

  constructor(
    private router: Router,
    private userService: UserService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {

    return this.userService.isAuthenticated.take(1).map(bool => {
      if(bool == true){
        this.router.navigate(['home'], { queryParams: { message:'You are logged in!'}});
      }
      return !bool;
    });

  }
}
