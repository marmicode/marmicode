interface Topic {
  id: string;
  name: string;
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
        nextTopics: ['typescript', 'cli'],
      }),
      createTopic({
        id: 'typescript',
        name: 'Typescript',
        nextTopics: ['rxjs'],
      }),
      createTopic({
        id: 'cli',
        name: 'CLI',
        nextTopics: ['components'],
      }),
      createTopic({
        id: 'rxjs',
        name: 'RxJS',
      }),
      createTopic({
        id: 'components',
        name: 'Components',
      }),
    ];
    // create topics list [{id, name, nextTopics}]
    // check function produces amchart series with the right distribution
  });
});
