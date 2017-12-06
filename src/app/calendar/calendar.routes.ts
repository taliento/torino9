import { Route } from '@angular/router';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
import { CalendarComponent } from './calendar.component';

export const MODULE_ROUTES: Route[] = [
  { path: 'detail/:id', component: CalendarDetailComponent }
];

export const MODULE_COMPONENTS = [
  CalendarComponent,
  CalendarDetailComponent
];
