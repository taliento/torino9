export class Featurette {
  _id: string;
  insertDate: string;
  updateDate: string;
  title: string;
  subTitle: string;
  text: string;
  alt: string;
  imgPath: string;

  constructor(title: string, subTitle: string, text: string) {
    this.title = title;
    this.subTitle = subTitle;
    this.text = text;
  }
}
