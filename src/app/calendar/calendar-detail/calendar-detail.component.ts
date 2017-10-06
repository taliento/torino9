import { Component, Input } from '@angular/core';
import { Event } from '../../models/event';

@Component({
  moduleId: module.id,
  selector:'calendar-detail',
  templateUrl: 'calendar-detail.component.html',
  styleUrls: ['../calendar.component.css']
})
export class CalendarDetailComponent {
  @Input() task: Event;

}