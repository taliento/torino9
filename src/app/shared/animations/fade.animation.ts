import { trigger, state, animate, transition, style, query, group } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  state('hide',   style({ opacity: 0 })),
  state('show',   style({ opacity: 1 })),
  // route 'enter' transition
  transition('show => hide', animate('0.5s ease-in-out')),
  transition('hide => show', animate('0.5s ease-in-out'))
]);
export const featuretteAnimation = trigger('featuretteAnimation', [
    state('hide',   style({ opacity: 0 })),
    state('show',   style({ opacity: 1 })),
    // route 'enter' transition
    transition('show => hide', animate('0.5s ease-in-out')),
    transition('hide => show', animate('0.5s ease-in-out'))
]);
