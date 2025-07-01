import { ResourceCardHarness } from '@marmicode/resource/feature-search/testing';
import { getAllHarnesses } from '@jscutlery/cypress-harness';

describe('resource search', () => {
  beforeEach(() => {
    cy.fixture('contentful/get-all-resources.json').then((allResources) => {
      cy.intercept(
        {
          path: '/content/v1/spaces/*/environments/master',
        },
        (req) => {
          switch (req.body.operationName) {
            case 'getAllResources':
              req.reply({
                body: allResources,
              });
              break;
            case 'getResourcesBySkill':
              req.reply({
                data: {
                  skillCollection: {
                    __typename: 'SkillCollection',
                    items: [
                      {
                        __typename: 'Skill',
                        linkedFrom: {
                          __typename: 'SkillLinkingCollections',
                          resourceCollection: {
                            ...allResources.data.resourceCollection,
                            items:
                              allResources.data.resourceCollection.items.filter(
                                (resource) =>
                                  resource.skillCollection.items.some(
                                    (skill) => {
                                      console.log(
                                        skill.slug ===
                                          req.body.variables.skillSlug,
                                      );
                                      console.log(skill.slug);
                                      console.log(req.body.variables.skillSlug);
                                      return (
                                        skill.slug ===
                                        req.body.variables.skillSlug
                                      );
                                    },
                                  ),
                              ),
                          },
                        },
                      },
                    ],
                  },
                },
              });
              break;
            case 'getAllSkills':
              req.reply({
                fixture: 'contentful/get-all-skills.json',
              });
              return;
            default:
              throw new Error(`Unexpected request.`);
          }
        },
      );
    });

    cy.visit('/');
  });

  it('should list resources', () => {
    cy.location('pathname').should('eq', '/learn/everything');
    /* Wait for resources to appear. */
    getAllHarnesses(ResourceCardHarness).should('have.length', 14);
    cy.snapshot();
  });

  it('should filter resources by skill', () => {
    cy.get('a').contains('Angular AOT Testing').click();
    getAllHarnesses(ResourceCardHarness).should('have.length', 1);
  });
});
