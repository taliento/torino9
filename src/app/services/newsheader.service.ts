import { Injectable } from '@angular/core';

export interface HeaderInfo {
   title:string;
   subTitle:string;
   imgPath:string;
   image:string;
}

@Injectable()
export class NewsHeaderService {
  info: HeaderInfo = { title : "News", subTitle : "Le ultime news", imgPath : "assets/images/news.jpg", image:null };

  change(title: string, subTitle: string, imgPath: string){
   this.info.title = title;
   this.info.subTitle = subTitle;
   this.info.imgPath = imgPath;
   this.imgStyle();
  }

  reset(){
    this.info.title = "News";
    this.info.subTitle = "Le ultime news";
    this.info.imgPath = "assets/images/news.jpg";
    this.imgStyle();
  }

  imgStyle(){
    if (this.info.imgPath) {
      this.info.image = 'url(' + this.info.imgPath + ')';
    } else {
      this.info.image = null;
    }
  }

}
