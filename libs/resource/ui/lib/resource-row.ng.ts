import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ResourceKind } from '@marmicode/resource/core';
import { Link } from '@marmicode/shared/ui';

export interface ResourceRowData {
  title: string;
  summary: string;
  kind: ResourceKind;
  releasedAt: Date;
  /**
   * Minutes. Shown as "6 min read" for articles, as a ▶ badge on the thumbnail for videos.
   */
  duration: number;
  /**
   * Contentful picture; a gradient placeholder with the kind icon when missing.
   */
  pictureUri?: string;
  topicLabels: string[];
  /**
   * Internal route or external URL (new tab), as `resource-card-action` does today.
   */
  link: Link;
}

/**
 * One resource per full-width row; the whole row is the link.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-row',
  template: `ResourceRow - 🚧 work in progress`,
})
export class ResourceRow {
  resource = input.required<ResourceRowData>();
}
