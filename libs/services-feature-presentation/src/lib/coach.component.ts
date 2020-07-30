import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coach',
  template: `<section class="coach-container">
    <h2 class="coach-name">Younes Jaaidi</h2>
    <p>Google Developer Expert<br />for Angular & Web Technologies</p>
    <p>eXtreme Programming Coach</p>
  </section>`,
  styles: [
    `
      .coach-container {
        box-sizing: border-box;
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
        position: relative;
        border-color: var(--marmicode-accent-color);
        border-style: solid;
        border-width: 3px;
        width: 100%;
        max-width: 800px;
      }

      .coach-name {
        font-size: 1.5em;
        font-weight: 800;
      }
    `,
  ],
})
export class CoachComponent {}

@NgModule({
  declarations: [CoachComponent],
  exports: [CoachComponent],
  imports: [CommonModule],
})
export class CoachModule {}
