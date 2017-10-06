import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { AlertService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe((message) => this.message = message);
        debounceTime.call(this.alertService.getMessage(), 5000).subscribe(() => this.message = null);
    }
}