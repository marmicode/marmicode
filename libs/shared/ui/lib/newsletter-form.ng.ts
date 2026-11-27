import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { externalLinks } from '@marmicode/shared/router-helpers';
import { Button } from './button.ng';

/**
 * Email input posting straight to Mailchimp in a new tab, like the cookbook's.
 * Submitting stays disabled until the email is valid.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-newsletter-form',
  imports: [Button],
  template: `
    <form
      #form
      aria-label="Newsletter registration form"
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
      </div>
      <input
        aria-label="Email address"
        autocomplete="email"
        name="EMAIL"
        placeholder="i-am@curious.dev"
        required
        type="email"
      />
      <button mcButton type="submit" [disabled]="!isValid()">Subscribe</button>
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

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `,
})
export class NewsletterForm {
  protected readonly newsletterForm = externalLinks.newsletterForm;
  protected readonly isValid = signal(false);
}
