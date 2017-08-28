import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  hiddenSlider: boolean;

  constructor() { }

  ngOnInit() {
    // if (this.router.url === '/' || this.router.url === '/home') { 
    //   this.hiddenSlider = true;
    // } else {
    //   this.hiddenSlider = false;
    // }
  }

}
