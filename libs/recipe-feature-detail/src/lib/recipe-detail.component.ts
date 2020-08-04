import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail',
  template: `🚧 recipe-detail`,
})
export class RecipeDetailComponent {}

@NgModule({
  declarations: [RecipeDetailComponent],
  exports: [RecipeDetailComponent],
  imports: [CommonModule],
})
export class RecipeDetailModule {}
