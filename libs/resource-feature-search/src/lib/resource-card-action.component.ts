import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  getResourceTypeActionText,
  getResourceTypeColor,
} from '@marmicode/resource-core';
import { Resource } from './resource';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card-action',
  template: `<a [href]="resource.url" target="_blank">
    <button
      [style.backgroundColor]="color"
      class="action-button"
      mat-raised-button
      color="primary"
    >
      {{ actionText }}
    </button>
  </a>`,
  styles: [
    `
      .action-button {
        font-size: 1.1em;
        min-width: 130px;
        text-transform: uppercase;
      }
    `,
  ],
})
export class ResourceCardActionComponent implements OnChanges {
  @Input() resource: Resource;
  actionText: string;
  color: string;

  ngOnChanges() {
    this.actionText = getResourceTypeActionText(this.resource.type);
    this.color = getResourceTypeColor(this.resource.type);
  }
}

@NgModule({
  declarations: [ResourceCardActionComponent],
  exports: [ResourceCardActionComponent],
  imports: [CommonModule, MatButtonModule],
})
export class ResourceCardActionModule {}
