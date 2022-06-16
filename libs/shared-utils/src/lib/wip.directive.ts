import {
  Directive,
  Injectable,
  NgModule,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { WipService } from './wip.service';

@Directive({
  selector: '[mcWip]',
})
export class WipDirective implements OnInit {
  constructor(
    private _wipService: WipService,
    private _templateRef: TemplateRef<unknown>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    if (this._wipService.isWip()) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}

@Directive({
  selector: '[mcNotWip]',
})
export class NotWipDirective implements OnInit {
  constructor(
    private _wipService: WipService,
    private _templateRef: TemplateRef<unknown>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    if (!this._wipService.isWip()) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}

@NgModule({
  declarations: [WipDirective, NotWipDirective],
  exports: [WipDirective, NotWipDirective],
})
export class WipModule {}
