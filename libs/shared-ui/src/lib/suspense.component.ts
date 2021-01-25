import { CommonModule, NgForOfContext } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-suspense',
  template: ` <ng-container
    *ngTemplateOutlet="dataTemplate; context: { $implicit: data$ | async }"
  ></ng-container>`,
})
export class SuspenseComponent<T = unknown> {
  @ContentChild('data') dataTemplate: TemplateRef<{ $implicit: T }>;
  @Input() data$: Observable<T>;
}

@NgModule({
  declarations: [SuspenseComponent],
  exports: [SuspenseComponent],
  imports: [CommonModule],
})
export class SuspenseModule {}
