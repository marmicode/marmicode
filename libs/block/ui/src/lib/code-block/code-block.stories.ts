import { createCodeBlock } from '@marmicode/block/core';

import type { Meta, StoryFn, StoryObj } from '@storybook/angular';
import { createHighlightZone } from '../highlight/highlight-zone';
import { CodeBlockComponent, CodeBlockModule } from './code-block.component';

export default {
  title: 'CodeBlock',
  component: CodeBlockComponent,
} satisfies Meta<CodeBlockComponent>;

type Story = StoryFn<CodeBlockComponent>;

export const Highlight: Story = () => ({
  props: {
    block: createCodeBlock({
      code: `# Get a farm.\ncurl http://localhost:8080/farms/P4VU2Xsw\n\n# Create a farm with urlencoded data\ncurl http://localhost:8080/farms -d"name=springfield"\n\n# Create a farm with invalid data.\ncurl http://localhost:8080/farms \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": 123, "random": "data"}'`,
      language: 'shell',
    }),
    highlightZone: createHighlightZone({
      color: '#ff000040',
      sections: [
        {
          start: 2,
          end: 2,
        },
        {
          start: 8,
          end: 10,
        },
      ],
    }),
  },
});
