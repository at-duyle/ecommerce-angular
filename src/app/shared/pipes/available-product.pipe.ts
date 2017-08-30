import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availableProduct'
})
export class AvailableProductPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let available = '';
    value > 0 ? available = 'In stock' : available = 'Out of Stock';
    return available;
  }

}
