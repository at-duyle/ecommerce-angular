import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { environment } from '../../environments/environment';
import { NotificationService } from './services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  subscription: Subscription;
  hiddenSlider: boolean;

  constructor (
    private route: ActivatedRoute,
    private notify: NotificationService,
    private router: Router
    ) {
    console.log(route.url);
    this.subscription = route.queryParams.subscribe(
      (queryParam: any) => {
        if(queryParam['ms'] != undefined){
          let message = environment.errors.find(x => x.code === queryParam['ms']).message;
          if(message != undefined){
            this.notify.printWarningMessage(message);
          }
        }
      }
      );
    // console.log(this.router.url);
    // if (this.router.url === '/' || this.router.url === '/home') { 
    //   this.hiddenSlider = true;
    // } else {
    //   this.hiddenSlider = false;
    // }
  }

  ngOnInit() {
  }

}
