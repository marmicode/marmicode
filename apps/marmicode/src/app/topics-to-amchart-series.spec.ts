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

const radius = 60;
const gap = 40;

/**
 * @deprecated 🚧 Work in progress.
 */
function getTopicsChartWidth(topics: Topic[]) {
  const depthCountMap = topics.reduce((map, topic) => {
    map = new Map(map);
    const depth = topic.depth;
    const count = (map.get(depth) ?? 0) + 1;
    map.set(depth, count);
    return map;
  }, new Map<number, number>());
  return 360;
}

/**
 * @deprecated 🚧 Work in progress.
 */
function getTopicsChartSeries(topics: Topic[]) {
  const topic = topics[0];
  return [
    {
      id: topic.id,
      name: topic.name,
      value: 1,
      fixed: true,
      x: getTopicsChartWidth(topics) / 2,
      y: radius,
      linkWith: topic.nextTopics,
    },
  ];
}

describe('chart utils', () => {
  let topics: Topic[];

  beforeEach(
    () =>
      (topics = [
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
      ])
  );

  describe('getTopicsChartSeries', () => {
    it('🚧 should convert topics list to amchart series', () => {
      /* Radius is 60px and gap is 40px.
       * Largest row is row 1 and it has 2 items
       * which means (60 * 2 * 2) + 40 * 3 = 360 */
      expect(getTopicsChartSeries(topics)).toEqual([
        {
          id: 'web-basics',
          name: 'Web Basics',
          value: 1,
          fixed: true,
          /* Right in the middle. */
          x: 180,
          /* First row so exactly the radius. */
          y: 60,
          linkWith: ['typescript', 'cli'],
        },
      ]);
    });
  });

  describe('getTopicsChartWidth', () => {
    it(`🚧 should get largest row's width`, () => {
      expect(getTopicsChartWidth(topics)).toEqual(360);
    });
  });
});
