import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city'
})
export class CityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let valueCity = '';
    value.CityId !== '' ? valueCity = value.CityId + '-' + value.CityName : valueCity;
    return valueCity;
  }

}
