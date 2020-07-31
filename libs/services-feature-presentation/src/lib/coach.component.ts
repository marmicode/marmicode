import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { shareReplayWithRefCount } from '@marmicode/shared-utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DottyLineModule } from './dotty-line.component';

declare var require: any;

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
    <h2
      [style.position]="(isDesktop$ | async) ? 'absolute' : 'relative'"
      [style.top.px]="(isDesktop$ | async) ? -40 : null"
      class="mc-primary-text coach-name"
    >
      {{ name }}
    </h2>
    <div
      class="coach-title"
      fxLayout="column"
      fxLayout.gt-sm="row"
      fxLayoutAlign="space-between"
    >
      <p>Google Developer Expert<br />for Angular & Web Technologies</p>
      <p>eXtreme Programming Coach</p>
    </div>
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
  isDesktop$ = this._breakpointObserver.observe('(min-width: 960px)').pipe(
    map(({ matches }) => matches),
    shareReplayWithRefCount()
  );
  picturePosition$: Observable<string>;
  pictureRadius$: Observable<number>;

  constructor(private _breakpointObserver: BreakpointObserver) {
    const desktopPictureWidth = 100;
    this.pictureRadius$ = this.isDesktop$.pipe(
      map((isDesktop) => (isDesktop ? desktopPictureWidth : 80)),
      shareReplayWithRefCount()
    );
    this.picturePosition$ = this.isDesktop$.pipe(
      map((isDesktop) =>
        isDesktop ? `calc(50% - ${desktopPictureWidth + 3}px)` : '-3px'
      ),
      shareReplayWithRefCount()
    );
  }
}

@NgModule({
  declarations: [CoachComponent],
  exports: [CoachComponent],
  imports: [CommonModule, DottyLineModule, FlexModule],
})
export class CoachModule {}
