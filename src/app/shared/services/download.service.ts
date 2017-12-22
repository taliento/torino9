import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AService } from './a-service.service';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class DownloadService extends AService {


  constructor(http: HttpClient) {
    super(http);
  }

  downloadAll() {
    this.http.get(this.apiUrl + '/download/downloadAll', {
      responseType: "blob"
    })
    .subscribe(data => {
        saveAs(data, 'images.zip');
      }
    );
  }

  uploadAll(formData: FormData) {
    return this.http.post(this.apiUrl + '/download/uploadAll', formData);
  }
}
