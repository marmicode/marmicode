import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

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
      <mat-icon
        *ngIf="showIcon"
        [class.mc-primary-text]="color === 'primary'"
        class="icon"
        >{{ entry.icon }}</mat-icon
      >
      <span class="content" [class.mc-primary-text]="color === 'primary'">{{
        entry.title
      }}</span>
    </ng-template>
  `,
  styles: [
    `
        .content {
            color: white;
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
})
export class NavMenuItemComponent {
  @Input() color?: 'primary';
  @Input() entry?: NavMenuEntry;
  @Input() showIcon = true;
}

@NgModule({
  declarations: [NavMenuItemComponent],
  exports: [NavMenuItemComponent],
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
})
export class NavMenuItemModule {}
