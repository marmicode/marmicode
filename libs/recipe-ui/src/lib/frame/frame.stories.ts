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
            text:
              "Before setting up request validation, we can see that:\n- the farm detail `GET /farms/{farmId}` route is accessible even though it's not defined in the OpenAPI Specification,\n- we can send data in any format and not only `application/json` as described in the OpenAPI Specification,\n- we can send any data when creating a farm using the `POST /farms` route.",
          },
          {
            type: BlockType.Code,
            code:
              '# Get a farm.\ncurl http://localhost:8080/farms/P4VU2Xsw\n\n# Create a farm with urlencoded data\ncurl http://localhost:8080/farms -d"name=springfield"\n\n# Create a farm with invalid data.\ncurl http://localhost:8080/farms \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": 123, "random": "data"}\'\n\nblalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla ',
            language: 'shell',
          },
        ],
        duration: 2,
        slug: 'without-validation',
        title: 'Without validation',
      }),
    },
  } as Meta);
