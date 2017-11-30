import { Component, ViewChild } from '@angular/core';
import { ContactPage } from '../../shared/models';
import { DownloadService, AlertService } from '../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-downloads',
  templateUrl: './downloads.component.html'
})

export class DownloadsComponent {
  @ViewChild('insertForm') insertForm;

  constructor(private dowloadService: DownloadService, private alertService: AlertService) {
  }

  downloadImages () {
    this.dowloadService.downloadAll();
  }

  uploadImages($event) {
    this.dowloadService.uploadAll($event)
    .subscribe(
      data => {
        this.alertService.success('File caricati!', false);
        this.insertForm.setLoading(false);
      },
      error => {
        this.alertService.error(error._body);
      });
  }

}
