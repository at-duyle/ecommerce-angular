import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageCart'
})
export class ImageCartPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let url = '';
    value === null || value === '' || value === undefined ? 
    url = 'https://www.shearwater.com/wp-content/plugins/lightbox/images/No-image-found.jpg'
         : url = 'http://res.cloudinary.com/drgmu20kr/' + value;
    return url;
  }

}
