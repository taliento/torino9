import { Component, ViewChild } from '@angular/core';
import { ContactPage } from '../../models/contact-page.model';
import { DownloadService, AlertService } from '../../services/index';

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
