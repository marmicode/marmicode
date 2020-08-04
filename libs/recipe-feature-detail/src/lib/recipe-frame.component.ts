import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { BlockModule } from './block/block.component';
import { RecipeFrame } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-frame',
  template: `
    <div fxLayout="column" fxLayout.gt-sm="row">
      <mc-recipe-block
        *ngFor="let block of frame.blocks"
        [block]="block"
        fxFlex
      ></mc-recipe-block>
    </div>
  `,
})
export class RecipeFrameComponent {
  @Input() frame: RecipeFrame;
}

@NgModule({
  declarations: [RecipeFrameComponent],
  exports: [RecipeFrameComponent],
  imports: [CommonModule, FlexModule, BlockModule],
})
export class RecipeFrameModule {}
