import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import cookPictureUri from './cook.webp';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cook-card',
  imports: [MatCard, MatCardContent],
  template: ` <mat-card class="card">
    <img
      [src]="cookPictureUri"
      mat-card-image
      height="300"
      alt="Photo of Younes Jaaidi"
    />
    <mat-card-content>
      <h3>Younes Jaaidi</h3>
      <p>
        Younes Jaaidi is a Software Cook who enjoys whipping code until tests
        pass.
      </p>
      <p>
        <b>Born in the kitchen of eXtreme Programming over 15 years ago</b>, he
        now teaches and coaches teams — like yours — to cook better software
        using ingredients such as Test-Driven Development, and Collective
        Ownership.
      </p>
      <p>
        He's also an <b>Angular Google Developer Expert</b>, an
        <b>NX Champion</b>, and a mediocre sailor.
      </p>
    </mat-card-content>
  </mat-card>`,
  styles: `
    .card {
      margin: auto;
      overflow: hidden;
      width: min(100%, 500px);
    }

    img {
      object-fit: cover;
      object-position: 0% 20%;
    }

    h3 {
      font-weight: 700;
      font-size: 24px; /* Adjust depending on context */
      color: #111827; /* near-black */
      line-height: 1.4;
      margin-top: 1rem;
      text-align: center;
    }

    p {
      font-weight: 400;
      font-size: 16px;
      color: #6b7280; /* dark gray */
      line-height: 1.6;
    }
  `,
})
export class CookCard {
  cookPictureUri = cookPictureUri;
}
