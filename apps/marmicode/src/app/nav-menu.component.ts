import { PushPipe } from '@rx-angular/template/push';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import {
  resourceSearchRouterHelper,
  servicesRouterHelper,
} from '@marmicode/shared-router-helpers';
import { BehaviorSubject } from 'rxjs';
import { NavMenuItemModule, NavMenuItemComponent } from './nav-menu-item.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-nav-menu',
    template: `
    <!-- Toolbar links. -->
    <div class="mc-flex-row">
      <mat-nav-list class="mc-flex-row mc-hide mc-show-gt-sm" role="menu">
        <mc-nav-menu-item
          *ngFor="let entry of entries"
          [entry]="entry"
          [showIcon]="false"
        ></mc-nav-menu-item>
      </mat-nav-list>

      <button
        (click)="toggleMenu()"
        class="mc-hide-gt-sm"
        aria-label="menu"
        aria-haspopup="true"
        data-role="menu-button"
        mat-button
      >
        <mat-icon>menu</mat-icon>
      </button>
    </div>

    <!-- Overlay menu. -->
    <div
      *ngIf="isMenuDisplayed$ | push"
      @showHide
      class="vertical-menu mat-elevation-z1 mc-hide-gt-sm"
    >
      <mat-nav-list
        class="vertical-menu-list"
        data-role="vertical-menu"
        role="menu"
      >
        <mc-nav-menu-item
          *ngFor="let entry of entries"
          [entry]="entry"
          (click)="closeMenu()"
          color="primary"
        ></mc-nav-menu-item>
      </mat-nav-list>
    </div>
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
      }

      .vertical-menu-list {
        margin: auto;
      }
    `,
    ],
    animations: [
        trigger('showHide', [
            state('void', style({
                height: 0,
            })),
            transition('void <=> *', animate('.1s')),
        ]),
    ],
    standalone: true,
    imports: [
        MatNavList,
        NgFor,
        NavMenuItemComponent,
        MatButton,
        MatIcon,
        NgIf,
        PushPipe,
    ],
})
export class NavMenuComponent {
  isMenuDisplayed$ = new BehaviorSubject<boolean>(false);

  entries = [
    {
      icon: 'article',
      title: 'Resources',
      route: resourceSearchRouterHelper.learnEverything(),
    },
    {
      icon: 'email',
      title: 'Newsletter',
      url: 'https://gmail.us3.list-manage.com/subscribe?u=915d6ba70c9c00912ba326214&id=71255f30c7',
    },
    {
      icon: 'school',
      title: 'Workshops',
      url: 'https://marmicode.eventbrite.com',
    },
    {
      icon: 'ev_station',
      title: 'Services',
      route: servicesRouterHelper.services(),
    },
    {
      icon: 'phone',
      title: 'Contact Us',
      url: 'mailto:kitchen@marmicode.io',
    },
  ];

  toggleMenu() {
    this.isMenuDisplayed$.next(!this.isMenuDisplayed$.value);
  }

  closeMenu() {
    this.isMenuDisplayed$.next(false);
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
