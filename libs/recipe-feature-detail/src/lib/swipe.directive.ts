import { CommonModule } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  NgModule,
  OnInit,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[mcSwipe]',
})
export class SwipeDirective implements OnInit {
  private _touchstart$ = new Subject();

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {}

  @HostListener('touchstart', ['$event']) onTouchStart(evt: MouseEvent) {
    this._touchstart$.next(evt);
  }
}

@NgModule({
  declarations: [SwipeDirective],
  exports: [SwipeDirective],
  imports: [CommonModule],
})
export class SwipeDirectiveModule {}
