import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NewsHeaderService{

  info = new Subject();


  change(title: string, subTitle: string, imgPath: string){
   this.info.next({title: title, subTitle: subTitle, imgPath: imgPath})
  }


}
