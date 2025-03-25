import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatListModule, MatListItem } from '@angular/material/list';
import { RouterModule, RouterLinkActive, RouterLink } from '@angular/router';

export interface NavMenuEntry {
  icon: string;
  title: string;
  route?: string[];
  url?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu-item',
  template: `
    <!-- Url. -->
    <a
      *ngIf="entry.url"
      [href]="entry.url"
      mat-list-item
      rel="noopener"
      role="menuitem"
      target="_blank"
    >
      <ng-container *ngTemplateOutlet="linkContent"></ng-container>
    </a>

    <!-- Route. -->
    <a
      *ngIf="entry.route"
      [routerLink]="entry.route"
      mat-list-item
      role="menuitem"
      routerLinkActive="active"
    >
      <ng-container *ngTemplateOutlet="linkContent"></ng-container>
    </a>

    <ng-template #linkContent>
      <div class="mc-flex-row">
        <mat-icon
          *ngIf="showIcon"
          [class.primary]="color === 'primary'"
          class="icon"
          >{{ entry.icon }}</mat-icon
        >
        <span class="content" [class.primary]="color === 'primary'">{{
          entry.title
        }}</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }

      .content {
        color: white;
      }

      .content.primary {
        color: var(--marmicode-primary-color);
      }

      a.active .content {
        color: var(--marmicode-accent-color);
        cursor: default;
      }

      .icon {
        margin-right: 10px;
      }
    `,
  ],
  imports: [
    NgIf,
    MatListItem,
    NgTemplateOutlet,
    RouterLinkActive,
    RouterLink,
    MatIcon,
  ],
})
export class NavMenuItemComponent {
  @Input() color?: 'primary';
  @Input() entry?: NavMenuEntry;
  @Input() showIcon = true;
}

@NgModule({
  exports: [NavMenuItemComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    NavMenuItemComponent,
  ],
})
export class NavMenuItemModule {}
