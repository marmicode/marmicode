import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ResourceType,
  resourceTypeColorMap,
  resourceTypeTextMap,
} from './resource-type';
import { ResourceCardTriangleModule } from './triangle.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-type-triangle',
  template: `<mc-triangle [color]="color">{{ text }}</mc-triangle>`,
})
export class ResourceTypeTriangleComponent implements OnChanges {
  @Input() resourceType: ResourceType;
  color: string;
  text: string;

  ngOnChanges() {
    this.color = resourceTypeColorMap.get(this.resourceType);
    this.text = resourceTypeTextMap.get(this.resourceType);
  }
}

@NgModule({
  declarations: [ResourceTypeTriangleComponent],
  exports: [ResourceTypeTriangleComponent],
  imports: [CommonModule, ResourceCardTriangleModule],
})
export class ResourceTypeTriangleModule {}
