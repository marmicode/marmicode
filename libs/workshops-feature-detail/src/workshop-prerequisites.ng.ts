import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { WorkshopSection } from './workshop-section.ng';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mc-workshop-prerequisites',
  imports: [WorkshopSection, MatIconModule],
  template: `
    <mc-workshop-section title="🎓 Required Knowledge">
      <ul>
        @for (prerequisite of prerequisites(); track prerequisite) {
          <li>
            <mat-icon>check</mat-icon>
            <span>{{ prerequisite }}</span>
          </li>
        }
      </ul>
    </mc-workshop-section>
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
export class WorkshopPrerequisites {
  protected readonly prerequisites = signal([
    'Basic Angular concepts (e.g. components, inputs/outputs, services)',
    'TypeScript fundamentals (e.g. types, interfaces, functions)',
    'Git basics',
  ]);
}
