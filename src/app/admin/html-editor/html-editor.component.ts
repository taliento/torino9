import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent {

  editView = false;
  textValue: string = null;

  @Output() textChange = new EventEmitter();

  @Input()
  get text() {
    return this.textValue;
  }
  set text(val) {
    this.textValue = val;
    this.textChange.emit(this.textValue);
  }
}
