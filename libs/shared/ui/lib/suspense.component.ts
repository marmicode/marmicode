import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { Suspense, suspensify } from '@jscutlery/operators';
import { PushPipe } from '@rx-angular/template/push';
import { Observable } from 'rxjs';
import { ErrorModule, ErrorComponent } from './error.component';
import { LoadingModule, LoadingComponent } from './loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-suspense',
  template: `
    <ng-container *ngIf="suspense$ | push as suspense">
      <!-- Data. -->
      <ng-container *ngIf="suspense.hasValue && suspense.value as data">
        <ng-container
          *ngTemplateOutlet="dataTemplate; context: { $implicit: data }"
        >
        </ng-container>
      </ng-container>

      <!-- Loading. -->
      <ng-container *ngIf="suspense.pending">
        <ng-container
          *ngTemplateOutlet="suspenseTemplate ?? defaultSuspenseTemplate"
        >
        </ng-container>
      </ng-container>

      <!-- Error. -->
      <ng-container *ngIf="suspense.hasError && suspense.error as error">
        <ng-container
          *ngTemplateOutlet="
            errorTemplate ?? defaultErrorTemplate;
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
  imports: [NgIf, NgTemplateOutlet, ErrorComponent, LoadingComponent, PushPipe],
})
export class SuspenseComponent<T = unknown> {
  @ContentChild('data') dataTemplate: TemplateRef<{ $implicit: T }>;
  @ContentChild('error') errorTemplate: TemplateRef<{ $implicit: unknown }>;
  @ContentChild('suspense') suspenseTemplate: TemplateRef<undefined>;

  @Input() set data$(data$: Observable<T>) {
    this.suspense$ = data$?.pipe(suspensify());
  }

  suspense$: Observable<Suspense<T>>;
}

@NgModule({
  exports: [SuspenseComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorModule,
    PushPipe,
    SuspenseComponent,
  ],
})
export class SuspenseModule {}
