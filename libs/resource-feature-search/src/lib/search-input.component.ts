import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

export interface SearchInputOption {
  label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-search-input',
  providers: [RxState],
  template: `
    <div
      class="search-input-container"
      fxLayout="row"
      fxLayoutAlign="center center"
    >
      <!-- Search icon. -->
      <mat-icon class="search-icon" color="primary">search</mat-icon>

      <input
        [formControl]="control$ | async"
        [matAutocomplete]="auto"
        [placeholder]="placeholder"
        aria-label="Search"
        class="input"
        fxFlex
        type="text"
      />

      <!-- Reset button. -->
      <button
        *ngIf="value$ | async"
        (click)="reset$.next()"
        class="reset-button"
        mat-icon-button
      >
        <mat-icon color="primary">clear</mat-icon>
      </button>
    </div>

    <mat-autocomplete #auto="matAutocomplete" [displayWith]="getOptionLabel">
      <mat-option *ngFor="let option of options" [value]="option">
        {{ option.label }}
      </mat-option>
    </mat-autocomplete>
  `,
  styles: [
    `
      .search-input-container {
        position: relative;
        height: 35px;
        border-color: #888;
        border-radius: 25px;
        border-style: solid;
        border-width: 1px;
        background-color: white;
        overflow: hidden;
      }

      .search-icon {
        position: absolute;
        left: 10px;
      }

      .input {
        box-sizing: border-box;
        height: 100%;
        width: 100%;

        /* Use font-size >= 19px to avoid auto-zoom on mobile. */
        font-size: 19px;
        justify-content: center;
        border: none;
        outline: none;

        /* Let some space for search icon and reset button. */
        padding-left: 40px;
        padding-right: 40px;
        text-overflow: ellipsis;
      }

      .reset-button {
        /* Reset button has absolute positioning because we want to be the input
         * as large as possible so the matAutocomplete has the same width. */
        position: absolute;
        right: 0;
      }
    `,
  ],
})
export class SearchInputComponent {
  @Input() set control(control: FormControl) {
    this._state.set({ control });
  }
  @Input() placeholder: string;
  @Input() options: SearchInputOption[];

  control$ = this._state.select('control');
  value$: Observable<string | SearchInputOption>;
  reset$ = new Subject();

  getOptionLabel = (option: SearchInputOption) => option?.label;

  constructor(private _state: RxState<{ control: FormControl }>) {
    this.value$ = this.control$.pipe(
      switchMap((control) => control.valueChanges),
      /* Filter duplicates. */
      distinctUntilChanged()
    );

    /* Reset. */
    this._state.hold(
      this.reset$.pipe(
        withLatestFrom(this.control$),
        tap(([_, control]) => control.reset())
      )
    );
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
