import { style, transition, trigger, animate } from "@angular/animations";

export const headerAnimation = trigger('logoRotate', [
    transition(':enter', [
      style({
        transform: 'rotate(-6360deg)'
      }),
      animate('2000s linear'),
    ]),
  ]);
