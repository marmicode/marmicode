import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
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
 * As in `TrainingTile`, the title link covers the whole row.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-row',
  imports: [RouterLink],
  template: `
    <article class="mc-surface mc-surface-interactive">
      <div class="thumb">
        @if (resource().pictureUri; as pictureUri) {
          <img alt="" [src]="pictureUri" />
        } @else {
          <!-- Decorative: the title says it all. -->
          <span class="placeholder" aria-hidden="true">
            @if (resource().kind === 'video') {
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <polygon points="10 9 15 12 10 15" />
              </svg>
            } @else {
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
                />
                <path d="M14 3v5h5" />
                <path d="M9 13h6" />
                <path d="M9 17h4" />
              </svg>
            }
          </span>
        }
        @if (resource().kind === 'video') {
          <span class="play">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <polygon points="7 4 20 12 7 20" />
            </svg>
            {{ resource().duration }} min
          </span>
        }
      </div>

      <div class="content">
        <div class="meta">
          <span class="type">{{ labels().type }}</span>
          <span>{{ details() }}</span>
        </div>
        <h3>
          @if (href(); as href) {
            <a class="title-link" [href]="href" rel="noopener" target="_blank">
              {{ resource().title }}
            </a>
          } @else {
            <a class="title-link" [routerLink]="route()">
              {{ resource().title }}
            </a>
          }
        </h3>
        <p>{{ resource().summary }}</p>
        @if (resource().topicLabels.length > 0) {
          <ul class="topic-tags" aria-label="Topics">
            @for (label of resource().topicLabels; track label) {
              <li class="topic-tag">{{ label }}</li>
            }
          </ul>
        }
      </div>

      <span class="read" aria-hidden="true">
        {{ labels().action }}
        <svg viewBox="0 0 24 24">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }

    article {
      position: relative;
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr) auto;
      align-items: center;
      gap: 28px;
      padding: 14px 28px 14px 14px;
      color: var(--mc-dark-text);
    }

    .thumb {
      position: relative;
      display: grid;
      place-items: center;
      overflow: hidden;
      aspect-ratio: 16 / 9;
      border: 1px solid var(--mc-dark-line);
      border-radius: 13px;
      background:
        radial-gradient(
          70% 90% at 20% 10%,
          rgba(var(--mc-violet-rgb), 0.55),
          transparent 65%
        ),
        radial-gradient(
          60% 80% at 90% 100%,
          rgba(var(--mc-accent-rgb), 0.32),
          transparent 65%
        ),
        #1e1426;
    }

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Dotted grid fading out, as on the prototype's generated thumbnails. */
    .thumb::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
        rgba(255, 255, 255, 0.07) 1px,
        transparent 1px
      );
      background-size: 14px 14px;
      mask-image: linear-gradient(to bottom, #000, transparent 85%);
    }

    .placeholder {
      position: relative;
      display: grid;
      place-items: center;
      padding: 10px 14px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 10px;
      background: rgba(17, 10, 19, 0.6);
      color: rgba(244, 238, 245, 0.92);

      svg {
        width: 28px;
        height: 28px;
      }
    }

    .play {
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px 4px 8px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      background: rgba(17, 10, 19, 0.8);
      color: var(--mc-dark-text);
      font-family: var(--mc-font-mono);
      font-size: 12px;

      svg {
        width: 11px;
        height: 11px;
        fill: currentColor;
        stroke: none;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2px 10px;
      color: var(--mc-dark-muted);
      font-size: 12.5px;
    }

    .type {
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 11.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.015em;
      line-height: 1.28;
    }

    .title-link {
      color: inherit;
      text-decoration: none;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
      }

      &:focus-visible {
        outline: none;

        &::after {
          outline: 2px solid var(--mc-accent);
          outline-offset: -2px;
        }
      }
    }

    p {
      display: -webkit-box;
      overflow: hidden;
      max-width: 80ch;
      margin: 0;
      color: var(--mc-dark-muted);
      font-size: 15px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .topic-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 2px 0 0;
      padding: 0;
      list-style: none;
    }

    .topic-tag {
      padding: 3px 10px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.25);
      border-radius: 999px;
      background: rgba(var(--mc-accent-rgb), 0.1);
      color: var(--mc-accent-bright);
      font-size: 12px;
    }

    .read {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--mc-dark-muted);
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;

      svg {
        flex: none;
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    article:hover .read {
      color: var(--mc-accent-bright);
    }

    @media (max-width: 760px) {
      article {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 12px 12px 20px;
      }

      .thumb {
        aspect-ratio: 16 / 7;
      }

      .content {
        padding: 0 8px;
      }

      .read {
        display: none;
      }
    }
  `,
})
export class ResourceRow {
  resource = input.required<ResourceRowData>();

  protected readonly labels = computed(() => KIND_LABELS[this.resource().kind]);

  /** "Nov 2024 · 6 min read" for articles, "Oct 2022" for videos (their duration is on the thumbnail). */
  protected readonly details = computed(() => {
    const { kind, duration, releasedAt } = this.resource();
    const date = DATE_FORMAT.format(new Date(releasedAt));
    return kind === 'article' ? `${date} · ${duration} min read` : date;
  });

  protected readonly href = computed(() => {
    const link = this.resource().link;
    return 'href' in link ? link.href : undefined;
  });

  protected readonly route = computed(() => {
    const link = this.resource().link;
    return 'route' in link ? link.route : undefined;
  });
}

const DATE_FORMAT = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const KIND_LABELS: Record<ResourceKind, { type: string; action: string }> = {
  article: { type: 'Article', action: 'Read' },
  video: { type: 'Video', action: 'Watch' },
};
