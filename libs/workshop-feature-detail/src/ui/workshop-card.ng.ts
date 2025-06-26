import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-card',
  imports: [MatCardModule, MatIconModule],
  template: ` <mat-card class="card">
    <mat-card-content class="content">
      @if (icon()) {
        <div class="icon-container">
          <mat-icon class="icon" color="primary" [fontIcon]="icon()"></mat-icon>
        </div>
      }
      <h3>
        <ng-content select="[slot='title']" />
      </h3>
      <ng-content select="[slot='content']" />
    </mat-card-content>
  </mat-card>`,
  styles: `
    .card {
      width: min(500px, 90vw);
      min-height: 150px;
      text-align: center;
      transition: box-shadow 0.3s ease-in-out;

      &:hover {
        box-shadow:
          rgba(0, 0, 0, 0.25) 0px 3px 3px -1px,
          rgba(0, 0, 0, 0.2) 0px 5px 10px 0px;
      }
    }

    .icon-container {
      margin: auto;
      background-color: rgba(121, 34, 108, 0.3);
      width: 50px;
      height: 50px;
      border-radius: 12px;
      margin-bottom: 0.5rem;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      margin: auto;
      transform: scale(1.2);
    }

    h3 {
      font-weight: 700;
      font-size: 24px;
      color: #111827;
      line-height: 1.4;
      margin-bottom: 0.5em;
    }

    .content {
      font-weight: 400;
      font-size: 1.3em;
      color: #6b7280;
      line-height: 1.6;
      margin: auto;
    }
  `,
})
export class WorkshopCard {
  icon = input<string>();
}
