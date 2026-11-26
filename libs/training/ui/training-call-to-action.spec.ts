import { inputBinding, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Training } from '@marmicode/training/core';
import { describe, expect, it } from 'vitest';
import { TrainingCallToAction } from './training-call-to-action.ng';
import { trainingMother } from './training.mother';

describe(TrainingCallToAction, () => {
  it("shows the training's own call to action", async () => {
    const { getTexts } = mountTrainingCallToAction(
      trainingMother
        .withBasicInfo('Charted Coding')
        .withCallToAction({
          title: 'Get on the list.',
          description: 'It is not a commitment.',
        })
        .build(),
    );

    await expect
      .poll(() => getTexts())
      .toEqual({
        title: 'Get on the list.',
        description: 'It is not a commitment.',
      });
  });

  it('falls back to a default title and the subheading', async () => {
    const { getTexts } = mountTrainingCallToAction(
      trainingMother
        .withBasicInfo('Charted Coding')
        .withSubheading('Two days to chart.\nWithout the drift.')
        .build(),
    );

    await expect
      .poll(() => getTexts())
      .toEqual({
        title: "Dinner's ready!",
        description: 'Two days to chart. Without the drift.',
      });
  });

  it('links to the waitlist', async () => {
    const { getLinks } = mountTrainingCallToAction(
      trainingMother
        .withBasicInfo('Charted Coding')
        .withWaitlist('https://waitlist.example/charted-coding')
        .build(),
    );

    await expect
      .poll(() => getLinks())
      .toEqual([
        {
          text: 'JOIN WAITLIST',
          url: 'https://waitlist.example/charted-coding',
        },
      ]);
  });
});

function mountTrainingCallToAction(training: Training) {
  /* The returned fixture is deliberately ignored. */
  TestBed.createComponent(TrainingCallToAction, {
    bindings: [inputBinding('training', signal(training))],
  });

  return {
    getTexts: () => ({
      title: document.querySelector('h2')?.textContent?.trim(),
      description: document.querySelector('p')?.textContent?.trim(),
    }),
    getLinks: () =>
      Array.from(document.querySelectorAll('a')).map((link) => ({
        /* The link starts with its icon's name. */
        text: link.textContent?.replace('notifications', '').trim(),
        url: link.getAttribute('href'),
      })),
  };
}
