import { TreeConfig, TreeNode } from './tree/tree-config';
import { Topic } from './topic';

export function getDepthCountMap(topics: Topic[]) {
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
export function getTopicsTreeWidth({
  depthCountMap,
  radius,
  horizontalGap,
}: {
  depthCountMap: Map<number, number>;
  radius: number;
  horizontalGap: number;
}) {
  const maxCount = Array.from(depthCountMap.entries()).reduce(
    (max, [depth, count]) => {
      return Math.max(max, count);
    },
    0
  );

  return maxCount * radius * 2 + (maxCount + 1) * horizontalGap;
}

/**
 * Converts a topics list to a list of properly positioned tree nodes.
 */
export function getTopicsTreeNodes({
  topics,
  radius,
  horizontalGap,
  verticalGap,
}: {
  topics: Topic[];
  radius: number;
  horizontalGap: number;
  verticalGap: number;
}): TreeNode[] {
  const depthCountMap = getDepthCountMap(topics);
  const chartWidth = getTopicsTreeWidth({
    depthCountMap: depthCountMap,
    radius,
    horizontalGap,
  });
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
      x: ((colIndex + 1) * chartWidth) / (rowTopicCount + 1),
      y: radius + rowIndex * (2 * radius + verticalGap),
      linkWith: topic.nextTopics,
    };
  });
}

export function getTopicsTreeConfig({
  topics,
  radius = 60,
  horizontalGap = 80,
  verticalGap = 80,
}: {
  topics: Topic[];
  radius?: number;
  horizontalGap?: number;
  verticalGap?: number;
}): TreeConfig {
  const depthCountMap = getDepthCountMap(topics);

  const rowCount = depthCountMap.size;

  const height = rowCount * (2 * radius + verticalGap) - verticalGap;

  const width = getTopicsTreeWidth({
    depthCountMap: depthCountMap,
    radius,
    horizontalGap,
  });

  return {
    nodes: getTopicsTreeNodes({ topics, radius, horizontalGap, verticalGap }),
    height,
    width,
  };
}
