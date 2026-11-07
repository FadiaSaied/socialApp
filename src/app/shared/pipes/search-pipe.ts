import { Follower } from './../../features/timeline/components/posts/models/follower.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(arr: Follower[], text: string): Follower[] {
    return arr.filter((follower) =>
      follower.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    );
  }
}
