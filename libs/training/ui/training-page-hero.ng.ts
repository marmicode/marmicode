import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Link } from '@marmicode/shared/ui';
import { Training } from '@marmicode/training/core';

/**
 * Dark hero shared by the workshop and cohort pages: breadcrumb, title with the last word in gradient,
 * subheading lines, actions, and an aside card. Nothing about booking: pages project their own content.
 * Slots: `[slot=actions]`, `[slot=aside]` (price card / offer card), `[slot=note]` (OPCO, alternate languages).
 * `asideLayout`: 'overlap' puts the aside over the picture's corner (price card), 'attached' frames the picture
 * and the aside as one card, the picture on top (offer card).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-page-hero',
  host: {
    '[class.attached-aside]': "asideLayout() === 'attached'",
  },
  imports: [RouterLink],
  template: `
    <div class="text">
      <nav class="crumbs" aria-label="Breadcrumb">
        @for (crumb of crumbs(); track $index; let last = $last) {
          @if (crumb.href; as href) {
            <a [href]="href" rel="noopener" target="_blank">{{
              crumb.label
            }}</a>
          } @else if (crumb.route; as route) {
            <a [routerLink]="route">{{ crumb.label }}</a>
          } @else {
            <span [attr.aria-current]="last ? 'page' : null">{{
              crumb.label
            }}</span>
          }
          @if (!last) {
            <span aria-hidden="true">/</span>
          }
        }
      </nav>

      <h1>
        {{ titleStart() }}
        <span class="mc-gradient-text">{{ titleEnd() }}</span>
      </h1>

      <p class="sub">
        @for (line of subheadingLines(); track $index) {
          <span>{{ line }}</span>
        }
      </p>

      <div class="actions">
        <ng-content select="[slot=actions]" />
      </div>

      <div class="note">
        <ng-content select="[slot=note]" />
      </div>
    </div>

    <div
      class="visual"
      [class.mc-surface]="asideLayout() === 'attached'"
      [class.mc-surface-highlighted]="asideLayout() === 'attached'"
    >
      <img [alt]="training().pictureAltText" [src]="training().pictureUri" />
      <div class="aside">
        <ng-content select="[slot=aside]" />
      </div>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 48px;
      align-items: center;
      /* The shell already leaves 80px for the floating nav. */
      padding: 60px 0 40px;
      color: var(--mc-dark-text);
    }

    .crumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 8px;
      align-items: center;
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-mono);
      font-size: 13px;

      a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: var(--mc-dark-text);
        }

        &:focus-visible {
          outline: 2px solid var(--mc-accent);
          outline-offset: 2px;
        }
      }
    }

    h1 {
      margin: 18px 0;
      font-size: clamp(40px, 5.6vw, 66px);
      font-weight: 700;
      letter-spacing: -0.045em;
      line-height: 1;
    }

    .sub {
      max-width: 52ch;
      margin: 0 0 28px;
      color: var(--mc-dark-muted);
      font-size: clamp(16px, 1.8vw, 18.5px);

      span {
        display: block;
      }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .note:not(:empty) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      margin-top: 20px;
      color: var(--mc-dark-muted);
      font-size: 14px;
    }

    .visual {
      position: relative;
    }

    img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      object-position: 50% 30%;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 24px;
      box-shadow: 0 40px 80px -40px rgba(var(--mc-violet-rgb), 0.6);
    }

    /* The aside card overlaps the picture's bottom-left corner. */
    .aside:not(:empty) {
      position: absolute;
      bottom: -28px;
      left: -28px;
    }

    /* The picture and the aside make a single card. */
    :host(.attached-aside) .visual {
      overflow: hidden;
      box-shadow: 0 40px 80px -40px rgba(var(--mc-violet-rgb), 0.6);
    }

    :host(.attached-aside) img {
      aspect-ratio: 16 / 9;
      border: 0;
      border-bottom: 1px solid var(--mc-dark-line);
      border-radius: 0;
      box-shadow: none;
    }

    :host(.attached-aside) .aside:not(:empty) {
      position: static;
    }

    @media (max-width: 900px) {
      :host {
        grid-template-columns: 1fr;
        gap: 36px;
        padding-top: 40px;
      }

      .visual {
        order: -1;
      }

      .aside:not(:empty) {
        position: relative;
        bottom: auto;
        left: auto;
        width: max-content;
        max-width: calc(100% - 24px);
        margin: -44px 12px 0 auto;
      }

      :host(.attached-aside) .aside:not(:empty) {
        width: auto;
        max-width: none;
        margin: 0;
      }
    }
  `,
})
export class TrainingPageHero {
  training = input.required<Training>();
  /** e.g. [{ label: 'Training', link }, { label: 'Workshops' }] */
  breadcrumb = input.required<Array<{ label: string; link?: Link }>>();
  asideLayout = input<'overlap' | 'attached'>('overlap');

  protected crumbs = computed(() =>
    this.breadcrumb().map(({ label, link }) => ({
      label,
      href: link && 'href' in link ? link.href : undefined,
      route: link && 'route' in link ? link.route : undefined,
    })),
  );
  /* "Pragmatic Angular Testing" → "Pragmatic Angular" + gradient "Testing". */
  protected titleStart = computed(() => {
    const title = this.training().title;
    return title.slice(0, Math.max(title.lastIndexOf(' '), 0));
  });
  protected titleEnd = computed(() => {
    const title = this.training().title;
    return title.slice(title.lastIndexOf(' ') + 1);
  });
  protected subheadingLines = computed(() =>
    this.training().subheading.split('\n'),
  );
}
