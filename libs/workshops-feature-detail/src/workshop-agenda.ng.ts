import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { WorkshopSection } from './workshop-section.ng';

@Component({
  selector: 'mc-workshop-agenda',
  imports: [MatExpansionModule, WorkshopSection],
  template: `
    <mc-workshop-section title="🗓️ Agenda" color="surface">
      <mat-accordion>
        @for (section of sections(); track $index) {
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title> {{ section.title }} </mat-panel-title>
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
  `,
})
export class WorkshopAgenda {
  sections = signal([
    {
      title: 'Introduction & Setup',
      items: ['Welcome', 'Environment Setup', 'Goals'],
    },
    {
      title: 'Testing Fundamentals',
      items: ['Unit Testing', 'Test Runners', 'Assertions'],
    },
    {
      title: 'Advanced Topics',
      items: ['Component Testing', 'Integration Strategies'],
    },
  ]);

  openSections = signal([true, false, false]);

  toggleSection(index: number) {
    const current = this.openSections();
    this.openSections.set(
      current.map((open, i) => (i === index ? !open : open)),
    );
  }
}
