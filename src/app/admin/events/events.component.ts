import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../shared/models';
import { CalendarService, AlertService } from '../../shared/services';

const now = new Date();

@Component({
    moduleId: module.id,
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: [
      './events.component.scss'
    ]
})

export class EventsComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  monthEvents: Event[] = [];
  tasks: Event[] = [];
  newEvent: Event = new Event();
  isCollapsed = true;

  constructor(private calendarService: CalendarService, private alertService: AlertService) { }

  ngOnInit() {
    this.selectToday();
  }

  addEvent() {// add event with selected date
    this.newEvent.date = this.model;
    this.calendarService.insert(this.newEvent)
    .subscribe(
        data => {
          this.alertService.success(this.newEvent.title + ' inserito!', false);
          this.isCollapsed = true;
          this.newEvent = new Event();

          this.loadMonthEvents(this.model); // reload tasks
        },
        error => {
          this.alertService.error(error._body);
        });
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
