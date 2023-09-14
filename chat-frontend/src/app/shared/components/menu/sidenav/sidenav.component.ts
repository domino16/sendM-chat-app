import { animate, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, visibility: "hidden" }),
        animate(".3s", style({ opacity: 1, visibility: "visible" })),
      ]),
      transition(":leave", [animate(".3s", style({ opacity: 0, visibility: "hidden" }))]),
    ]),
  ],
})
export class SidenavComponent {}
