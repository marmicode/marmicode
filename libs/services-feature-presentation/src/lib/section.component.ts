import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { DottyLineModule } from './dotty-line.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-section',
  template: `
    <section class="section">
      <mc-dotty-line></mc-dotty-line>

      <!-- Title. -->
      <h2 class="mc-primary-text title">
        <ng-content select="[slot=title]"></ng-content>
      </h2>

      <!-- Content. -->
      <div class="content">
        <ng-content select="[slot=content]"></ng-content>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 300px;
      }

      .title {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 65px;
        font-weight: 100;
        line-height: 1.2;
        margin-left: 20px;
        margin-bottom: 20px;
      }

      .section {
        max-width: 800px;
        margin: auto;
      }

      .content {
        font-family: Roboto, sans-serif;
        font-weight: 300;
        margin: 10px;
      }
    `,
  ],
})
export class SectionComponent {}

@NgModule({
  declarations: [SectionComponent],
  exports: [SectionComponent],
  imports: [CommonModule, DottyLineModule],
})
export class SectionModule {}
