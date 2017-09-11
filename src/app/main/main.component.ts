import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  hiddenSlider: boolean;
  hiddenBanner: boolean; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) { 
    this.hiddenSlider = false;
    this.hiddenBanner = true;
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
                      .subscribe((url:any) => {
                        if (url.urlAfterRedirects === '/' || url.urlAfterRedirects === '/home') { 
                          this.hiddenSlider = false;
                          this.hiddenBanner = true;
                        } else {
                          if(url.urlAfterRedirects.indexOf('categories') >= 0 
                            || url.urlAfterRedirects.indexOf('search') >= 0){
                            this.hiddenBanner = false;
                          } else {
                            this.hiddenBanner = true;
                          }
                          this.hiddenSlider = true;
                        }
    });
  }

}
