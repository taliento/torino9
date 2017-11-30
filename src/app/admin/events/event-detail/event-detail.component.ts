import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../../shared/models';
import { CalendarService, AlertService } from '../../../shared/services';

@Component({
  moduleId: module.id,
  selector: 'app-event-detail',
  templateUrl: 'event-detail.component.html'
})
export class EventDetailComponent {
  @Input() task: Event;
  @Output() reload: EventEmitter<any> = new EventEmitter();

  @ViewChild('confirmDialog') confirmDialog;
  confirmTitle = 'Sicuro?';
  confirmText = 'Stai eliminando un evento...';

  @ViewChild('updateEvent') updateEvent;

  constructor(private modalService: NgbModal, private calendarService: CalendarService, private alertService: AlertService) {}

  update() {
    this.calendarService.update(this.task).
    subscribe(
      data => {
        this.alertService.success('Evento modificato', false);
        this.reload.emit(); // reload tasks
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  deleteEvent() {
    const ids = [];

    this.calendarService.delete(this.task._id).
    subscribe(
      data => {
        this.alertService.success('Evento eliminato', false);
        this.reload.emit(); // reload tasks
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  openUpdateModal() {
    this.modalService.open(this.updateEvent);
  }
}
