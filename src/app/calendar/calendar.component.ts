import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../shared/models';
import { CalendarService } from '../shared/services';

const now = new Date();

@Component({
  moduleId: module.id,
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})
export class CalendarComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  monthEvents: Event[] = [];
  tasks: Event[] = [];

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.selectToday();
  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  loadMonthEvents(date) {
    this.calendarService.getMonthEvents(date).then(result => {
      this.monthEvents = result;
      this.loadTasks(this.model); // load day tasks
    });
  }

  navigate($event) {// called on year/month navigation
    this.date = $event.next;
    this.tasks = [];
    this.monthEvents = [];
    this.loadMonthEvents(this.date);
  }

  hasTask(date: NgbDateStruct) {
    return this.dateHasTask(date);
  }

  loadTasks(date: NgbDateStruct) {
    this.tasks = this.monthEvents.filter(xx => xx.date.day === date.day && xx.date.month === date.month);
  }

  dateHasTask(date: NgbDateStruct): boolean {
    return this.monthEvents.find(xx => xx.date.day === date.day && xx.date.month === date.month) != null;
  }
}
