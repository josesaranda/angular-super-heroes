import { ElementRef } from "@angular/core";
import { UppercaseDirective } from "./uppercase.directive";

describe("UppercaseDirective", () => {
  describe("#ngAfterViewInit", () => {
    it("Should transform input value to uppercase after view init", () => {
      let elRef: ElementRef = { nativeElement: { value: "uppercase" } };
      let directive: UppercaseDirective = new UppercaseDirective(elRef);
      const expectedValue = "UPPERCASE";

      directive.ngAfterViewInit();

      expect(elRef.nativeElement.value).toBe(expectedValue);
    });
  });

  describe("onInputChange", () => {
    it("Should transform input value to uppercase when user types new value", () => {
      let elRef: ElementRef = { nativeElement: { value: "uppercase" } };
      let directive: UppercaseDirective = new UppercaseDirective(elRef);
      const expectedValue = "UPPERCASE";

      directive.onInputChange();

      expect(elRef.nativeElement.value).toBe(expectedValue);
    });
  });
});
