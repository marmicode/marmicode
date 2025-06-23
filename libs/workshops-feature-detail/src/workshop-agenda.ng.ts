import { Component, input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { WorkshopSection } from './workshop-section.ng';
import { Agenda } from './workshop';

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
    mat-accordion {
      display: block;
      margin: auto;
      max-width: 800px;
    }

    .title {
      font-size: 1.25em;
    }
  `,
})
export class WorkshopAgenda {
  agenda = input.required<Agenda>();

  openSections = signal([true, false, false]);

  toggleSection(index: number) {
    const current = this.openSections();
    this.openSections.set(
      current.map((open, i) => (i === index ? !open : open)),
    );
  }
}
