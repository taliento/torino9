import {Component, Injectable, Inject} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {LOCALE_ID} from '@angular/core';

const I18N_VALUES = {
  'it': {
    weekdays: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'],
    months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  }
  // other languages you would support
};

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  locale: string = "it";

  constructor(@Inject(LOCALE_ID) locale: string) {
    super();
    this.locale = locale;
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.locale].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this.locale].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}
