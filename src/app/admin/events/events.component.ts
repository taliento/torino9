import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../models/event';
import { CalendarService } from '../../services/index';

const now = new Date();

@Component({
    moduleId: module.id,
    selector: 'dt-events',
    templateUrl: 'events.component.html',
    styleUrls: [
      './events.component.css'
    ]
})

export class EventsComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};

  monthEvents: Event[] = [];
  tasks : Event[] = [];

  newEvent: Event = new Event();

  isCollapsed = true;

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.selectToday();
  }

  addEvent() {

  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  loadMonthEvents(date) {

    this.calendarService.getMonthEvents(date).then(result => {
      this.monthEvents = result;
      this.loadTasks(this.model);//load day tasks
    });
  }

  navigate($event) {//called on year/month navigation
    console.log("navigate ->"+JSON.stringify($event));

    this.date = $event.next;

    this.tasks = [];
    this.monthEvents = [];

    this.loadMonthEvents(this.date);
  }

  hasTask(date: NgbDateStruct) {
    return this.dateHasTask(date);
  }

  loadTasks(date: NgbDateStruct) {

    this.tasks = [];//clear prev tasks

    for(var i = 0 ; i < this.monthEvents.length ; i++) {
      var taskDate: any = this.monthEvents[i].date;
      if (taskDate.day === date.day && taskDate.month === date.month) {
        this.tasks.push(this.monthEvents[i]);
      }
    }
  }

  dateHasTask(date: NgbDateStruct): boolean {
    for(var i = 0 ; i < this.monthEvents.length ; i++) {
      var taskDate: any = this.monthEvents[i].date;
      if (taskDate.day === date.day && taskDate.month === date.month) {
        return true;
      }
    }

    return false;
  }

  selectedTasks: any = [];

  taskSelected($event) {

    let index = this.selectedTasks.indexOf($event);

    if( index > -1) {
      this.selectedTasks.splice(index, 1);
    } else {
        this.selectedTasks.push($event);
    }

  }
}
