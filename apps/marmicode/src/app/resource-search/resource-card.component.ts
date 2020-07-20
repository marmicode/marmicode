import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card',
  template: `<mat-card>
    <img
      class="mc-resource-card-image"
      mat-card-image
      src="https://material.angular.io/assets/img/examples/shiba2.jpg"
      alt="Photo of a Shiba Inu"
    />

    <mat-card-header>
      <img
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
        mat-card-avatar
      />
      <mat-card-title>Your Angular Module is a SCAM!</mat-card-title>
      <mat-card-subtitle>by Younes Jaaidi</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <p>
        The Shiba Inu is the smallest of the six original and distinct spitz
        breeds of dog from Japan. A small, agile dog that copes very well with
        mountainous terrain, the Shiba Inu was originally bred for hunting.
      </p>
    </mat-card-content>

    <mat-card-actions>
      <button mat-raised-button color="primary">READ</button>
    </mat-card-actions>
  </mat-card>`,
  styles: [
    `
      :host {
        display: block;
        max-width: 600px;
      }

      .mc-resource-card-image {
        height: 200px;
        object-fit: cover;
      }
    `,
  ],
})
export class ResourceCardComponent {}

@NgModule({
  declarations: [ResourceCardComponent],
  exports: [ResourceCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class ResourceCardModule {}
