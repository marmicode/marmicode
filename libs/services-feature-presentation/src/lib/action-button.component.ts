import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LinkModule } from '@marmicode/shared-ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-action-button',
  template: `
    <mc-link [href]="uri" rel="noopener" target="_blank">
      <button mat-raised-button color="primary">
        <mat-icon class="button-icon">{{ icon }}</mat-icon>
        <span>{{ label }}</span>
      </button>
    </mc-link>`,
  styles: [
    `
        .button-icon {
            margin-right: 10px;
        }
    `
  ]
})
export class ActionButtonComponent {
  @Input() icon: string;
  @Input() label: string;
  @Input() uri: string;
}

@NgModule({
  declarations: [ActionButtonComponent],
  exports: [ActionButtonComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, LinkModule]
})
export class ActionButtonModule {
}
