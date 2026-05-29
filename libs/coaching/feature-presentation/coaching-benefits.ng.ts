import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageSection } from '@marmicode/shared/ui';
import { CoachingOffering } from '@marmicode/coaching/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-benefits',
  imports: [MatIconModule, PageSection],
  template: `
    <mc-page-section color="plain">
      <div class="benefits">
        @for (benefit of coaching().benefits; track benefit) {
          <div class="benefit">
            <div class="icon-container">
              <mat-icon>check</mat-icon>
            </div>
            @let parts = splitBenefit(benefit);
            <p>
              <strong>{{ parts.headline }}</strong>
              — {{ parts.rest }}
            </p>
          </div>
        }
      </div>
    </mc-page-section>
  `,
  styles: `
    .benefits {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;

      @media (max-width: 959.98px) {
        grid-template-columns: 1fr;
      }
    }

    .benefit {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      text-align: left;
      gap: 1rem;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin-top: 0.15rem;
      border-radius: 50%;
      background: var(--marmicode-primary-color);
      color: white;
      flex-shrink: 0;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    p {
      margin: 0;
      font-size: 1.1em;
      line-height: 1.6;
      color: #374151;
    }
  `,
})
export class CoachingBenefits {
  coaching = input.required<CoachingOffering>();

  splitBenefit(benefit: string) {
    const [headline, ...restParts] = benefit.split(' — ');
    return { headline, rest: restParts.join(' — ') };
  }
}
