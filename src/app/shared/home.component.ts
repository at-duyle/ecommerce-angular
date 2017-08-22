import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, AfterViewInit {

  message: any;
  subscription: Subscription;

  constructor (
    private route: ActivatedRoute,
    ) {
    // this.message = '';
    // this.subscription = route.queryParams.subscribe(
    //   (queryParam: any) => {
    //     this.message = queryParam['message'];
    //   }
    //   );
  }

  ngOnInit() {
    // this.message = this.route.queryParams['message'];
  }

  ngAfterViewInit(){
  }

}
