import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';
import { Subscription } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate {
  private authenticatedSubcription: Subscription;
  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ){
    let status = true;
    this.authenticatedSubcription = this.userService.isAuthenticated.subscribe(
      (data: any) => {
        status = data;
      });
    if(!status){
      console.log(state.url);
      if(state.url === '/logout'){
        this.router.navigate(['/error']);
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }
    }
    return status;
  }

  ngOnDestroy(){
    if(this.authenticatedSubcription != undefined){
      this.authenticatedSubcription.unsubscribe();
    }
  }
}
