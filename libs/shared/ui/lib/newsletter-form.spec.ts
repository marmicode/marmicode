import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { NewsletterForm } from './newsletter-form.ng';
import { NEWSLETTER_TAG_IDS, NewsletterSource } from './newsletter-tags';

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

  it('newsletter form tags the subscriber with the source tags', async () => {
    const { getTags } = await mountNewsletterForm({
      source: 'workshop',
      tagIds: { workshop: ['111', '222'] },
    });

    expect(getTags()).toBe('111,222');
  });

  it('newsletter form sends no tags when the source has none', async () => {
    const { getTags } = await mountNewsletterForm({ source: 'home' });

    expect(getTags()).toBeUndefined();
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
  tagIds = {},
}: {
  language?: 'en' | 'fr';
  source?: NewsletterSource;
  tagIds?: Partial<Record<NewsletterSource, string[]>>;
} = {}) {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: NEWSLETTER_TAG_IDS,
        useValue: {
          blog: [],
          coaching: [],
          cohort: [],
          home: [],
          library: [],
          trainings: [],
          workshop: [],
          ...tagIds,
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(NewsletterForm);
  fixture.componentRef.setInput('language', language);
  fixture.componentRef.setInput('source', source);
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
    getTags: () =>
      document.querySelector<HTMLInputElement>('input[name="tags"]')?.value,
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
