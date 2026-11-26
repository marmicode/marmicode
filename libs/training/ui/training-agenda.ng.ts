import { Component, computed, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageSection } from '@marmicode/shared/ui';
import { Training } from '@marmicode/training/core';
import { TRAINING_LABELS } from './training.i18n';
@Component({
  selector: 'mc-training-agenda',
  imports: [MatExpansionModule, PageSection],
  template: `
    <mc-page-section [sectionTitle]="sectionTitle()">
      <mat-accordion>
        @for (section of training().agenda.sections; track section) {
          @let isEmpty = section.items.length === 0;
          <mat-expansion-panel [hideToggle]="isEmpty" [inert]="isEmpty">
            <mat-expansion-panel-header>
              <mat-panel-title class="title">
                {{ section.title }}
              </mat-panel-title>
            </mat-expansion-panel-header>
            <ul>
              @for (item of section.items; track $index) {
                <li>{{ item }}</li>
              }
            </ul>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </mc-page-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      @include mat.expansion-overrides(
        (
          header-collapsed-state-height: 3.5rem,
        )
      );
    }

    mat-accordion {
      display: block;
      margin: auto;
      max-width: 800px;
    }

    .title {
      font-size: 1.25em;
      line-height: 1.5;
    }

    li {
      font-size: 1.2em;
      line-height: 2;
      list-style: none;
      position: relative;
    }

    li::before {
      content: '→';
      color: var(--marmicode-accent-color);
      position: absolute;
      left: -1.5em;
    }
  `,
})
export class TrainingAgenda {
  training = input.required<Training>();

  sectionTitle = computed(
    () => `🗓️ ${TRAINING_LABELS[this.training().language].program}`,
  );
}
