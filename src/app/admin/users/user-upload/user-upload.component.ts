import {Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { User } from '../../../models';

@Component({
  selector: 'user-upload',
  templateUrl: './user-upload.component.html'
})
export class UserUploadComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() user: User;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      firstName: null,
      lastName: null,
      imgFile: null
    });
  }

  ngOnInit() {
    if(this.user) {
      this.form.get('username').setValue(this.user.username);
      this.form.get('password').setValue(this.user.password);
      this.form.get('firstName').setValue(this.user.firstName);
      this.form.get('lastName').setValue(this.user.lastName);
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
    input.append('username', this.form.get('username').value);
    input.append('password', this.form.get('password').value);
    input.append('firstName', this.form.get('firstName').value);
    input.append('lastName', this.form.get('lastName').value);
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