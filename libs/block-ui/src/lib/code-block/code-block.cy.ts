import { createCodeBlock } from '@marmicode/block-core';
import { createHighlightZone } from '../highlight/highlight-zone';
import { CodeBlockComponent, CodeBlockModule } from './code-block.component';

describe('CodeBlockComponent', () => {
  it('should highlight lines', () => {
    /* Mounting with template string because the CSS scope is global
     * and applied to `mc-code-block` selector while "Cypress mount"
     * mounts the component on a div.*/
    cy.mount('<mc-code-block [block]="block" [highlightZone]="highlightZone"></mc-code-block>', {
      imports: [CodeBlockModule],
      componentProperties: {
        block: createCodeBlock({
          code: `# Get a farm.\ncurl http://localhost:8080/farms/P4VU2Xsw\n\n# Create a farm with urlencoded data\ncurl http://localhost:8080/farms -d"name=springfield"\n\n# Create a farm with invalid data.\ncurl http://localhost:8080/farms \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": 123, "random": "data"}'`,
          language: 'shell'
        }),
        highlightZone: createHighlightZone({
          color: '#ff000040',
          sections: [
            {
              start: 2,
              end: 2
            },
            {
              start: 8,
              end: 10
            }
          ]
        })
      }
    });
    cy.snapshot();
  });
});
