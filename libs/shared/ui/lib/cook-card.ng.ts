import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import cookPictureUri from './cook.webp';
import gdePictureUri from './gde.webp';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cook-card',
  imports: [MatCard, MatCardContent],
  template: ` <mat-card class="card">
    <div class="picture-container">
      <img
        [src]="cookPictureUri"
        class="cook-picture"
        mat-card-image
        alt="Younes Jaaidi wearing a red apron and holding wooden cooking spoons, standing in a kitchen-themed setup with jars of fairy lights and programming stickers (JavaScript, TypeScript, Angular, Nx, RxJS) on a shelf behind him."
        height="400"
      />
      <div class="badge-container">
        <img [src]="gdePictureUri" alt="Google Developer Expert badge" />
      </div>
    </div>
    <mat-card-content>
      <h3>Younes Jaaidi</h3>
      <p>I am a Software Cook who enjoys whipping code until tests pass.</p>
      <p>
        <b>With nearly 20 years of experience in eXtreme Programming</b>, I've
        coached dozens of teams and trained thousands of developers to cook
        robust and maintainable software — using <b>Test-Driven Development</b>,
        <b>pragmatic testing strategies</b>, and a healthy dose of
        <b>Collective Ownership</b>.
      </p>

      <p>
        I'm also an <b>Angular Google Developer Expert</b>, an
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

    .picture-container {
      position: relative;
      height: 400px;
    }

    .cook-picture {
      object-fit: cover;
      object-position: 0% 20%;
    }

    .badge-container {
      position: absolute;
      height: 70px;
      width: 100%;
      bottom: 0;
      background-color: rgba(32, 52, 75, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 100%;
      }
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
      text-align: justify;
    }
  `,
})
export class CookCard {
  cookPictureUri = cookPictureUri;
  gdePictureUri = gdePictureUri;
}
