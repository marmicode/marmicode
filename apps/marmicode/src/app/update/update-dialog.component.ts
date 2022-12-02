import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgModule,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-update-dialog',
  template: `<h1 mat-dialog-title>New version available</h1>
    <div mat-dialog-content>
      <p>Marmicode has been updated, are you ready to reload?</p>
    </div>
    <div class="actions" mat-dialog-actions cdkTrapFocus>
      <button mat-button mat-dialog-close>LATER</button>
      <button
        (click)="update()"
        mat-raised-button
        color="primary"
        cdkFocusInitial
      >
        RELOAD
      </button>
    </div>`,
  styles: [
    `
      .actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    `,
  ],
})
export class UpdateDialogComponent {
  constructor(
    private _swUpdate: SwUpdate,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  async update() {
    await this._swUpdate.activateUpdate();
    this._document.location.reload();
  }
}

@NgModule({
  declarations: [UpdateDialogComponent],
  exports: [UpdateDialogComponent],
  imports: [A11yModule, CommonModule, MatButtonModule, MatDialogModule],
})
export class UpdateDialogModule {}
