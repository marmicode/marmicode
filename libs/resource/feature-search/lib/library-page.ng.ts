import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Dark library: every resource (or a skill's resources), one per row,
 * filtered by kind, topic and search.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-library-page',
  template: `LibraryPage - 🚧 work in progress`,
})
export class LibraryPage {
  /**
   * Route param: a skill slug, or `everything`.
   */
  skillSlug = input<string>();
}
