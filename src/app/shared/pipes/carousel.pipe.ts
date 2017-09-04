import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carousel'
})
export class CarouselPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let style: string;
    value === 0 ? style = 'item active' : style = 'item';
    return style;
  }

}
