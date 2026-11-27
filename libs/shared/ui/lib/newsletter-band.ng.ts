import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CtaBand } from './cta-band.ng';
import { NewsletterForm } from './newsletter-form.ng';
import { NewsletterSource } from './newsletter-tags';

/**
 * Newsletter call-to-action band: the page's own heading and description, then the email form.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-newsletter-band',
  imports: [CtaBand, NewsletterForm],
  template: `
    <mc-cta-band [description]="description()" [heading]="heading()">
      <mc-newsletter-form
        ctaAction
        [language]="language()"
        [source]="source()"
      />
    </mc-cta-band>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class NewsletterBand {
  heading = input.required<string>();
  description = input.required<string>();
  source = input.required<NewsletterSource>();
  language = input<'en' | 'fr'>('en');
}
