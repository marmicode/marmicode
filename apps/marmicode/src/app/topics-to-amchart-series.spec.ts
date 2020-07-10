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
const horizontalGap = 40;
const verticalGap = 20;
const rowHeight = 2 * radius;

function getDepthCountMap(topics: Topic[]) {
  return topics.reduce((map, topic) => {
    map = new Map(map);
    const depth = topic.depth;
    const count = (map.get(depth) ?? 0) + 1;
    map.set(depth, count);
    return map;
  }, new Map<number, number>());
}

/**
 * Returns the width based after finding the row (depth) with the max topics.
 */
function getTopicsChartWidth(depthCountMap: Map<number, number>) {
  const maxCount = Array.from(depthCountMap.entries()).reduce(
    (max, [depth, count]) => {
      return Math.max(max, count);
    },
    0
  );

  return maxCount * radius * 2 + (maxCount + 1) * horizontalGap;
}

/**
 * @deprecated 🚧 Work in progress.
 */
function getTopicsChartSeries(topics: Topic[]) {
  const depthCountMap = getDepthCountMap(topics);
  const chartWidth = getTopicsChartWidth(depthCountMap);
  return topics.map((topic) => {
    /* Topic's row. */
    const rowIndex = topic.depth;

    /* Get topic's column index. */
    const rowTopics = topics.filter(({ depth }) => depth === topic.depth);
    const rowTopicCount = rowTopics.length;
    const colIndex = rowTopics.indexOf(topic);

    return {
      id: topic.id,
      name: topic.name,
      value: 1,
      fixed: true,
      x: ((colIndex + 1) * chartWidth) / (rowTopicCount + 1),
      y: radius + rowIndex * (2 * radius + verticalGap),
      linkWith: topic.nextTopics,
    };
  });
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
      expect(getTopicsChartSeries(topics)).toEqual(
        expect.arrayContaining([
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
          expect.objectContaining({
            id: 'typescript',
            x: 120,
            y: 200,
          }),
          expect.objectContaining({
            id: 'cli',
            x: 240,
            y: 200,
          }),
          expect.objectContaining({
            id: 'components',
            x: 180,
            y: 340,
          }),
        ])
      );
    });
  });

  describe('getDepthCountMap', () => {
    it('should get items count per depth', () => {
      expect(getDepthCountMap(topics)).toEqual(
        new Map([
          [0, 1],
          [1, 2],
          [2, 1],
          [3, 1],
        ])
      );
    });
  });

  describe('getTopicsChartWidth', () => {
    it(`should get largest row's width`, () => {
      expect(
        getTopicsChartWidth(
          new Map([
            [0, 1],
            [1, 2],
            [2, 1],
            [3, 1],
          ])
        )
      ).toEqual(360);
    });
  });
});
