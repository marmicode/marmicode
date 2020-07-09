interface Topic {
  id: string;
  name: string;
  depth: number;
  nextTopics?: string[];
}

function createTopic(topic: Topic): Topic {
  return topic;
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
    // create topics list [{id, name, nextTopics}]
    // check function produces amchart series with the right distribution
  });
});
