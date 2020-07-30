import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { shareReplayWithRefCount } from '@marmicode/shared-utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DottyLineModule } from './dotty-line.component';

declare var require;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coach',
  template: `<section
    [style.marginTop.px]="pictureRadius$ | async"
    [style.paddingTop.px]="(isDesktop$ | async) ? 30 : 10"
    class="coach-container"
  >
    <img
      [src]="coachPictureUri"
      [alt]="name"
      [style.top.px]="-(pictureRadius$ | async)"
      [style.right]="picturePosition$ | async"
      [style.height.px]="2 * (pictureRadius$ | async)"
      [style.width.px]="2 * (pictureRadius$ | async)"
      class="coach-picture"
    />
    <h2 class="coach-name">{{ name }}</h2>
    <p class="coach-title">
      Google Developer Expert<br />for Angular & Web Technologies
    </p>
    <p class="coach-title">eXtreme Programming Coach</p>
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
        border-radius: 50%;
        border-color: var(--marmicode-accent-color);
        border-style: solid;
        border-width: 3px;
      }

      .coach-name {
        font-size: 1.5em;
        font-weight: 800;
      }

      .coach-title {
        font-size: 1.2em;
      }
    `,
  ],
})
export class CoachComponent {
  coachPictureUri = require('!!file-loader!./coach.jpg').default;
  name = 'Younes Jaaidi';
  isDesktop$ = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => !result.matches),
    shareReplayWithRefCount()
  );
  picturePosition$: Observable<string>;
  pictureRadius$: Observable<number>;

  constructor(private _breakpointObserver: BreakpointObserver) {
    const desktopPictureWidth = 100;
    this.pictureRadius$ = this.isDesktop$.pipe(
      map((isDesktop) => (isDesktop ? desktopPictureWidth : 80))
    );
    this.picturePosition$ = this.isDesktop$.pipe(
      map((isDesktop) =>
        isDesktop ? `calc(50% - ${desktopPictureWidth + 3}px)` : '-3px'
      )
    );
  }
}

@NgModule({
  declarations: [CoachComponent],
  exports: [CoachComponent],
  imports: [CommonModule, DottyLineModule],
})
export class CoachModule {}
