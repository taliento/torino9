import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AService } from './a-service.service';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class DownloadService extends AService {


  constructor(http: Http) {
    super(http);
  }

  downloadAll() {
    this.http.get(this.apiUrl + '/download/downloadAll', this.jwtBlob())
    .map((response: Response) => response.blob())
    .subscribe(data => {
        saveAs(data, 'images.zip');
      }
    );
  }

  uploadAll(formData: FormData) {
    return this.http.post(this.apiUrl + '/download/uploadAll', formData, this.jwt());
  }
}
