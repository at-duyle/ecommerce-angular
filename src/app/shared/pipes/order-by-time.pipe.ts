import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByTime'
})
export class OrderByTimePipe implements PipeTransform {

  transform(orders: any, args?: any): any {
    orders.sort((a: any, b: any) => {
      if(a.created_at < b.created_at){
        return -1 * args.direction;
      }
      else if( a.created_at > b.created_at){
        return 1 * args.direction;
      }
      else{
          return 0;
      }
    });
    return orders;
  }

}
