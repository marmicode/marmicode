import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageSection } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-faq',
  imports: [MatExpansionModule, PageSection],
  template: `
    @if (workshop().faqs.length > 0) {
      <mc-page-section [pageTitle]="pageTitle()">
        <mat-accordion>
          @for (faq of workshop().faqs; track faq.question) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title> {{ faq.question }} </mat-panel-title>
              </mat-expansion-panel-header>
              <p>{{ faq.answer }}</p>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </mc-page-section>
    }
  `,
  styles: `
    mat-accordion {
      display: block;
      margin: auto;
      max-width: 800px;
    }
  `,
})
export class WorkshopFaq {
  workshop = input.required<Workshop>();

  pageTitle = computed(
    () => `🙋 ${WORKSHOP_DETAIL_LABELS[this.workshop().language].faq}`,
  );
}
