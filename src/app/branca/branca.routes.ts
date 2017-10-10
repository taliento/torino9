import { Route } from '@angular/router';
import { BrancaComponent } from './branca.component';


const CHILD_ROUTES: Route[] = [
];

export const MODULE_ROUTES: Route[] = [
  { path: 'branca/:id', component: BrancaComponent, children: CHILD_ROUTES }
]

export const MODULE_COMPONENTS = [
  BrancaComponent
]
