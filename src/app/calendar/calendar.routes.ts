import { Route } from '@angular/router';

import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
import { CalendarComponent } from './calendar.component';

const CHILD_ROUTES: Route[] = [
  { path: 'detail/:id', component: CalendarDetailComponent }
];

export const MODULE_ROUTES: Route[] = [
  { path: 'calendar', component: CalendarComponent, children: [ ...CHILD_ROUTES ] }
];

export const MODULE_COMPONENTS = [
  CalendarComponent, CalendarDetailComponent
];
