import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Workshop } from '@marmicode/workshop/core';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { CommonModule } from '@angular/common';
import { workshopViewTransitionName } from './workshop-view-transition-name';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-preview',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CurrencyPipe,
  ],
  template: `
    <mat-card
      [routerLink]="workshopRouterHelper.detail(workshop().id)"
      class="card"
      role="article"
      style="width: min(500px, 90vw); overflow: hidden;"
    >
      <img
        [src]="workshop().thumbnailUri"
        alt="workshop image"
        style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 1rem;"
        [style.view-transition-name]="transitionName()"
      />
      <mat-card-content>
        <h3
          style="font-weight: 700; font-size: 24px; color: #111827; line-height: 1.4; margin-bottom: 0.5em;"
        >
          {{ workshop().title }}
        </h3>
        <div style="margin-bottom: 0.7em; font-size: 1.1em; color: #444;">
          {{ workshop().subheading }}
        </div>
        <div
          style="display: flex; gap: 2em; justify-content: center; align-items: center; margin-bottom: 0.7em; font-size: 1.1em; color: var(--marmicode-accent-color); font-weight: 500; border-radius: 12px; padding: 0.4em 1em;"
        >
          <span style="display: flex; align-items: center; gap: 0.5em;">
            <mat-icon>schedule</mat-icon>
            <ng-container [ngPlural]="workshop().duration">
              <ng-template ngPluralCase="=1">1 Day</ng-template>
              <ng-template ngPluralCase="other">
                {{ workshop().duration }} Days
              </ng-template>
            </ng-container>
          </span>
          <span style="display: flex; align-items: center; gap: 0.5em;">
            From
            {{ workshop().offer.price | currency: 'EUR' : 'symbol' : '1.0-0' }}
          </span>
        </div>
        <div style="text-align: center;">
          <a
            [routerLink]="workshopRouterHelper.detail(workshop().id)"
            mat-button
            color="primary"
            >VIEW DETAILS</a
          >
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .card {
      cursor: pointer;
    }
  `,
})
export class WorkshopPreview {
  workshop = input.required<Workshop>();

  transitionName = computed(() => workshopViewTransitionName(this.workshop()));
  workshopRouterHelper = workshopRouterHelper;
}
