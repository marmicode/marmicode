import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { LetModule } from '@rx-angular/template';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-suspense',
  template: `
    <ng-container *rxLet="data$; let data">
      <ng-container
        *ngTemplateOutlet="dataTemplate; context: { $implicit: data }"
      ></ng-container>
    </ng-container>
  `,
})
export class SuspenseComponent<T = unknown> {
  @ContentChild('data') dataTemplate: TemplateRef<{ $implicit: T }>;
  @Input() data$: Observable<T>;
}

@NgModule({
  declarations: [SuspenseComponent],
  exports: [SuspenseComponent],
  imports: [CommonModule, LetModule],
})
export class SuspenseModule {}
