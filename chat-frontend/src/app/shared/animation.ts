import { trigger, transition, animate, style } from "@angular/animations";

export const lineStretchAniamtion = trigger("lineStretchAniamtion", [
  transition(":enter", [
    style({
      width: "0",
    }),
    animate(
      ".1s",
      style({
        width: "100%",
      }),
    ),
  ]),
  transition(":leave", [
    style({
      width: "100%",
    }),
    animate(
      ".1s",
      style({
        width: "0", 
      }),
    ),
  ]),
]);
