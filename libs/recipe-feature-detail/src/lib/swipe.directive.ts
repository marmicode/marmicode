import { CommonModule } from '@angular/common';
import { Directive, NgModule } from '@angular/core';

@Directive({
  selector: '[mcSwipe]',
})
export class SwipeDirective {}

@NgModule({
  declarations: [SwipeDirective],
  exports: [SwipeDirective],
  imports: [CommonModule],
})
export class SwipeDirectiveModule {}
