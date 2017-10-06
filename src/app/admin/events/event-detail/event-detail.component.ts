import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../../models/event';

@Component({
  moduleId: module.id,
  selector:'event-detail',
  templateUrl: 'event-detail.component.html'
})
export class EventDetailComponent {
  @Input() task: Event;
  @Output() selectEvent: EventEmitter<any> = new EventEmitter();

  active = false;

  selected() {
    this.active = !this.active;

    this.selectEvent.emit(this.task);
  }

}
