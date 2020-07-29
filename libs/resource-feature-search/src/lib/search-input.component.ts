import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-search-input',
  template: ` <div
    class="search-input-container"
    fxLayout="row"
    fxLayoutAlign="center center"
  >
    <!-- Search icon. -->
    <mat-icon class="search-icon" color="primary">search</mat-icon>

    <input
      [formControl]="control"
      [matAutocomplete]="matAutocomplete"
      aria-label="Search"
      class="input"
      fxFlex
      type="text"
    />

    <!-- Reset button. -->
    <button
      *ngIf="control.value"
      (click)="reset()"
      class="reset-button"
      mat-icon-button
    >
      <mat-icon color="primary">clear</mat-icon>
    </button>
  </div>`,
  styles: [
    `
      .search-input-container {
        position: relative;
        height: 35px;
        border-radius: 25px;
        background-color: white;
        overflow: hidden;
        width: 250px;
      }

      .search-icon {
        margin-left: 10px;
      }

      .input {
        box-sizing: border-box;
        height: 100%;
        /* Use font-size >= 18px to avoid auto-zoom on mobile. */
        font-size: 19px;
        justify-content: center;
        border: none;
        outline: none;
      }

      .reset-button {
        position: absolute;
        right: 0;
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
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class SearchInputModule {}