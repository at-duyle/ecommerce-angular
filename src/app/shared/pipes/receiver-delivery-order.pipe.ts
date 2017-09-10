import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiverDeliveryOrder'
})
export class ReceiverDeliveryOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let name = '';
    value === null ? name = args : name = value;
    return name;
  }

}
