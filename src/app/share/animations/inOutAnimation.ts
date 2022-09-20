import { animate, style, transition, trigger } from "@angular/animations";

export const inOutAnimation = trigger('inOutAnimation', [
  transition('void => *', []), // No animation for initial view
  transition(':enter', [style({ opacity: 0 }), animate('1s 0.5s', style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate('1s', style({ opacity: 0 }))]),
]);
