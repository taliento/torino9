import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NewsHeaderService {

  info = new Subject();

  reset () {
    this.change('Novità', 'Tutte le nostre novità..', '..e altro ancora');
  }

  change(title: string, subTitle: string, cit: string) {
   this.info.next({title: title, subTitle: subTitle, cit: cit});
  }

}
