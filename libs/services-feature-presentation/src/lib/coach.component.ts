import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { DottyLineModule } from './dotty-line.component';

declare var require;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coach',
  template: `<section class="coach-container">
    <img [src]="coachPictureUri" [alt]="name" class="coach-picture" />
    <h2 class="coach-name">{{ name }}</h2>
    <p>Google Developer Expert<br />for Angular & Web Technologies</p>
    <p>eXtreme Programming Coach</p>
    <mc-dotty-line></mc-dotty-line>
    <p>
      Younes is a trainer, consultant & eXtreme Programming coach who loves the
      challenge of boosting teams efficiency and helping everyone enjoy every
      part of their job. He is passionate about testing, continuous deployment,
      automation and simplicity. His experience convinced him that the key to
      making quality products is collective ownership, passion and knowledge
      sharing.
    </p>
    <p>
      In his spare time, you will find him contributing to open-source software,
      writing articles or speaking at meetups or conferences… and sometimes
      sailing.
    </p>
    <p>
      His favorite trick? Adding features by removing code.
    </p>
  </section>`,
  styles: [
    `
      .coach-container {
        margin-top: 80px;
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
        position: relative;
        border-color: var(--marmicode-accent-color);
        border-style: solid;
        border-width: 3px;
        max-width: 800px;
      }

      .coach-picture {
        position: absolute;
        top: -80px;
        right: -3px;
        height: 160px;
        width: 160px;
        border-radius: 50%;
        border-color: var(--marmicode-accent-color);
        border-style: solid;
        border-width: 3px;
      }

      .coach-name {
        font-size: 1.5em;
        font-weight: 800;
      }
    `,
  ],
})
export class CoachComponent {
  coachPictureUri = require('!!file-loader!./coach.jpg').default;
  name = 'Younes Jaaidi';
}

@NgModule({
  declarations: [CoachComponent],
  exports: [CoachComponent],
  imports: [CommonModule, DottyLineModule],
})
export class CoachModule {}
