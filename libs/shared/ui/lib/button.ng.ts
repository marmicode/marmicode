import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * `<a mcButton>` / `<button mcButton="ghost">`: gradient primary or outlined ghost.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'a[mcButton], button[mcButton]',
  template: `<ng-content />`,
})
export class Button {
  variant = input('primary', {
    alias: 'mcButton',
    transform: (v: '' | 'primary' | 'ghost') => v || 'primary',
  });
}
