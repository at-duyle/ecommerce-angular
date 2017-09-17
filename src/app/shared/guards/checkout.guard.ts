import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../shared';
import { Subscription } from 'rxjs';
@Injectable()
export class CheckoutGuard implements CanActivate {
  cartServiceSubscription: Subscription;
  constructor(
    private cartService: CartService,
    private router: Router
    ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let status = true;
    this.cartServiceSubscription = this.cartService.quantity.subscribe(
      (data: any) => {
        if(data === 0){
          status = false;
          this.router.navigate(['/error-checkout']);
        }
      }
      )
    return status;
  }

  ngOnDestroy(){
    if(this.cartServiceSubscription != undefined){
      this.cartServiceSubscription.unsubscribe();
    }
  }
}
