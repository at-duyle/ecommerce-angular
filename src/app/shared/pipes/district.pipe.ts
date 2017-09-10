import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'district'
})
export class DistrictPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let valueDistrict = '';
    value.ProvinceId !== '' ? valueDistrict = value.ProvinceId + '-' + value.ProvinceName : valueDistrict;
    return valueDistrict;
  }

}
