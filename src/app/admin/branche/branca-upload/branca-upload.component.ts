import {Component, ElementRef, ViewChild, Inject, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Branca } from '../../../models';

const BRANCHE_COMBO = [
  {id: 'LC', title: 'Lupetti', subtitle: '(L/C) - bambini/e dai 8 ai 11/12 anni'},
  {id: 'EG', title: 'Esploratori e Guide', subtitle: '(E/G) - ragazzi/e dai 11/12 ai 16 anni'},
  {id: 'RS', title: 'Rover e Scolte', subtitle: '(R/S) - giovani dai 16 ai 20/21 anni'}
];

@Component({
  selector: 'app-branca-upload',
  templateUrl: './branca-upload.component.html'
})
export class BrancaUploadComponent implements OnInit {
  brancheCombo = BRANCHE_COMBO; // XXX

  form: FormGroup;
  loading = false;
  @ViewChild('imgInput') imgInput: ElementRef;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Input() branca: Branca;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      _id: ['', Validators.required],
      title: ['', Validators.required],
      text: null,
      subtitle: null,
      imgFile: null
    });
  }

  ngOnInit() {
    if (this.branca) {
      this.form.get('_id').setValue(this.getOptBranca(this.branca._id));
      this.form.get('_id').disable();
      this.form.get('title').setValue(this.branca.title);
      this.form.get('subtitle').setValue(this.branca.subtitle);
      this.form.get('text').setValue(this.branca.text);
    }
    this.onBrancaChange();
  }

  getOptBranca(_id) {
    for (let i = 0 ; i < this.brancheCombo.length ; i++) {
      if (this.brancheCombo[i].id === _id) {
        return this.brancheCombo[i];
      }
    }
  }

  onBrancaChange() {
    const brancaControl = this.form.get('_id');
    brancaControl.valueChanges.subscribe((value) => {
      this.form.get('title').setValue(value.title);
      this.form.get('subtitle').setValue(value.subtitle);
    } );
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
