import { createTopic, Topic } from './topic';
import {
  getDepthCountMap,
  getTopicsTreeConfig,
  getTopicsTreeWidth,
} from './topics-tree-utils';

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

  describe('getTopicsTreeConfig', () => {
    it('should convert topics list to amchart series', () => {
      /* Radius is 60px and gap is 40px.
       * Largest row is row 1 and it has 2 items
       * which means (60 * 2 * 2) + 40 * 3 = 360 */
      expect(
        getTopicsTreeConfig({
          topics: topics,
          radius: 60,
          horizontalGap: 40,
          verticalGap: 20,
        })
      ).toEqual({
        height: 540,
        width: 360,
        nodes: [
          {
            id: 'web-basics',
            name: 'Web Basics',
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
          expect.objectContaining({
            id: 'rxjs',
            x: 180,
            y: 480,
          }),
        ],
      });
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

  describe('getTopicsTreeWidth', () => {
    it(`should get largest row's width`, () => {
      expect(
        getTopicsTreeWidth({
          depthCountMap: new Map([
            [0, 1],
            [1, 2],
            [2, 1],
            [3, 1],
          ]),
          radius: 60,
          horizontalGap: 40,
        })
      ).toEqual(360);
    });
  });
});
