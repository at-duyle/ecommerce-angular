import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { OnChanges } from '@angular/core';

@Directive({
  selector: '[appRouterLink]'
})
export class RouterLinkDirective implements OnChanges {

  @Input() appRouterLink: any;
  constructor(
    private el: ElementRef,
    private renderer: Renderer
    ) { }

  ngOnChanges(){
    let parent = this.el.nativeElement.parentNode;
    let subCate = this.appRouterLink.sub_categories;
    let parentInner :string;
    console.log(parent);
    if(subCate.length > 0){
      parentInner = '<a>'
      + this.appRouterLink.name
      + '<i class="icons icon-right-dir"></i>'
      + '</a>'
      + '<ul class="sidebar-dropdown">'
      + '<li>'
      + '<ul>'
      + '<li><a href="#">{{sub.name}}</a></li>'
      + '</ul>'
      + '</li>'
      + '</ul>';
      parent.innerHTML = parentInner;
    } else {
      console.log(this.appRouterLink.name);
      parentInner = '<a ' 
      + '[routerLink]="[\'/home\','
      + '{outlets:'
      + '{main: [\'categories\', \'' + this.appRouterLink.id + '\', \'Category\', \'products\']}}]">'
      + String(this.appRouterLink.name)
      + '<i class="icons icon-right-dir"></i>'
      + '</a>';
      parent.innerHTML = parentInner;
      console.log(parent.innerHTML);
    }
  }
}
