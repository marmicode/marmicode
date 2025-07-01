import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ActionButtonModule,
  ActionButtonComponent,
} from './action-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshops-button',
  template: `
    <mc-action-button
      icon="school"
      label="SEE UPCOMING WORKSHOPS"
      uri="https://marmicode.eventbrite.com"
    ></mc-action-button>
  `,
  imports: [ActionButtonComponent],
})
export class WorkshopsButtonComponent {}

@NgModule({
  exports: [WorkshopsButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ActionButtonModule,
    WorkshopsButtonComponent,
  ],
})
export class WorkshopsButtonModule {}
