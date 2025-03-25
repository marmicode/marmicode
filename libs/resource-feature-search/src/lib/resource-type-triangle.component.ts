import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import {
  ResourceType,
  getResourceTypeColor,
  getResourceTypeText,
} from '@marmicode/resource-core';
import { TriangleModule } from '@marmicode/shared-ui';
import { TriangleComponent } from '@marmicode/shared-ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-type-triangle',
  template: `<mc-triangle [color]="color">{{ text }}</mc-triangle>`,
  imports: [TriangleComponent],
})
export class ResourceTypeTriangleComponent implements OnChanges {
  @Input() resourceType: ResourceType;
  color: string;
  text: string;

  ngOnChanges() {
    this.color = getResourceTypeColor(this.resourceType);
    this.text = getResourceTypeText(this.resourceType);
  }
}

@NgModule({
  exports: [ResourceTypeTriangleComponent],
  imports: [CommonModule, TriangleModule, ResourceTypeTriangleComponent],
})
export class ResourceTypeTriangleModule {}
