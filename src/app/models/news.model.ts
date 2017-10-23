export class News {
  _id: string;
  insertDate: string;
  updateDate: string;
  title: string;
  subTitle: string;
  text: string;
  author: string;

  constructor(title: string, subTitle: string, text: string) {
    this.title = title;
    this.subTitle = subTitle;
    this.text = text;
  }
}
