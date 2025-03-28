import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgModule,
} from '@angular/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { CdkScrollable } from '@angular/cdk/scrolling';

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
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    CdkTrapFocus,
    MatButton,
    MatDialogClose,
  ],
})
export class UpdateDialogComponent {
  constructor(
    private _swUpdate: SwUpdate,
    @Inject(DOCUMENT) private _document: Document,
  ) {}

  update() {
    /* @hack Can't use async/await.
     * Because we get the following error with Angular build + Yarn PnP:
     * Module not found: Error: Can't resolve: @angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */
    this._swUpdate.activateUpdate().then(() => {
      this._document.location.reload();
    });
  }
}

@NgModule({
  exports: [UpdateDialogComponent],
  imports: [
    A11yModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    UpdateDialogComponent,
  ],
})
export class UpdateDialogModule {}
