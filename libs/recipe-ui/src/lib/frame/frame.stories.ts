import { BlockType, createFrame } from '@marmicode/recipe-core';
import { FrameComponent, FrameModule } from './frame.component';

import { Meta } from '@storybook/angular';

export default {
  title: 'Frame',
};

export const overflow = () =>
  ({
    title: 'Overflow',
    moduleMetadata: {
      imports: [FrameModule],
    },
    component: FrameComponent,
    props: {
      frame: createFrame({
        blocks: [
          {
            type: BlockType.Text,
            text: `Before setting up request validation, we can see that:
- the farm detail \`GET /farms/{farmId}\` route is accessible even though it's not defined in the OpenAPI Specification,
- we can send data in any format and not only \`application/json\` as described in the OpenAPI Specification,
- we can send any data when creating a farm using the \`POST /farms\` route.`,
          },
          {
            type: BlockType.Code,
            code: `# Get a farm.
curl http://localhost:8080/farms/P4VU2Xsw

# Create a farm with urlencoded data
curl http://localhost:8080/farms -d"name=springfield"

# Create a farm with invalid data.
curl http://localhost:8080/farms
    -H "Content-Type: application/json"
    -d \'{"name": 123, "random": "data"}\'
    blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla`,
            language: 'shell',
          },
        ],
        duration: 2,
        slug: 'without-validation',
        title: 'Without validation',
      }),
    },
  } as Meta);

export const highlight = () =>
  ({
    title: 'Highlight',
    moduleMetadata: {
      imports: [FrameModule],
    },
    component: FrameComponent,
    props: {
      frame: createFrame({
        blocks: [
          {
            type: BlockType.Text,
            text: `Before setting up request validation, we can see that:
- the farm detail \`GET /farms/{farmId}\` route is accessible even though it's not defined in the OpenAPI Specification,
- we can send data in any format and not only \`application/json\` as described in the OpenAPI Specification,
- we can send any data when creating a farm using the \`POST /farms\` route.`,
          },
          {
            type: BlockType.Code,
            code: `# Get a farm.
curl http://localhost:8080/farms/P4VU2Xsw

# Create a farm with urlencoded data
curl http://localhost:8080/farms -d"name=springfield"

# Create a farm with invalid data.
curl http://localhost:8080/farms
    -H "Content-Type: application/json"
    -d \'{"name": 123, "random": "data"}\'`,
            language: 'shell',
          },
        ],
        duration: 2,
        slug: 'without-validation',
        title: 'Without validation',
      }),
    },
  } as Meta);
