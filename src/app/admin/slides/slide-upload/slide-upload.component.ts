import {Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DTCarousel } from '../../../models/dt-carousel.model';

@Component({
  selector: 'slide-upload',
  templateUrl: './slide-upload.component.html'
})
export class SlideUploadComponent {
  form: FormGroup;
  loading: boolean = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() slide: DTCarousel;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    if(this.slide)  {
      this.form = fb.group({
        title: [this.slide.title, Validators.required],
        text: this.slide.text,
        position: this.slide.position,
        btnText: this.slide.btnText,
        btnHref: this.slide.btnHref,
        imgFile: this.slide.imgPath
      });
    } else {
      this.form = fb.group({
        title: ['', Validators.required],
        text: null,
        position: null,
        btnText: null,
        btnHref: null,
        imgFile: null
      });
    }


  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('imgFile').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('title', this.form.get('title').value);
    input.append('text', this.form.get('text').value);
    input.append('position', this.form.get('position').value);
    input.append('btnText', this.form.get('btnText').value);
    input.append('btnHref', this.form.get('btnHref').value);
    input.append('imgFile', this.form.get('imgFile').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.setLoading(true);
    this.formSubmit.emit(formModel);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  clearFile() {
    this.form.get('imgFile').setValue(null);
    this.imgInput.nativeElement.value = '';
  }
}
