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
    expect(topicsToAmchartSeries(topics)).toEqual([]);
  });
});
