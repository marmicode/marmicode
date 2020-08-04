import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { RecipeBlock } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-block',
  template: `🚧 recipe-block`,
})
export class RecipeBlockComponent {
  @Input() block: RecipeBlock;
}

@NgModule({
  declarations: [RecipeBlockComponent],
  exports: [RecipeBlockComponent],
  imports: [CommonModule],
})
export class RecipeBlockModule {}
