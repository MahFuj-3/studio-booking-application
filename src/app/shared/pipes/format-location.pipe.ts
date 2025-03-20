import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLocation',
})
export class FormatLocationPipe implements PipeTransform {
  transform(location: any): string {
    if (!location) return 'N/A'; // Handle null or undefined
    return `${location.Address}, ${location.Area}, ${location.City}`;
  }
}
