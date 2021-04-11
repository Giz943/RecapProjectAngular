import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Color[], filter:string): Color[] {
    filter = filter?filter.toLocaleLowerCase():""
    return filter?value
    .filter((p:Color)=>p.colorName.toLocaleLowerCase().indexOf(filter)!==-1)
    :value;
  }

}
