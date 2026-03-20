import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Testimonial } from '@marmicode/workshop/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-testimonial-card',
  imports: [MatCardModule],
  template: `
    <mat-card class="card" appearance="outlined">
      <mat-card-content class="content">
        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
        <p class="quote">{{ testimonial().quote }}</p>
      </mat-card-content>
      <mat-card-footer class="footer">
        <div class="author">
          @if (testimonial().authorPictureUri) {
            <img
              class="author-picture"
              [src]="testimonial().authorPictureUri"
              [alt]="testimonial().authorName"
            />
          }
          <div class="author-info">
            <span class="author-name">{{ testimonial().authorName }}</span>
            <span class="author-meta">{{ roleAndCompany() }}</span>
          </div>
        </div>
      </mat-card-footer>
    </mat-card>
  `,
  styles: `
    .card {
      max-width: 340px;
      min-width: 280px;
      height: 100%;
      padding: 1rem;
    }

    .content {
      flex: 1;
      position: relative;
      padding: 0;
    }

    .quote-mark {
      display: block;
      font-size: 4rem;
      line-height: 1;
      color: var(--marmicode-accent-color, #9c27b0);
      font-family: Georgia, serif;
      margin-bottom: -2.5rem;
    }

    .quote {
      font-size: 0.95rem;
      line-height: 1.65;
      color: #333;
      font-style: italic;
    }

    .footer {
      padding: 0;
      margin-top: 1rem;
    }

    .author {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.75rem;
      border-top: 1px solid rgba(56, 0, 48, 0.12);
      padding-top: 1rem;
    }

    .author-picture {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .author-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .author-name {
      font-weight: 700;
      font-size: 1rem;
      color: #380030;
    }

    .author-meta {
      color: #666;
      font-size: 0.8rem;
      height: 1rem;
    }
  `,
})
export class WorkshopTestimonialCard {
  testimonial = input.required<Testimonial>();

  roleAndCompany = computed(() => {
    const { authorRole, authorCompany } = this.testimonial();
    return [
      ...(authorRole ? [authorRole] : []),
      ...(authorCompany ? [authorCompany] : []),
    ].join(' at ');
  });
}
