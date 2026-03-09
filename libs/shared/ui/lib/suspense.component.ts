import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  NgModule,
  TemplateRef,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PushPipe } from '@rx-angular/template/push';
import { Observable } from 'rxjs';
import { ErrorComponent, ErrorModule } from './error.component';
import { LoadingComponent, LoadingModule } from './loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-suspense',
  template: `
    <!-- Data. -->
    @if (resource.hasValue()) {
      <ng-container
        *ngTemplateOutlet="
          dataTemplate;
          context: { $implicit: resource.value() }
        "
      >
      </ng-container>
    }
    <!-- Loading. -->
    @if (resource.isLoading()) {
      <ng-container
        *ngTemplateOutlet="suspenseTemplate ?? defaultSuspenseTemplate"
      >
      </ng-container>
    }
    <!-- Error. -->
    @if (resource.error(); as error) {
      <ng-container
        *ngTemplateOutlet="
          errorTemplate ?? defaultErrorTemplate;
          context: { $implicit: error }
        "
      >
      </ng-container>
    }

    <!-- Default error template. -->
    <ng-template #defaultErrorTemplate>
      <mc-error>Oups! Something went wrong.</mc-error>
    </ng-template>

    <!-- Default suspense template. -->
    <ng-template #defaultSuspenseTemplate>
      <mc-loading></mc-loading>
    </ng-template>
  `,
  imports: [NgTemplateOutlet, ErrorComponent, LoadingComponent],
})
export class SuspenseComponent<T = unknown> {
  @ContentChild('data') dataTemplate!: TemplateRef<{ $implicit: T }>;
  @ContentChild('error') errorTemplate!: TemplateRef<{ $implicit: unknown }>;
  @ContentChild('suspense') suspenseTemplate!: TemplateRef<undefined>;

  data$ = input.required<Observable<T>>();

  resource = rxResource({
    params: this.data$,
    stream: ({ params }) => params,
  });
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
