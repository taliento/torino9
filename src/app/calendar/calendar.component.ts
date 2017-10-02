import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
Event
const now = new Date();

@Component({
  moduleId: module.id,
  selector:'calendar-component',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})
export class CalendarComponent implements OnInit{
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};

  constructor() { }

  ngOnInit() {
    this.selectToday();
  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  navigate(date) {
    //TODO
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }

  hasTask(date: NgbDateStruct) {
    return this.dateHasTask(date);
  }

  showTasks(date: NgbDateStruct) {//TODO showtasks
    // if (this.dateHasTask(date)){
      // TODO show popup
    // }
  }

  dateHasTask(date: NgbDateStruct): boolean {
    // for (var i = 0; i < this.userService.user.tasks.length; i++) {
    //   var taskDate = new Date(this.userService.user.tasks[i].date);
    //   var day: number = taskDate.getDate();
    //   var month: number = taskDate.getMonth() + 1;
    //   var year: number = taskDate.getFullYear();
    //
    //   if (day === date.day && month === date.month && year === date.year) {
    //     return true;
    //   }
    // }

    return true;
  }
}
