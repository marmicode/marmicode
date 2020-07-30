import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshops-button',
  template: `
    <a href="https://marmicode.eventbrite.com" target="_blank">
      <button mat-raised-button color="primary">
        <mat-icon class="button-icon">school</mat-icon>
        <span>SEE WORKSHOPS</span>
      </button>
    </a>
  `,
  styles: [
    `
      .button-icon {
        margin-right: 10px;
      }
    `,
  ],
})
export class WorkshopsButtonComponent {}

@NgModule({
  declarations: [WorkshopsButtonComponent],
  exports: [WorkshopsButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class WorkshopsButtonModule {}
