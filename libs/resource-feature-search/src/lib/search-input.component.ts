import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-search-input',
  template: ` <mat-icon color="primary">search</mat-icon>
    <input class="search-input" fxFlex type="text" />
    <mat-icon color="primary">clear</mat-icon>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 35px;
        width: 260px;
        background-color: white;
        border-radius: 25px;
        padding: 0 15px;
      }

      .search-input {
        box-sizing: border-box;
        height: 100%;
        justify-content: center;
        border: none;
        outline: none;
      }
    `,
  ],
})
export class SearchInputComponent {}

@NgModule({
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
  imports: [CommonModule, MatIconModule, FlexModule],
})
export class SearchInputModule {}
