import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProduct'
})
export class ImageProductPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let url = '';
    value === null || value === '' || value === undefined ? 
    url = 'https://www.shearwater.com/wp-content/plugins/lightbox/images/No-image-found.jpg'
         : url = value.url;
    return url;
  }

}
