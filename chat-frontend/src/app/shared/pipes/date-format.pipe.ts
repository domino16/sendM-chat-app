import { Pipe, PipeTransform } from '@angular/core';
import { format, formatRelative } from 'date-fns';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date): unknown {
    const currentDate = new Date()
    const yourDate: Date = new Date(new Date(date) + ' UTC');

    // 864000000 is one day in miliseconds # 604800000 one week in milliseconds
    if(currentDate.getTime() - yourDate.getTime() >  604800000){
      return formatRelative(yourDate, new Date())
    }else if(currentDate.getTime() - yourDate.getTime() > 86400000){
       return format(yourDate, "iiii HH:mm")
    }
    return format(yourDate, 'HH:mm')
    
  }

}
