import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-card',
  imports: [MatCardModule, MatIconModule],
  template: ` <mat-card class="card">
    <div class="title">
      <div class="box"></div>
      <h3>
        <ng-content select="[slot='title']" />
      </h3>
      @if (icon()) {
        <div class="icon-container">
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
      overflow: hidden;
      height: 100%;
      min-height: 150px;
      width: min(500px, 90vw);
      text-align: center;
      transition: box-shadow 0.3s ease-in-out;

      &:hover {
        box-shadow:
          rgba(0, 0, 0, 0.25) 0px 3px 3px -1px,
          rgba(0, 0, 0, 0.2) 0px 5px 10px 0px;
      }
    }

    .box {
      background: linear-gradient(
        60deg,
        #380030,
        var(--marmicode-accent-color)
      );
      opacity: 0.8;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
    }

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
    }

    .icon-container {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-bottom: 0.5rem;
      border: 1px solid #e3cff0;

      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .icon {
      margin: auto;
      transform: scale(2.3);
    }

    h3 {
      font-weight: 700;
      font-size: 24px;
      color: white;
      line-height: 1.4;
      margin-bottom: 0.5em;
      z-index: 1;
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
}
