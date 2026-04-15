import { Directive, NgModule, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { WipService } from './wip.service';

@Directive({
    selector: '[mcWip]',
    standalone: true,
})
export class WipDirective implements OnInit {
  private _wipService = inject(WipService);
  private _templateRef = inject<TemplateRef<unknown>>(TemplateRef);
  private _viewContainerRef = inject(ViewContainerRef);


  ngOnInit() {
    if (this._wipService.isWip()) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}

@Directive({
    selector: '[mcNotWip]',
    standalone: true,
})
export class NotWipDirective implements OnInit {
  private _wipService = inject(WipService);
  private _templateRef = inject<TemplateRef<unknown>>(TemplateRef);
  private _viewContainerRef = inject(ViewContainerRef);


  ngOnInit() {
    if (!this._wipService.isWip()) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}

@NgModule({
    imports: [WipDirective, NotWipDirective],
    exports: [WipDirective, NotWipDirective],
})
export class WipModule {}
