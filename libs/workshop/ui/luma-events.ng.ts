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
    height="650"
    frameborder="0"
    style="border: 0;"
    allowfullscreen=""
    aria-hidden="false"
    tabindex="0"
  ></iframe>`,
})
export class LumaEvents {
  tag = input<string>();

  protected iframeUrl = computed(() => {
    const url = new URL(
      'https://luma.com/embed/calendar/cal-2eC1KNf0fJvuxXY/events',
    );
    url.searchParams.set('lt', 'light');
    const tag = this.tag();
    if (tag != null && tag.length > 0) {
      url.searchParams.set('tag', encodeURIComponent(tag));
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(url.toString());
  });

  private _sanitizer = inject(DomSanitizer);
}
