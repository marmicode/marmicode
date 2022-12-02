import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { ActionButtonModule } from './action-button.component';

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
})
export class WorkshopsButtonComponent {}

@NgModule({
  declarations: [WorkshopsButtonComponent],
  exports: [WorkshopsButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, ActionButtonModule],
})
export class WorkshopsButtonModule {}
