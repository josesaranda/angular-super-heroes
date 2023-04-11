import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[uppercase]",
})
export class UppercaseDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.toUpperCase();
  }

  @HostListener("input", ["$event"]) onInputChange() {
    this.toUpperCase();
  }

  private toUpperCase(): void {
    const inputValue = this.el.nativeElement.value;
    this.el.nativeElement.value = inputValue.toUpperCase();
  }
}
