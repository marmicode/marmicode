import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export interface NavMenuEntry {
  icon: string;
  title: string;
  url: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu-item',
  template: ` <a
    [href]="entry.url"
    class="nav-menu-link"
    mat-list-item
    role="menuitem"
    target="_blank"
  >
    <mat-icon [class.mc-primary-text]="color === 'primary'" class="icon">{{
      entry.icon
    }}</mat-icon>
    <span [class.mc-primary-text]="color === 'primary'">{{ entry.title }}</span>
  </a>`,
  styles: [
    `
      .nav-menu-link {
        color: white;
      }

      .icon {
        margin-right: 10px;
      }
    `,
  ],
})
export class NavMenuItemComponent {
  @Input() color: 'primary' | null;
  @Input() entry: NavMenuEntry;
}

@NgModule({
  declarations: [NavMenuItemComponent],
  exports: [NavMenuItemComponent],
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class NavMenuItemModule {}
