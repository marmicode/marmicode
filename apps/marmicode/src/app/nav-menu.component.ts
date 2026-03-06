import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  signal,
} from '@angular/core';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import {
  resourceSearchRouterHelper,
  workshopRouterHelper,
  externalLinks,
} from '@marmicode/shared/router-helpers';
import { PushPipe } from '@rx-angular/template/push';
import {
  NavMenuEntry,
  NavMenuItemComponent,
  NavMenuItemModule,
} from './nav-menu-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu',
  imports: [MatNavList, NavMenuItemComponent, MatMiniFabButton, MatIcon],
  template: `
    <!-- Toolbar links. -->
    <div class="mc-flex-row">
      <mat-nav-list class="mc-flex-row mc-hide mc-show-gt-sm" role="menu">
        @for (entry of entries; track entry) {
          <mc-nav-menu-item
            [entry]="entry"
            [showIcon]="false"
          ></mc-nav-menu-item>
        }
      </mat-nav-list>

      <button
        (click)="toggleMenu()"
        class="mc-hide-gt-sm"
        aria-label="menu"
        aria-haspopup="true"
        data-role="menu-button"
        matMiniFab
      >
        <mat-icon>menu</mat-icon>
      </button>
    </div>

    <!-- Overlay menu. -->
    @if (isMenuDisplayed()) {
      <div
        animate.leave="leaving"
        class="vertical-menu mat-elevation-z1 mc-hide-gt-sm"
      >
        <mat-nav-list
          class="vertical-menu-list"
          data-role="vertical-menu"
          role="menu"
        >
          @for (entry of entries; track entry) {
            <mc-nav-menu-item
              [entry]="entry"
              (click)="closeMenu()"
              color="primary"
            ></mc-nav-menu-item>
          }
        </mat-nav-list>
      </div>
    }
  `,
  styles: [
    `
      .vertical-menu {
        display: flex;
        flex-direction: column;

        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;

        background-color: white;
        overflow: hidden;

        transition: max-height 0.2s ease-in-out;
        max-height: 100vh;
        @starting-style {
          max-height: 0;
        }
      }

      .vertical-menu.leaving {
        max-height: 0;
      }

      .vertical-menu-list {
        margin: auto;
      }
    `,
  ],
})
export class NavMenuComponent {
  isMenuDisplayed = signal(false);

  entries: NavMenuEntry[] = [
    {
      icon: 'article',
      title: 'Articles',
      route: resourceSearchRouterHelper.learnEverything(),
    },
    {
      icon: 'school',
      title: 'Workshops',
      route: workshopRouterHelper.list(),
    },
    {
      icon: 'live_tv',
      title: 'Get the Course',
      url: 'https://courses.marmicode.io/courses/pragmatic-angular-testing',
    },
    {
      icon: 'phone',
      title: 'Contact Me',
      url: externalLinks.contactFormUrl,
    },
  ];

  toggleMenu() {
    this.isMenuDisplayed.update((v) => !v);
  }

  closeMenu() {
    this.isMenuDisplayed.set(false);
  }
}

@NgModule({
  exports: [NavMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NavMenuItemModule,
    PushPipe,
    NavMenuComponent,
  ],
})
export class NavMenuModule {}
