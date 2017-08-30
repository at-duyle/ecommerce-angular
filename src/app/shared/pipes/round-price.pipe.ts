import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundPrice'
})
export class RoundPricePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.round(value);
  }

}
