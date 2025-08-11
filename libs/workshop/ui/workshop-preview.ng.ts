import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { Workshop } from '@marmicode/workshop/core';
import { workshopViewTransitionName } from './workshop-view-transition-name';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-preview',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    CurrencyPipe,
  ],
  template: `
    <mat-card
      [routerLink]="workshopRouterHelper.detail(workshop().id)"
      class="card"
      role="article"
    >
      <img
        [src]="workshop().thumbnailUri"
        alt="workshop image"
        [style.view-transition-name]="transitionName()"
      />
      <mat-card-content>
        <h3>{{ workshop().title }}</h3>
        <p class="subheading">{{ workshop().subheading }}</p>
        <div class="details">
          <span class="duration">
            <mat-icon>schedule</mat-icon>
            <ng-container [ngPlural]="workshop().duration">
              <ng-template ngPluralCase="=1">1 Day</ng-template>
              <ng-template ngPluralCase="other">
                {{ workshop().duration }} Days
              </ng-template>
            </ng-container>
          </span>
          <span class="price">
            From
            {{ workshop().offer.price | currency: 'EUR' : 'symbol' : '1.0-0' }}
          </span>
        </div>

        <div class="actions">
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

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    h3 {
      font-weight: 700;
      font-size: 24px;
      color: #111827;
      line-height: 1.4;
      margin-bottom: 0.5em;
    }

    .subheading {
      margin-bottom: 0.7em;
      font-size: 1.1em;
      color: #444;
    }

    .details {
      display: flex;
      gap: 2em;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.7em;
      font-size: 1.1em;
      color: var(--marmicode-accent-color);
      font-weight: 500;
      border-radius: 12px;
      padding: 0.4em 1em;
    }
    .duration {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .price {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .actions {
      text-align: center;
    }
  `,
})
export class WorkshopPreview {
  workshop = input.required<Workshop>();

  transitionName = computed(() => workshopViewTransitionName(this.workshop()));
  workshopRouterHelper = workshopRouterHelper;
}
