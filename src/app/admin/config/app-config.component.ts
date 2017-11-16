import { Component, OnInit } from '@angular/core';
import { AppConfigService, AlertService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-config',
  templateUrl: './app-config.component.html'
})

export class AppConfigComponent implements OnInit {

  config: any = {title:''};

  constructor(private appConfigService: AppConfigService, private alertService: AlertService) { }

  ngOnInit() {
    this.appConfigService.getConfig().subscribe((result) => {
      if(result && result.json()) this.config = result.json();
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
