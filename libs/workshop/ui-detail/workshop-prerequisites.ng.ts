import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LandingSection } from '@marmicode/shared/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-required-skills',
  imports: [LandingSection, MatIconModule],
  template: `
    <mc-landing-section title="🎓 Required Knowledge">
      <ul>
        @for (skill of skills(); track skill) {
          <li>
            <mat-icon>check</mat-icon>
            <span>{{ skill }}</span>
          </li>
        }
      </ul>
    </mc-landing-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    ul {
      display: block;
      margin: auto;
      max-width: 600px;
      list-style: none;
    }

    li {
      display: flex;
      align-items: center;
      font-size: 1.125rem;
      gap: 0.5rem;
      margin: 1rem 0;

      @include mat.icon-overrides(
        (
          color: green,
        )
      );
    }
  `,
})
export class WorkshopRequiredSkills {
  skills = input.required<string[]>();
}
