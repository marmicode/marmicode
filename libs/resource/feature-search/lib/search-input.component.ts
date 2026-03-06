import { Skill } from './skill';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PushPipe } from '@rx-angular/template/push';
import { MatOption } from '@angular/material/core';

export interface SearchInputOption {
  label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-search-input',
  providers: [RxState],
  template: `
    <div class="search-input-container">
      <!-- Search icon. -->
      <mat-icon class="search-icon" color="primary">search</mat-icon>
    
      <input
        [formControl]="control$ | push"
        [matAutocomplete]="auto"
        [placeholder]="placeholder"
        aria-label="Search"
        class="input"
        type="text"
        />
    
      <!-- Reset button. -->
      @if (value$ | push) {
        <button
          (click)="reset$.next()"
          class="reset-button"
          mat-icon-button
          >
          <mat-icon color="primary">clear</mat-icon>
        </button>
      }
    </div>
    
    <mat-autocomplete #auto="matAutocomplete" [displayWith]="getOptionLabel">
      @for (option of options; track option) {
        <mat-option [value]="option">
          {{ option.label }}
        </mat-option>
      }
    </mat-autocomplete>
    `,
  styles: [
    `
      .search-input-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;

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
        flex: 1;

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
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatIconButton,
    MatAutocomplete,
    MatOption,
    PushPipe
],
})
export class SearchInputComponent {
  private _state = inject<RxState<{
    control: FormControl<Skill | string | null>;
  }>>(RxState);

  @Input() set control(control: FormControl<Skill | string | null>) {
    this._state.set({ control });
  }
  @Input() placeholder!: string;
  @Input() options!: SearchInputOption[];

  control$ = this._state.select('control');
  value$: Observable<string | SearchInputOption | null>;
  reset$ = new Subject<void>();

  getOptionLabel = (option: SearchInputOption) => option?.label;

  constructor() {
    this.value$ = this.control$.pipe(
      switchMap((control) => control.valueChanges),
      /* Filter duplicates. */
      distinctUntilChanged(),
    );

    /* Reset. */
    this._state.hold(
      this.reset$.pipe(
        withLatestFrom(this.control$),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap(([_, control]) => control.reset()),
      ),
    );
  }
}

@NgModule({
  exports: [SearchInputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    PushPipe,
    ReactiveFormsModule,
    SearchInputComponent,
  ],
})
export class SearchInputModule {}
