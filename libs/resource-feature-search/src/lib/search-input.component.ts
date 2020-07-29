import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-search-input',
  template: ` <mat-icon class="search-icon" color="primary">search</mat-icon>
    <input
      [formControl]="control"
      [matAutocomplete]="matAutocomplete"
      aria-label="Search"
      class="search-input"
      fxFlex
      type="text"
    />
    <button (click)="reset()" mat-icon-button>
      <mat-icon color="primary">clear</mat-icon>
    </button>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 35px;
        background-color: white;
        border-radius: 25px;
      }

      .search-icon {
        margin-left: 10px;
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
export class SearchInputComponent {
  @Input() control: FormControl;
  @Input() matAutocomplete: MatAutocomplete;

  reset() {
    this.control.reset();
  }
}

@NgModule({
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
  imports: [
    CommonModule,
    FlexModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
})
export class SearchInputModule {}
