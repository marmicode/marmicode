import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResourceRow } from '@marmicode/resource/ui';
import { resourceSearchRouterHelper } from '@marmicode/shared/router-helpers';
import {
  createBasicPageInfo,
  PageComponent,
  PageHeader,
} from '@marmicode/shared/ui';
import { TransferStateHelper } from '@marmicode/shared/utils';
import { ResourceRepository } from './resource-repository.service';
import { toResourceRowData } from './to-resource-row-data';

/**
 * Dark library: every resource (or a skill's resources), one per row,
 * filtered by kind, topic and search.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-library-page',
  imports: [PageComponent, PageHeader, ResourceRow],
  template: `
    <mc-page [info]="pageInfo" theme="dark">
      <mc-page-header
        class="wrap"
        eyebrow="// library"
        description="Articles, videos and the cookbook. Search by what you want to learn, or just browse what's fresh."
      >
        Recipes, talks &amp; tips,
        <span class="mc-gradient-text">free to cook.</span>
      </mc-page-header>

      <main class="wrap">
        <div class="rows">
          @for (row of rows(); track row.id) {
            <mc-resource-row [resource]="row.data" />
          }
        </div>
      </main>
    </mc-page>
  `,
  styles: `
    .wrap {
      display: block;
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    main {
      position: relative;
      z-index: 1;
      padding-bottom: 120px;
    }

    .rows {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `,
})
export class LibraryPage {
  /**
   * Route param: a skill slug, or `everything`.
   */
  skillSlug = input<string>();

  protected readonly pageInfo = createBasicPageInfo({
    title: 'Library',
    description: 'JavaScript, Angular & Testing Resources',
  });

  private readonly _resourceRepository = inject(ResourceRepository);
  private readonly _transferStateHelper = inject(TransferStateHelper);

  private readonly _resources = rxResource({
    params: () => this.skillSlug() ?? resourceSearchRouterHelper.EVERYTHING,
    stream: ({ params: skillSlug }) =>
      (skillSlug === resourceSearchRouterHelper.EVERYTHING
        ? this._resourceRepository.getResources()
        : this._resourceRepository.getResourcesBySkillSlug(skillSlug)
      ).pipe(this._transferStateHelper.transfer(`library:${skillSlug}`)),
  });

  /** Newest first. */
  protected readonly rows = computed(() =>
    (this._resources.value() ?? [])
      .map((resource) => ({
        id: resource.id ?? resource.slug,
        data: toResourceRowData(resource),
      }))
      .sort(
        (a, b) => b.data.releasedAt.getTime() - a.data.releasedAt.getTime(),
      ),
  );
}
