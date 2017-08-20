import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    // var bgCounter = 0,
    // backgrounds = [
    // "../../assets/corporate/img/backgrounds/1.jpg",
    // "../../assets/corporate/img/backgrounds/2.jpg",
    // "../../assets/corporate/img/backgrounds/3.jpg"
    // ];
    // function changeBackground()
    // {
    //   bgCounter = (bgCounter+1) % backgrounds.length;
    //   $('body').css('background', '#000 url('+backgrounds[bgCounter]+') no-repeat');
    //   setTimeout(changeBackground, 10000);

    // }
    // changeBackground();
  }

}
