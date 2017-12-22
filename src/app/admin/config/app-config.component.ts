import { Component, OnInit } from '@angular/core';
import { AppConfigService, AlertService } from '../../shared/services';
import { AppConfig } from '../../shared/models';

@Component({
  moduleId: module.id,
  selector: 'app-config',
  templateUrl: './app-config.component.html'
})

export class AppConfigComponent implements OnInit {

  config: AppConfig = new AppConfig();

  constructor(private appConfigService: AppConfigService, private alertService: AlertService) { }

  ngOnInit() {
    this.appConfigService.getConfig().subscribe((result) => {
        this.config = result;
    });
  }

  save() {
    this.appConfigService.save(this.config)
    .subscribe(
      data => {
        this.alertService.success('Configurazione salvata', false);
      },
      error => {
        this.alertService.error(error._body);
      });
  }
}
