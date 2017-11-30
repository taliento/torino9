import { Component, Input } from '@angular/core';
import { Event } from '../../shared/models';

@Component({
  moduleId: module.id,
  selector: 'app-calendar-detail',
  templateUrl: 'calendar-detail.component.html',
  styleUrls: ['../calendar.component.css']
})
export class CalendarDetailComponent {
  @Input() task: Event;

}
