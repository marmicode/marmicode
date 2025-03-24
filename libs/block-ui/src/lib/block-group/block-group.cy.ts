import { BlockType, createBlockGroup } from '@marmicode/block-core';
import { BlockGroupComponent } from './block-group.component';

describe(BlockGroupComponent.name, () => {
  it('should apply horizontal scroll if code overflows', () => {
    cy.mount(BlockGroupComponent, {
      componentProperties: {
        blockGroup: createBlockGroup({
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
    -d '{"name": 123, "random": "data"}'
  
blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla blalabla`,
              language: 'shell',
            },
          ],
        }),
      },
    });
    cy.getByDataRole('code-block').should('contain', '# Get a farm.');
    cy.snapshot();
  });

  describe('with highlight links', () => {
    it('should not highlight code until click', () => {
      mountWithHighlightLinks();
      /* Wait for code block to appear before checking stuff & taking snapshot. */
      cy.getByDataRole('code-block').should('exist');
      cy.getByDataRole('code-highlight').should('not.exist');
      cy.snapshot();
    });

    it('should highlight code on click', () => {
      mountWithHighlightLinks();
      cy.getByDataRole('highlight-link').first().click();
      cy.getByDataRole('code-highlight').should('exist');
      cy.snapshot();
    });
  });

  function mountWithHighlightLinks() {
    cy.mount(BlockGroupComponent, {
      componentProperties: {
        blockGroup: createBlockGroup({
          blocks: [
            {
              type: BlockType.Text,
              text: `Before setting up request validation, we can see that:
- [the farm detail \`GET /farms/{farmId}\` route is accessible](highlight://2) even though it's not defined in the OpenAPI Specification,
- [we can send data in any format](highlight://5) and not only \`application/json\` as described in the OpenAPI Specification,
- [we can send any data](highlight://8-10) when creating a farm using the \`POST /farms\` route.
- This is [another link highlighting the first zone](highlight://2)`,
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
    -d '{"name": 123, "random": "data"}'`,
              language: 'shell',
            },
          ],
        }),
      },
    });
  }
});
