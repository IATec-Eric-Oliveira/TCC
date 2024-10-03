import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[clickOutside]",
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener("document:mousedown", ["$event.target"])
  onClickDown(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
