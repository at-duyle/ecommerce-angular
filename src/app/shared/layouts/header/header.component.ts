import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SlimScroll } from 'angular-io-slimscroll';
import { Subscription } from 'rxjs';

import { User } from '../../models';
import { UserService } from '../../services'

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  currentUser: User;
  subcription: Subscription;

  constructor(
    private userService: UserService
    ) {}

  ngOnInit() {
    this.subcription = this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
      );
  }

  ngAfterViewInit(){
    $(document).ready(function(){
      $('.carousel-showmanymoveone .item').each(function(){
        var itemToClone = $(this);

        for (var i=1;i<4;i++) {
          itemToClone = itemToClone.next();

          // wrap around if at end of item collection
          if (!itemToClone.length) {
            itemToClone = $(this).siblings(':first');
          }

          // grab item, clone, add marker class, add to collection
          itemToClone.children(':first-child').clone()
          .addClass("cloneditem-"+(i))
          .appendTo($(this));
        }
      });
    });
  }

  onClick = (id :any) => {
    if(id === '#myCarousel-prev'){
      $('#myCarousel').carousel('prev');
    } else{
      $('#myCarousel').carousel('next');
    }
  }

  ngOnDestroy(){
    if(this.subcription != undefined){
      this.subcription.unsubscribe();
    }
  }
}
