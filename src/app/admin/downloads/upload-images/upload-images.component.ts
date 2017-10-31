import { Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html'
})
export class ImagesUploadComponent {
  form: FormGroup;
  loading = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      imgFile: null
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('imgFile').setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
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
