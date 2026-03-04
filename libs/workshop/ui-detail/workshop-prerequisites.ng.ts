import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-required-skills',
  imports: [PageSection, MatIconModule],
  template: `
    <mc-page-section [sectionTitle]="sectionTitle()">
      <ul>
        @for (skill of workshop().requiredSkills; track skill) {
          <li>
            <mat-icon>check</mat-icon>
            <span>{{ skill }}</span>
          </li>
        }
      </ul>
    </mc-page-section>
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
  workshop = input.required<Workshop>();
  sectionTitle = computed(
    () =>
      `🎓 ${WORKSHOP_DETAIL_LABELS[this.workshop().language].requiredKnowledge}`,
  );
}
