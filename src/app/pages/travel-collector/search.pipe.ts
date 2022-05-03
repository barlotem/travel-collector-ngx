import { Pipe, PipeTransform } from '@angular/core';
import { Travel } from '../../@core/models/Travel';
@Pipe({
  name: 'travelFilter',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: string, filteredCount: any): any {
    if (!value) {
      return null;
    }
    if (!args) {
      filteredCount.count = value.length;
      return value;
    }
    args = args.toLocaleLowerCase();

    let filteredItems = value.filter(function(item) {
        return JSON.stringify(item).toLocaleLowerCase().includes(args);
    });
    filteredCount.count = filteredItems.length;
    return filteredItems;
  }
    // return value.filter((val: Travel) => {
    //   let rVal = (val.country.toLocaleLowerCase().includes(args)) || 
    //   (val.group.toLocaleLowerCase().includes(args)) || 
    //   (val.track.toLocaleLowerCase().includes(args)) || 
    //   (val.keyWords.toLocaleLowerCase().includes(args)) || 
    //   (val.guide.toLocaleLowerCase().includes(args)) || 
    //   (val.date.toLocaleString('he-IL').toLocaleLowerCase().includes(args)) || 
    //   (val.albumId.toString().includes(args));
    //   return rVal;
    // })
}