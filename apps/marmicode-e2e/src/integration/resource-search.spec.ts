import { ResourceCardHarness } from '@marmicode/resource-feature-search/testing';
import { getAllHarnesses } from '@jscutlery/cypress-harness';

describe('resource search', () => {
  beforeEach(() => {
    const responseMap = new Map([
      [
        'getAllResources',
        {
          fixture: 'contentful/get-all-resources.json',
        },
      ],
      [
        'getAllSkills',
        {
          fixture: 'contentful/get-all-skills.json',
        },
      ],
    ]);

    cy.intercept(
      {
        path: '/content/v1/spaces/*/environments/master',
      },
      (req) => {
        const response = responseMap.get(req.body.operationName);

        if (response == null) {
          throw new Error(`Unexpected request.`);
        }

        req.reply(response);
      }
    );
    cy.visit('/');
  });

  it('should list resources', () => {
    cy.location('pathname').should('eq', '/learn/everything');
    /* Wait for resources to appear. */
    getAllHarnesses(ResourceCardHarness).its('length').should('eq', 13);
    cy.snapshot();
  });
});
