import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SlimScroll } from 'angular-io-slimscroll';
import * as $ from 'jquery';

import { User } from '../../models';
import { UserService } from '../../services'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  currentUser: User;

  constructor(
    private userService: UserService
    ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
      )
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
    })  
  }

}
