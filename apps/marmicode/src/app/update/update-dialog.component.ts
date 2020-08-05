import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-update-dialog',
  template: `🚧 update-dialog`,
})
export class UpdateDialogComponent {}

@NgModule({
  declarations: [UpdateDialogComponent],
  exports: [UpdateDialogComponent],
  imports: [CommonModule],
})
export class UpdateDialogModule {}
