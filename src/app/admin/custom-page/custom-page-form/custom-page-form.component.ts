import {Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomPage } from '../../../shared/models';

@Component({
  selector: 'app-custom-page-form',
  templateUrl: './custom-page-form.component.html'
})
export class CustomPageFormComponent implements OnInit {

  form: FormGroup;
  loading = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() customPage: CustomPage;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      _id: ['', Validators.required],
      title: ['', Validators.required],
      menuLabel: ['', Validators.required],
      text: null,
      subtitle: ['', Validators.required],
      appPath: ['', Validators.required],
      imgPath: null
    });
  }


  ngOnInit() {
    if (this.customPage) {
      this.form.get('_id').setValue(this.customPage._id);
      this.form.get('_id').disable();
      this.form.get('title').setValue(this.customPage.title);
      this.form.get('subtitle').setValue(this.customPage.subtitle);
      this.form.get('text').setValue(this.customPage.text);
      this.form.get('menuLabel').setValue(this.customPage.menuLabel);
      this.form.get('appPath').setValue(this.customPage.appPath);
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
    input.append('_id', this.form.get('_id').value.id); // id of the opt
    input.append('title', this.form.get('title').value);
    input.append('subtitle', this.form.get('subtitle').value);
    input.append('text', this.form.get('text').value);
    input.append('menuLabel', this.form.get('menuLabel').value);
    input.append('appPath', this.form.get('appPath').value);
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
