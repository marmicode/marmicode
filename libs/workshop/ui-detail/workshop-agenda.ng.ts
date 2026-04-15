import { Component, computed, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';
@Component({
  selector: 'mc-workshop-agenda',
  imports: [MatExpansionModule, PageSection],
  template: `
    <mc-page-section [sectionTitle]="sectionTitle()">
      <mat-accordion>
        @for (section of workshop().agenda.sections; track section) {
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
export class WorkshopAgenda {
  workshop = input.required<Workshop>();

  sectionTitle = computed(
    () => `🗓️ ${WORKSHOP_DETAIL_LABELS[this.workshop().language].program}`,
  );
}
