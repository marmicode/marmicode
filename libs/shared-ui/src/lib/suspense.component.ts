import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { ErrorModule } from './error.component';
import { LoadingModule } from './loading.component';
import { LetModule } from '@rx-angular/template';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-suspense',
  template: `
    <ng-container
      *rxLet="
        data$;
        let data;
        let error = $error;
        let suspense = $suspense;
        rxSuspense: suspenseTemplate || defaultSuspenseTemplate
      "
    >
      <ng-container *ngIf="error === false && suspense === false">
        <ng-container
          *ngTemplateOutlet="dataTemplate; context: { $implicit: data }"
        >
        </ng-container>
      </ng-container>

      <!-- Error. -->
      <ng-container *ngIf="error">
        <ng-container
          *ngTemplateOutlet="
            errorTemplate || defaultErrorTemplate;
            context: { $implicit: error }
          "
        >
        </ng-container>
      </ng-container>
    </ng-container>

    <!-- Default error template. -->
    <ng-template #defaultErrorTemplate>
      <mc-error>Oups! Something went wrong.</mc-error>
    </ng-template>

    <!-- Default suspense template. -->
    <ng-template #defaultSuspenseTemplate>
      <mc-loading></mc-loading>
    </ng-template>
  `,
})
export class SuspenseComponent<T = unknown> {
  @ContentChild('data') dataTemplate: TemplateRef<{ $implicit: T }>;
  @ContentChild('error') errorTemplate: TemplateRef<{ $implicit: unknown }>;
  @ContentChild('suspense') suspenseTemplate: TemplateRef<undefined>;
  @Input() data$: Observable<T>;
}

@NgModule({
  declarations: [SuspenseComponent],
  exports: [SuspenseComponent],
  imports: [CommonModule, LetModule, LoadingModule, ErrorModule],
})
export class SuspenseModule {}
