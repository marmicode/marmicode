import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { PageModule } from '@marmicode/shared-ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail',
  template: `<mc-page></mc-page>`,
})
export class RecipeDetailComponent implements OnInit {
  ngOnInit() {
    // @todo redirect to player
  }
}

@NgModule({
  declarations: [RecipeDetailComponent],
  exports: [RecipeDetailComponent],
  imports: [CommonModule, PageModule],
})
export class RecipeDetailModule {}
