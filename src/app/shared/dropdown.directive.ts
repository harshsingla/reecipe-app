import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  OnInit,
  HostBinding,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective implements OnInit {
  @HostBinding("class.open") openClass = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {}
  //toggles the class variable
  @HostListener("document:click", ["$event"]) mouseClick(event: Event) {
    this.openClass = this.elementRef.nativeElement.contains(event.target)
      ? !this.openClass
      : false;
  }
}
