import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value:Brand[], filter:string): Brand[] {
    filter = filter?filter.toLocaleLowerCase():""
    return filter?value
    .filter((p:Brand)=>p.brandName.toLocaleLowerCase().indexOf(filter)!==-1)
    :value;
  }

}
