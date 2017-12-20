import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
        state('hide',   style({ opacity: 0 })),
        state('show',   style({ opacity: 1 })),
        // route 'enter' transition
        transition('show => hide', animate('.4s')),
        transition('hide => show', animate('.4s'))
    ]);
export const featuretteAnimation = trigger('featuretteAnimation', [
    state('hide',   style({ opacity: 0 })),
    state('show',   style({ opacity: 1 })),
    // route 'enter' transition
    transition('show => hide', animate('.4s')),
    transition('hide => show', animate('.4s'))
]);
