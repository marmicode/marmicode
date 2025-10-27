import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-luma-events',
  template: `<iframe
    [src]="iframeUrl()"
    width="100%"
    height="450"
    frameborder="0"
    style="border: 0;"
    allowfullscreen=""
    aria-hidden="false"
    tabindex="0"
  ></iframe>`,
})
export class LumaEvents {
  tag = input.required<string>();

  protected iframeUrl = computed(() =>
    this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://luma.com/embed/calendar/cal-2eC1KNf0fJvuxXY/events?lt=light&tag=${encodeURIComponent(this.tag())}`,
    ),
  );

  private _sanitizer = inject(DomSanitizer);
}
