import { ISpriteProperties } from '@amcharts/amcharts4/core';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Amcore } from './amcore.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-tree',
  template: `<div #container></div>`,
})
export class TreeComponent implements OnDestroy, OnInit {
  @ViewChild('container', { static: true }) containerEl: ElementRef;

  private _subscription: Subscription;

  constructor(private _amcore: Amcore) {}

  ngOnInit() {
    this._subscription = this._amcore
      .createFromConfig({
        element: this.containerEl.nativeElement,
        config: {
          series: [
            {
              type: 'ForceDirectedSeries',
              data: [
                {
                  id: 'a',
                  name: 'A',
                  value: 1,
                },
                {
                  id: 'b',
                  name: 'B',
                  value: 1,
                  linkWith: 'a',
                },
              ],
              dataFields: {
                id: 'id',
                name: 'name',
                value: 'value',
                children: 'children',
                fixed: 'fixed',
                linkWith: 'linkWith',
              },
              links: {
                strokeWidth: 10,
                distance: 2,
              },
              nodes: {
                label: {
                  fontSize: '1em',
                  text: '{name}',
                },
              } as ISpriteProperties,
            },
          ],
        },
      })
      .subscribe();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}

// tooltipText = "{name}";
// fillOpacity = 1;
// propertyFields.x = "x";
// propertyFields.y = "y";
// label.fontSize = '1em';
// label.text = "{name}";
// events.on('hit', (e) => console.log(e.target.dataItem.dataContext))
// label.hideOversized = true;
// label.truncate = true;
// outerCircle.__disabled = false;
// outerCircle.disabled = false;
// outerCircle.visible = true;
//
// networkSeries.links.template.strokeWidth = 20;
// networkSeries.links.template.tooltipText = "test";
// networkSeries.links.template.distance = 2;

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}
