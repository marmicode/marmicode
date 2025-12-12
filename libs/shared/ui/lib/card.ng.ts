import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Link } from './link.component';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-card',
  imports: [MatCardModule, MatIconModule],
  template: ` <mat-card
    [class.clickable]="link()"
    (click)="goToLink($event)"
    class="card"
  >
    <div class="header" [class.has-icon]="icon() != null">
      <h3 class="title zoom-on-card-hover">
        <ng-content select="[slot='title']" />
      </h3>
      @if (icon()) {
        <div class="icon-container zoom-on-card-hover">
          <mat-icon class="icon" color="primary" [fontIcon]="icon()"></mat-icon>
        </div>
      }
    </div>
    <mat-card-content class="content">
      <ng-content select="[slot='content']" />
    </mat-card-content>
  </mat-card>`,
  styles: `
    .card {
      height: 100%;
      min-height: 150px;
      width: min(500px, 90vw);
      text-align: center;
      transition: box-shadow 0.2s ease-in-out;
      overflow: hidden;

      &:hover {
        box-shadow:
          rgba(0, 0, 0, 0.25) 0px 3px 3px -1px,
          rgba(0, 0, 0, 0.2) 0px 5px 10px 0px;
      }

      &:hover .zoom-on-card-hover {
        transform: scale(1.1);
      }
    }

    .clickable {
      cursor: pointer;
    }

    .header {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      background: color-mix(
        in srgb,
        var(--marmicode-primary-color) 75%,
        transparent
      );

      padding: 1rem 0;
      margin-bottom: 1rem;
    }

    .header.has-icon {
      padding: 2rem 0 3rem 0;
      margin-bottom: 45px;

      background: linear-gradient(135deg, #6a125dc4 0%, #53e0d9 100%);
    }

    .icon-container {
      position: absolute;
      bottom: -35px;
      width: 70px;
      height: 70px;

      border-radius: 50%;
      border: 1px solid #4a7a82;
      background: white;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .title,
    .icon-container {
      transition: transform 0.2s ease-in-out;
    }

    .icon {
      margin: auto;
      transform: scale(2.3);
    }

    .title {
      color: white;
      font-weight: 700;
      font-size: 24px;
      line-height: 1.4;
      margin: 0;
    }

    .content {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      font-weight: 400;
      font-size: 1.3em;
      color: #6b7280;
      line-height: 1.6;
      margin: auto;
    }
  `,
})
export class Card {
  icon = input<string>();
  link = input<Link>();

  private _router = inject(Router);
  private _window = inject(DOCUMENT).defaultView;

  goToLink(event: MouseEvent) {
    const link = this.link();
    if (link == null) {
      return;
    }

    if ('href' in link) {
      this._window.open(link.href, '_blank', 'noopener');
    } else if ('route' in link) {
      this._router.navigate(link.route);
    }
  }
}
