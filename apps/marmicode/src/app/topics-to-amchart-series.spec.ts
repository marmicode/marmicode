interface Topic {
  id: string;
  name: string;
  /* We could compute the depth depending on next topics position...
   * ... but hard-coding is so cool! */
  depth: number;
  nextTopics?: string[];
}

function createTopic(topic: Topic): Topic {
  return topic;
}

/**
 * @deprecated 🚧 Work in progress.
 */
function topicsToAmchartSeries(topics: Topic[]) {
  return [];
}

describe('topicsToAmchartSeries', () => {
  it('🚧 should convert topics list to amchart series', () => {
    const topics = [
      createTopic({
        id: 'web-basics',
        name: 'Web Basics',
        depth: 0,
        nextTopics: ['typescript', 'cli'],
      }),
      createTopic({
        id: 'typescript',
        name: 'Typescript',
        depth: 1,
        nextTopics: ['rxjs', 'components'],
      }),
      createTopic({
        id: 'cli',
        name: 'CLI',
        depth: 1,
        nextTopics: ['components'],
      }),
      createTopic({
        id: 'components',
        name: 'Components',
        depth: 2,
        nextTopics: ['pipes'],
      }),
      createTopic({
        id: 'rxjs',
        name: 'RxJS',
        depth: 3,
      }),
    ];
    /* Radius is 60px and gap is 40px.
     * Largest row is row 1 and it has 2 items
     * which means (60 * 2 * 2) + 40 * 3 = 360 */
    expect(topicsToAmchartSeries(topics)).toEqual([
      // {
      //   id: 'web-basics',
      //   name: 'Web Basics',
      //   value: 1,
      //   fixed: true,
      //   /* Right in the middle. */
      //   x: 180,
      //   /* First row so exactly the radius. */
      //   y: 60,
      //   linkWith: ['b', 'c'],
      // },
    ]);
  });
});
