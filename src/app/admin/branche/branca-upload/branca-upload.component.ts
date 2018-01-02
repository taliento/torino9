import {Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Branca } from '../../../shared/models';
import { BrancaService } from '../../../shared/services';

@Component({
  selector: 'app-branca-upload',
  templateUrl: './branca-upload.component.html'
})
export class BrancaUploadComponent implements OnInit {
  brancheCombo = [];
  brancheColors = [];
  icon: string;

  public form: FormGroup;
  loading = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() branca: Branca;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private brancaService: BrancaService) {
    this.form = fb.group({
      _id: ['', Validators.required],
      title: ['', Validators.required],
      text: null,
      subtitle: null,
      color: null,
      imgFile: null
    });

    this.brancheCombo = brancaService.getBranche();
    this.brancheColors = brancaService.getBrancheColors();
  }

  ngOnInit() {
    if (this.branca) {
      this.form.get('_id').setValue(this.getOptBranca(this.branca._id));
      this.form.get('_id').disable();
      this.form.get('title').setValue(this.branca.title);
      this.form.get('subtitle').setValue(this.branca.subtitle);
      this.form.get('color').setValue(this.branca.color);
      this.form.get('text').setValue(this.branca.text);
      this.icon = this.branca.icon;
    }
    this.onBrancaChange();
  }

  getOptBranca(_id) {
    return this.brancheCombo.find(xx => xx.id === _id);
  }

  onBrancaChange() {
    const brancaControl = this.form.get('_id');
    brancaControl.valueChanges.subscribe((value) => {
      this.icon = value.icon;
      this.form.get('title').setValue(value.title);
      this.form.get('subtitle').setValue(value.subtitle);
    } );
  }

  onFileChange(event: any) {
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
    input.append('color', this.form.get('color').value);
    input.append('imgFile', this.form.get('imgFile').value);
    input.append('icon', this.icon);
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
