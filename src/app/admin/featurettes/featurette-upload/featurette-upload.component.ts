import {Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Featurette } from '../../../models';

@Component({
  selector: 'featurette-upload',
  templateUrl: './featurette-upload.component.html'
})
export class FeaturetteUploadComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() featurette: Featurette;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      title: ['', Validators.required],
      text: null,
      subTitle: null,
      imgFile: null
    });
  }

  ngOnInit() {
    if(this.featurette) {
      this.form.get('title').setValue(this.featurette.title);
      this.form.get('text').setValue(this.featurette.text);
      this.form.get('subTitle').setValue(this.featurette.subTitle);
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
    input.append('subTitle', this.form.get('subTitle').value);
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
