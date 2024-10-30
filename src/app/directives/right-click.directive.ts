import { Directive, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: "[appRightClick]",
  standalone: true,
})
export class RightClickDirective {
  @Output() rightClick = new EventEmitter<MouseEvent>();

  constructor() {}

  @HostListener("contextmenu", ["$event"])
  onRightClick(event: Event) {
    event.preventDefault();
    const mouseEvent = event as MouseEvent; // Cast to MouseEvent
    this.rightClick.emit(mouseEvent);
  }
}
