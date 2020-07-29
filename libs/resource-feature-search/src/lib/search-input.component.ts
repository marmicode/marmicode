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
import { BehaviorSubject } from 'rxjs';

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
      type="text"
    />

    <!-- Reset button. -->
    <button (click)="reset()" mat-icon-button>
      <mat-icon color="primary">clear</mat-icon>
    </button>
  </div>`,
  styles: [
    `
      .search-input-container {
        height: 35px;
        border-radius: 25px;
        background-color: white;
      }

      .search-icon {
        margin-left: 10px;
      }

      .input {
        box-sizing: border-box;
        height: 100%;
        justify-content: center;
        border: none;
        outline: none;
      }
    `,
  ],
  animations: [
    trigger('fullscreen', [
      state(
        'true',
        style({
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: 0,
          height: '64px',
          width: '100vw',
          zIndex: 1,
        })
      ),
      transition('* <=> *', animate(200)),
    ]),
  ],
})
export class SearchInputComponent {
  @Input() control: FormControl;
  @Input() matAutocomplete: MatAutocomplete;
  isFullscreen$ = new BehaviorSubject<boolean>(false);

  reset() {
    this.control.reset();
  }

  onFocus() {
    this.isFullscreen$.next(true);
  }

  onBlur() {
    this.isFullscreen$.next(false);
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
