import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Testimonial } from '@marmicode/training/core';

/**
 * Quote cards; author picture when `authorPictureUri` is set, else decorative initials.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-quote-grid',
  template: `
    @for (quote of quotes(); track $index) {
      <figure class="mc-surface">
        <blockquote>“{{ quote.quote }}”</blockquote>
        <figcaption>
          @if (quote.authorPictureUri; as authorPictureUri) {
            <img
              class="avatar"
              [alt]="quote.authorName"
              [src]="authorPictureUri"
            />
          } @else {
            <span class="avatar initials" aria-hidden="true">{{
              quote.initials
            }}</span>
          }
          <span>
            <b>{{ quote.authorName }}</b>
            @if (quote.roleAndCompany) {
              <small>{{ quote.roleAndCompany }}</small>
            }
          </span>
        </figcaption>
      </figure>
    }
  `,
  styles: `
    :host {
      display: block;
      columns: 3 300px;
      column-gap: 14px;
      color: var(--mc-dark-text);
    }

    figure {
      margin: 0 0 14px;
      padding: 22px;
      break-inside: avoid;
    }

    blockquote {
      margin: 0 0 16px;
      color: #e6dde8;
      font-size: 15.5px;
    }

    figcaption {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;

      b {
        display: block;
        font-weight: 600;
      }

      small {
        color: var(--mc-dark-muted);
        font-size: 13px;
      }
    }

    .avatar {
      flex: none;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
    }

    .initials {
      display: grid;
      place-items: center;
      background: var(--mc-gradient);
      color: var(--mc-dark-bg);
      font-size: 14px;
      font-weight: 600;
    }
  `,
})
export class TrainingQuoteGrid {
  testimonials = input.required<Testimonial[]>();

  protected quotes = computed(() =>
    this.testimonials().map((testimonial) => ({
      ...testimonial,
      initials: getInitials(testimonial.authorName),
      roleAndCompany: [testimonial.authorRole, testimonial.authorCompany]
        .filter(Boolean)
        .join(' · '),
    })),
  );
}

/* "Grace Hopper" → "GH", "Marie de Lumière" → "ML". */
function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^\p{Lu}/u.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}
