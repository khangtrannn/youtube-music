import { animate, style, transition, trigger } from "@angular/animations";

export const inOutAnimation = trigger('inOutAnimation', [
  transition(':enter', [style({ height: 0 }), animate('1s ease-out', style({ height: '*' }))]),
  transition(':leave', [style({ height: '*' }), animate('1s ease-in', style({ height: 0 }))]),
]);
