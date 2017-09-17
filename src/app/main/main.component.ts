import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  hiddenSlider: boolean;
  hiddenBanner: boolean; 
  private subcription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: any
    ) { 
    this.hiddenSlider = false;
    this.hiddenBanner = true;
  }

  ngOnInit() {
    let path = this.document.location.href;
    path = path.replace('http://localhost:4200','');
    if (path === '/' || path === '/home') { 
      this.hiddenSlider = false;
      this.hiddenBanner = true;
    } else {
      if(path.indexOf('categories') >= 0 || path.indexOf('search') >= 0){
        this.hiddenBanner = false;
      } else {
        this.hiddenBanner = true;
      }
      this.hiddenSlider = true;
    }
    this.subcription = this.router.events.filter(event => event instanceof NavigationEnd)
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

  ngOnDestroy(){
    if(this.subcription != undefined){
      this.subcription.unsubscribe();
    }
  }

}
