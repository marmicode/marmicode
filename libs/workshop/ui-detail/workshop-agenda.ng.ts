import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Agenda } from '@marmicode/workshop/core';
import { WorkshopSection } from './internal/workshop-section.ng';
@Component({
  selector: 'mc-workshop-agenda',
  imports: [MatExpansionModule, WorkshopSection],
  template: `
    <mc-workshop-section title="🗓️ Agenda">
      <mat-accordion>
        @for (section of agenda().sections; track section) {
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
    </mc-workshop-section>
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
  agenda = input.required<Agenda>();
}
