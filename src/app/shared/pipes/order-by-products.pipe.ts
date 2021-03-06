import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByProducts'
})
export class OrderByProductsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args === 'Price (Low -> High)'){
      value.sort((a: any, b: any) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if(args === 'Price (High -> Low)') {
      value.sort((a: any, b: any) => {
        if (a.price < b.price) {
          return 1;
        } else if (a.price > b.price) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return value;
  }

}
