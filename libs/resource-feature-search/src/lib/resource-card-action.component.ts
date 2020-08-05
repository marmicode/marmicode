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
  ResourceType,
} from '@marmicode/resource-core';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { LinkModule } from '@marmicode/shared-ui';
import { Resource } from './resource';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card-action',
  template: ` <mc-link [href]="resource.url" [route]="route">
    <button
      [style.backgroundColor]="color"
      class="action-button"
      mat-raised-button
      color="primary"
    >
      {{ actionText }}
    </button>
  </mc-link>`,
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
  private static _routeFactoryMap = new Map<
    ResourceType,
    (slug: string) => string[]
  >([
    [
      ResourceType.Recipe,
      (slug) => recipeDetailRouterHelper.recipeDetail(slug),
    ],
    [
      ResourceType.Tutorial,
      (slug) => recipeDetailRouterHelper.tutorialDetail(slug),
    ],
  ]);

  @Input() resource: Resource;
  actionText: string;
  color: string;
  route: string[];

  ngOnChanges() {
    this.actionText = getResourceTypeActionText(this.resource.type);
    this.color = getResourceTypeColor(this.resource.type);
    this.route = this._getRoute(this.resource);
  }

  private _getRoute(resource: Resource) {
    const fn = ResourceCardActionComponent._routeFactoryMap.get(resource.type);
    return fn != null ? fn(resource.slug) : null;
  }
}

@NgModule({
  declarations: [ResourceCardActionComponent],
  exports: [ResourceCardActionComponent],
  imports: [CommonModule, MatButtonModule, LinkModule],
})
export class ResourceCardActionModule {}
