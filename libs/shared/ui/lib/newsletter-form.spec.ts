import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { NewsletterForm } from './newsletter-form.ng';

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
});

async function mountNewsletterForm() {
  const fixture = TestBed.createComponent(NewsletterForm);
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
