import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { NewsletterForm } from './newsletter-form.ng';
import { NewsletterSource } from './newsletter-source';

describe(NewsletterForm.name, () => {
  it('newsletter form disables subscribing until the email is valid', async () => {
    const { isSubscribeDisabled, typeEmail } = await mountNewsletterForm();

    expect(isSubscribeDisabled()).toBe(true);

    await typeEmail('kitchen@');
    expect(isSubscribeDisabled()).toBe(true);

    await typeEmail('kitchen@marmicode.io');
    expect(isSubscribeDisabled()).toBe(false);
  });

  it('newsletter form posts to mailchimp in a new tab', async () => {
    const { getForm } = await mountNewsletterForm();

    expect(getForm()).toEqual({
      action:
        'https://marmicode.us3.list-manage.com/subscribe/post?u=915d6ba70c9c00912ba326214&id=71255f30c7&f_id=00dbc1e5f0',
      method: 'post',
      target: '_blank',
      emailFieldName: 'EMAIL',
    });
  });

  it('newsletter form sends where the subscriber signed up as context', async () => {
    const { getContext } = await mountNewsletterForm({ source: 'home' });

    expect(getContext()).toBe('website:home');
  });

  it('newsletter form sends the workshop id as context', async () => {
    const { getContext } = await mountNewsletterForm({
      source: 'workshop',
      sourceId: 'charted-coding-fr',
    });

    expect(getContext()).toBe('website:workshop:charted-coding-fr');
  });

  it('newsletter form speaks french', async () => {
    const { getSubscribeLabel } = await mountNewsletterForm({
      language: 'fr',
    });

    expect(getSubscribeLabel()).toBe("S'abonner");
  });
});

async function mountNewsletterForm({
  language = 'en',
  source = 'home',
  sourceId,
}: {
  language?: 'en' | 'fr';
  source?: NewsletterSource;
  sourceId?: string;
} = {}) {
  const fixture = TestBed.createComponent(NewsletterForm);
  fixture.componentRef.setInput('language', language);
  fixture.componentRef.setInput('source', source);
  fixture.componentRef.setInput('sourceId', sourceId);
  await fixture.whenStable();

  const getEmailInput = () =>
    document.querySelector<HTMLInputElement>('input[type="email"]');

  return {
    isSubscribeDisabled: () =>
      document.querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.disabled,
    typeEmail: async (email: string) => {
      const input = getEmailInput();
      if (input == null) {
        throw new Error('Email input not found.');
      }
      input.value = email;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
    },
    getSubscribeLabel: () =>
      document
        .querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.textContent?.trim(),
    getContext: () =>
      document.querySelector<HTMLInputElement>('input[name="CONTEXT"]')?.value,
    getForm: () => {
      const form = document.querySelector('form');
      return {
        action: form?.getAttribute('action'),
        method: form?.getAttribute('method'),
        target: form?.getAttribute('target'),
        emailFieldName: getEmailInput()?.name,
      };
    },
  };
}
