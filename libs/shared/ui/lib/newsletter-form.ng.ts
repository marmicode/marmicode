import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { externalLinks } from '@marmicode/shared/router-helpers';
import { Button } from './button.ng';
import { NEWSLETTER_TAG_IDS, NewsletterSource } from './newsletter-tags';

/**
 * Email input posting straight to Mailchimp in a new tab, like the cookbook's.
 * Tags the subscriber with the `source`'s Mailchimp tags.
 * Submitting stays disabled until the email is valid.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-newsletter-form',
  imports: [Button],
  template: `
    <form
      #form
      [attr.aria-label]="labels().form"
      method="post"
      rel="noopener"
      target="_blank"
      [action]="newsletterForm.action"
      (input)="isValid.set(form.checkValidity())"
    >
      <!-- Mailchimp's bot trap: humans never see nor fill it. -->
      <div aria-hidden="true" class="honeypot">
        <input
          readonly
          tabindex="-1"
          type="text"
          value=""
          [name]="newsletterForm.honeypotName"
        />
        @if (tags(); as tags) {
          <input name="tags" type="hidden" [value]="tags" />
        }
      </div>
      <input
        autocomplete="email"
        name="EMAIL"
        [attr.aria-label]="labels().email"
        placeholder="i-am@curious.dev"
        required
        type="email"
      />
      <button mcButton type="submit" [disabled]="!isValid()">
        {{ labels().subscribe }}
      </button>
      <small class="hint">{{ labels().hint }}</small>
    </form>
  `,
  styles: `
    :host {
      display: block;
      flex: 0 1 420px;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .honeypot {
      position: absolute;
      left: -5000px;
    }

    input[type='email'] {
      flex: 1 1 200px;
      box-sizing: border-box;
      min-width: 0;
      padding: 12px 14px;
      border: 1px solid var(--mc-dark-line);
      border-radius: 12px;
      outline: none;
      background: var(--mc-dark-bg);
      color: var(--mc-dark-text);
      font: inherit;
      font-size: 15px;
      transition: border-color 0.2s;
    }

    input[type='email']::placeholder {
      color: var(--mc-dark-muted);
    }

    input[type='email']:focus {
      border-color: rgba(var(--mc-accent-rgb), 0.6);
    }

    button {
      flex: none;
    }

    .hint {
      flex-basis: 100%;
      color: var(--mc-dark-muted);
      font-size: 12.5px;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `,
})
export class NewsletterForm {
  source = input.required<NewsletterSource>();
  language = input<'en' | 'fr'>('en');

  protected readonly newsletterForm = externalLinks.newsletterForm;
  protected readonly isValid = signal(false);
  protected readonly labels = computed(() => LABELS[this.language()]);
  /* Comma-separated Mailchimp tag IDs, or undefined when the source has none. */
  protected readonly tags = computed(
    () => this._tagIds[this.source()].join(',') || undefined,
  );

  private _tagIds = inject(NEWSLETTER_TAG_IDS);
}

const LABELS = {
  en: {
    form: 'Newsletter registration form',
    email: 'Email address',
    subscribe: 'Subscribe',
    hint: 'About one email a month. Unsubscribe anytime.',
  },
  fr: {
    form: "Formulaire d'inscription à la newsletter",
    email: 'Adresse e-mail',
    subscribe: "S'abonner",
    hint: 'Environ un e-mail par mois. Désinscription à tout moment.',
  },
};
