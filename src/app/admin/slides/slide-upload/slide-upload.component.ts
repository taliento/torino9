import {Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DTCarousel } from '../../../models/dt-carousel.model';

@Component({
  selector: 'app-slide-upload',
  templateUrl: './slide-upload.component.html'
})
export class SlideUploadComponent implements OnInit {
  form: FormGroup;
  loading = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() slide: DTCarousel;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      title: ['', Validators.required],
      text: null,
      position: null,
      btnText: null,
      btnHref: null,
      imgFile: null
    });
  }

  ngOnInit() {
    if (this.slide) {
      this.form.get('title').setValue(this.slide.title);
      this.form.get('text').setValue(this.slide.text);
      this.form.get('position').setValue(this.slide.position);
      this.form.get('btnText').setValue(this.slide.btnText);
      this.form.get('btnHref').setValue(this.slide.btnHref);
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('imgFile').setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
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
