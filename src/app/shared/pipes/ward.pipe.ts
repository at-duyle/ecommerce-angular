import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ward'
})
export class WardPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let valueWard = '';
    value.WardId !== '' ? valueWard = value.WardId + '-' + value.WardName : valueWard;
    return valueWard;
  }

}
