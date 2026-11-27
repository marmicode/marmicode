import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  externalLinks,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { createBasicPageInfo, Link, PageComponent } from '@marmicode/shared/ui';
import { TODAY } from '@marmicode/shared/utils';
import { getUpcomingSessions } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import {
  WORKSHOP_DETAIL_LABELS,
  WorkshopSessionList,
} from '@marmicode/workshop/ui-detail';

/**
 * Dark workshop page: hero, section tabs, overview, sessions, benefits, testimonials,
 * program, the cook, FAQ, closing section and the sticky booking bar.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-page',
  imports: [PageComponent, WorkshopSessionList],
  template: `
    <mc-page [info]="info()" theme="dark">
      @if (workshop(); as workshop) {
        @let labels = this.labels();

        <section id="sessions" class="wrap">
          <span class="mc-eyebrow">// {{ labels.onTheStove }}</span>
          <h2>{{ labels.upcomingSessions }}</h2>
          <mc-workshop-session-list
            [otherSessions]="otherSessions()"
            [otherWorkshopLink]="otherWorkshopLink()"
            [sessions]="sessions()"
            [workshop]="workshop"
          />
        </section>
      } @else {
        <section class="wrap">
          <h2>Workshop not found.</h2>
          <p>
            Please check the URL or
            <a [href]="contactFormUrl" rel="noopener" target="_blank"
              >contact us</a
            >.
          </p>
        </section>
      }
    </mc-page>
  `,
  styles: `
    .wrap {
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    section {
      position: relative;
      padding: 72px 0;
    }

    [id] {
      scroll-margin-top: 96px;
    }

    h2 {
      margin: 10px 0 0;
      font-size: clamp(30px, 4vw, 44px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }
  `,
})
export class WorkshopPage {
  workshopId = input.required<string>();

  protected contactFormUrl = externalLinks.contactFormUrl;
  protected info = computed(() => {
    const w = this.workshop();

    const allAlternates = w?.alternates
      ? [{ id: w.id, language: w.language }, ...w.alternates]
      : [];

    return createBasicPageInfo({
      title: w?.title,
      pictureUri: w?.pictureUri,
      language: w?.language,
      path: w ? workshopRouterHelper.detailUrl(w.id) : undefined,
      alternates: allAlternates.map((alternate) => ({
        path: workshopRouterHelper.detailUrl(alternate.id),
        language: alternate.language,
      })),
      description: w?.description,
    });
  });
  protected workshop = computed(() =>
    this._workshopRepository.findWorkshop(this.workshopId()),
  );
  protected labels = computed(
    () => WORKSHOP_DETAIL_LABELS[this.workshop()?.language ?? 'en'],
  );
  protected sessions = computed(() => {
    const workshop = this.workshop();
    return workshop
      ? getUpcomingSessions({ workshops: [workshop], today: this._today() })
      : [];
  });
  /* The other-language version of this workshop. */
  private _otherWorkshop = computed(() => {
    const alternate = this.workshop()?.alternates?.[0];
    return alternate
      ? this._workshopRepository.findWorkshop(alternate.id)
      : undefined;
  });
  protected otherSessions = computed(() => {
    const otherWorkshop = this._otherWorkshop();
    return otherWorkshop
      ? getUpcomingSessions({
          workshops: [otherWorkshop],
          today: this._today(),
        })
      : [];
  });
  protected otherWorkshopLink = computed<Link | undefined>(() => {
    const otherWorkshop = this._otherWorkshop();
    return otherWorkshop
      ? { route: workshopRouterHelper.detail(otherWorkshop.id) }
      : undefined;
  });

  private _today = inject(TODAY);
  private _workshopRepository = inject(WorkshopRepository);
}
