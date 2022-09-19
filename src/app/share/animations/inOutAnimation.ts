import { animate, style, transition, trigger } from "@angular/animations";

export const inOutAnimation = trigger('inOutAnimation', [
  transition(':enter', [animate('2.5s ease-out')]),
  transition(':leave', [animate('2.5s ease-in')]),
]);
