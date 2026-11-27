import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResourceKind, ResourceTopic } from '@marmicode/resource/core';
import { ResourceRow } from '@marmicode/resource/ui';
import { resourceSearchRouterHelper } from '@marmicode/shared/router-helpers';
import {
  Button,
  createBasicPageInfo,
  PageComponent,
  PageHeader,
  SegmentedControl,
  SegmentedControlOption,
} from '@marmicode/shared/ui';
import { TransferStateHelper } from '@marmicode/shared/utils';
import { ResourceRepository } from './resource-repository.service';
import { TopicFilter } from './topic-filter.ng';
import { toResourceRowData } from './to-resource-row-data';

/**
 * Dark library: every resource (or a skill's resources), one per row,
 * filtered by kind, topic and search.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-library-page',
  imports: [
    Button,
    PageComponent,
    PageHeader,
    ResourceRow,
    SegmentedControl,
    TopicFilter,
  ],
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

      <div class="wrap tools">
        <h2>
          <span role="status">{{ heading() }}</span>
        </h2>
        <label class="search">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            aria-label="Search the library"
            placeholder="Search articles and videos"
            type="search"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
          />
        </label>
        <mc-segmented-control
          ariaLabel="Filter by type"
          [options]="kindOptions"
          [(value)]="kindFilter"
        />
      </div>

      <mc-topic-filter class="wrap topics" [(value)]="topicFilter" />

      <main class="wrap">
        <div class="rows">
          @for (row of rows(); track row.id) {
            <mc-resource-row [resource]="row.data" />
          } @empty {
            @if (!isLoading()) {
              <div class="empty">
                <p>That one hasn't been cooked yet.</p>
                <button mcButton="ghost" type="button" (click)="resetFilters()">
                  Show everything
                </button>
              </div>
            }
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

    .tools {
      position: relative;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-top: 64px;

      h2 {
        margin: 0 auto 0 0;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -0.03em;
      }
    }

    .search {
      position: relative;
      flex: 0 1 320px;

      svg {
        position: absolute;
        top: 50%;
        left: 13px;
        width: 18px;
        height: 18px;
        transform: translateY(-50%);
        fill: none;
        stroke: var(--mc-dark-muted);
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      input {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 14px 10px 40px;
        border: 1px solid var(--mc-dark-line);
        border-radius: 12px;
        outline: none;
        background: var(--mc-dark-surface);
        color: var(--mc-dark-text);
        font: inherit;
        font-size: 15px;
        transition: border-color 0.2s;
      }

      input::placeholder {
        color: var(--mc-dark-muted);
      }

      input:focus {
        border-color: rgba(var(--mc-accent-rgb), 0.6);
      }
    }

    @media (max-width: 720px) {
      .tools h2 {
        width: 100%;
      }

      .search {
        flex: 1 1 100%;
      }
    }

    .topics {
      position: relative;
      z-index: 1;
      margin-top: 16px;
      margin-bottom: 24px;
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

    .empty {
      padding: 56px 0;
      color: var(--mc-dark-muted);
      text-align: center;
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

  protected readonly kindFilter = signal<ResourceKind | null>(null);
  protected readonly kindOptions: SegmentedControlOption<ResourceKind | null>[] =
    [
      { value: null, label: 'All' },
      { value: 'article', label: 'Articles' },
      { value: 'video', label: 'Videos' },
    ];
  protected readonly topicFilter = signal<ResourceTopic | null>(null);
  protected readonly query = signal('');

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

  protected readonly isLoading = computed(() => this._resources.isLoading());

  private readonly _isFiltering = computed(
    () =>
      this.kindFilter() != null ||
      this.topicFilter() != null ||
      this.query().trim() !== '',
  );

  /** Matching resources, newest first. */
  protected readonly rows = computed(() => {
    const kind = this.kindFilter();
    const topic = this.topicFilter();
    const query = this.query().trim().toLowerCase();
    return (this._resources.value() ?? [])
      .filter((resource) => topic == null || resource.topics.includes(topic))
      .map((resource) => ({
        id: resource.id ?? resource.slug,
        data: toResourceRowData(resource),
      }))
      .filter(({ data }) => kind == null || data.kind === kind)
      .filter(
        ({ data }) =>
          query === '' ||
          [data.title, data.summary, ...data.topicLabels]
            .join(' ')
            .toLowerCase()
            .includes(query),
      )
      .sort(
        (a, b) => b.data.releasedAt.getTime() - a.data.releasedAt.getTime(),
      );
  });

  /** "Everything", or the live result count while filtering. */
  protected readonly heading = computed(() => {
    if (!this._isFiltering()) {
      return 'Everything';
    }
    const count = this.rows().length;
    return `${count} ${count === 1 ? 'result' : 'results'}`;
  });

  protected resetFilters() {
    this.kindFilter.set(null);
    this.topicFilter.set(null);
    this.query.set('');
  }
}
