import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-search-input',
  template: ` <div class="search">
    <span class="material-icons search-icon">
      search
    </span>
    <input type="text" class="search-input" />
    <span class="material-icons clear-icon">
      clear
    </span>
  </div>`,
  styles: [
    `
      .search {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 35px;
        width: 260px;
        background-color: white;
        border-radius: 25px;
      }

      .search-icon {
        color: black;
        padding-left: 15px;
      }
      .search-input {
        display: flex;
        margin: auto;
        padding: auto;
        justify-content: center;
        height: 20px;
        border: none;
      }

      .clear-icon {
        color: black;
        padding-right: 15px;
      }
    `,
  ],
})
export class SearchInputComponent {}

@NgModule({
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
  imports: [CommonModule],
})
export class SearchInputModule {}
