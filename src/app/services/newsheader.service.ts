import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NewsHeaderService {

  info = new Subject();

  reset () {
    this.change("Novità", "Nulla che sia del tutto nuovo è perfetto", "(Marco Tullio Cicerone)");
  }

  change(title: string, subTitle: string, cit:string){
   this.info.next({title: title, subTitle: subTitle, cit: cit})
  }

}
