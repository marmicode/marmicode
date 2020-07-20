import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Resource } from './resource';
import { ResourceCardModule } from './resource-card.component';
import { ResourceType } from './resource-type';

const yourAngularModuleIsAScam: Resource = {
  author: {
    name: 'Younes Jaaidi',
    pictureUri: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  },
  pictureUri: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  summary: `The Shiba Inu is the smallest of the six original and distinct spitz
          breeds of dog from Japan. A small, agile dog that copes very well with
          mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  title: 'Your Angular Module is a SCAM!',
  type: ResourceType.BlogPost,
  skills: ['Moduleless Angular', 'SCAM: Single Component Angular Module'],
  requiredSkills: ['Angular Modules', 'Angular Lazy Loading'],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <section fxLayout="row wrap" fxLayoutAlign="center">
      <mc-resource-card
        *ngFor="let resource of resources"
        [resource]="resource"
        class="mc-resource-card"
      ></mc-resource-card>
    </section>
  `,
  styles: [
    `
      .mc-resource-card {
        margin: 20px;
      }
    `,
  ],
})
export class ResourceSearchComponent {
  resources: Resource[] = [
    yourAngularModuleIsAScam,
    yourAngularModuleIsAScam,
    yourAngularModuleIsAScam,
    yourAngularModuleIsAScam,
  ];
}

@NgModule({
  declarations: [ResourceSearchComponent],
  exports: [ResourceSearchComponent],
  imports: [CommonModule, ResourceCardModule, FlexLayoutModule],
})
export class ResourceSearchModule {}
