describe('marmicode', () => {
  beforeEach(() => {
    const responseMap = new Map([
      [
        'getAllResources',
        {
          data: {
            resourceCollection: {
              items: [
                {
                  sys: { id: '62vt3ifOPzuBOv31JzHdMd', __typename: 'Sys' },
                  author: {
                    name: 'Younes Jaaidi',
                    picture: {
                      url:
                        'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
                      __typename: 'Asset',
                    },
                    __typename: 'Author',
                  },
                  duration: 6,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/7IC9BlKufXjqRWb5ISDS9h/95e4e3730e896a24e5f41b12e72fc832/end-to-end-http-request-cancelation-with-rxjs-and-nestjs.jpg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [
                      {
                        sys: {
                          id: '31ozuyIOuBP9Q4wENZ9T3d',
                          __typename: 'Sys',
                        },
                        label: 'RxJS Basics',
                        slug: 'rxjs-basics',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'blog-post',
                  skillCollection: {
                    items: [],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug:
                    'end-to-end-http-request-cancelation-with-rxjs-and-nestjs',
                  summary: null,
                  title:
                    'End-to-End HTTP request cancelation with RxJS & NestJS',
                  url: null,
                  __typename: 'Resource',
                },
                {
                  sys: { id: '796qk90cOBz38MnoyO6vlj', __typename: 'Sys' },
                  author: {
                    name: 'Younes Jaaidi',
                    picture: {
                      url:
                        'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
                      __typename: 'Asset',
                    },
                    __typename: 'Author',
                  },
                  duration: 5,
                  isWip: true,
                  picture: null,
                  requiredSkillCollection: {
                    items: [],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'recipe',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '4Y0B2kkToZ6z17r0lYtR2N',
                          __typename: 'Sys',
                        },
                        label: 'Mocking Angular Services',
                        slug: 'mocking-angular-services',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'mocking-angular-services-with-jest',
                  summary: null,
                  title: 'Mocking Angular services with Jest',
                  url: null,
                  __typename: 'Resource',
                },
                {
                  sys: { id: '1ec6uGxXWOQ2fsQpZnXHmZ', __typename: 'Sys' },
                  author: {
                    name: 'Younes Jaaidi',
                    picture: {
                      url:
                        'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
                      __typename: 'Asset',
                    },
                    __typename: 'Author',
                  },
                  duration: 11,
                  isWip: false,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/17KaAncNOI81I5uym5mPyo/899b5313731807d3d82c1b8e8bad3ce7/express-gateway-and-openapi.png',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [
                      {
                        sys: {
                          id: '2Y314h47vgRaQzuJBYCVwb',
                          __typename: 'Sys',
                        },
                        label: 'Setup Express Gateway',
                        slug: 'setup-express-gateway',
                        __typename: 'Skill',
                      },
                      {
                        sys: {
                          id: '3OdKMyrBo5hxbyDCL2Klzq',
                          __typename: 'Sys',
                        },
                        label: 'OpenAPI Specification Basics',
                        slug: 'openapi-specification-basics',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'recipe',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '4CJ8EFWXg4I6X6RXZug6dO',
                          __typename: 'Sys',
                        },
                        label: 'Express Gateway Request Validation',
                        slug: 'express-gateway-request-validation',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug:
                    'automating-request-validation-with-openapi-and-express-gateway',
                  summary:
                    'API Gateways are a nice place, if not THE right place for handling request validation and responding with human readable and uniform error responses.\nImplementing the validation manually for every API would be a mess... but wait, what if this could be done automatically by simply feeding our OpenAPI Specification to a gateway like Express Gateway.',
                  title:
                    'Automating request validation with OpenAPI & Express Gateway',
                  url: null,
                  __typename: 'Resource',
                },
                {
                  sys: { id: '3cR9bVdBSBxPDSeL7AQj1V', __typename: 'Sys' },
                  author: {
                    name: 'Younes Jaaidi',
                    picture: {
                      url:
                        'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
                      __typename: 'Asset',
                    },
                    __typename: 'Author',
                  },
                  duration: 11,
                  isWip: false,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/pi4BZYk0TV3mzst444yfS/d17aad67d4c4dc3967d03dc05b63d0f8/express-gateway.png',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'recipe',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '2Y314h47vgRaQzuJBYCVwb',
                          __typename: 'Sys',
                        },
                        label: 'Setup Express Gateway',
                        slug: 'setup-express-gateway',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'setup-express-gateway',
                  summary:
                    'Express Gateway is an API Gateway built on Express.js. It has the advantage of being simple and minimalist but also flexible and highly extensible thanks to JavaScript plugins.\nThis recipe will show you how to quickly setup Express Gateway as an API Gateway.',
                  title: 'Setup Express Gateway',
                  url: null,
                  __typename: 'Resource',
                },
                {
                  sys: { id: 'IWBwv00NwZZivRKeFT75e', __typename: 'Sys' },
                  author: {
                    name: 'Younes Jaaidi',
                    picture: {
                      url:
                        'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
                      __typename: 'Asset',
                    },
                    __typename: 'Author',
                  },
                  duration: 25,
                  isWip: false,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/4y5SswcVUAVDQI27TwG4Uf/6611ec5c4a3e6032bde13e382b373edb/what-happens-when-you-cancel-an-http-request.png',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [
                      {
                        sys: {
                          id: '31ozuyIOuBP9Q4wENZ9T3d',
                          __typename: 'Sys',
                        },
                        label: 'RxJS Basics',
                        slug: 'rxjs-basics',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'external-video',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '5hNVJpbqTAQIorIaGPf54l',
                          __typename: 'Sys',
                        },
                        label: 'Propagating HTTP request cancelation',
                        slug: 'propagating-http-request-cancelation',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'what-happens-when-you-cancel-an-http-request',
                  summary: null,
                  title: 'What happens when you cancel an HTTP Request?',
                  url: 'https://youtu.be/EpOdHEvZQ4w?t=180',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '1sYd85BXmCsTvXIV3XhXgT', __typename: 'Sys' },
                  author: null,
                  duration: 3,
                  isWip: false,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/6aflAFviTkJqy9LsHtZSTk/1b6f13413dc2c759fe6aee09a296cb27/openapi.png',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'documentation',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '3OdKMyrBo5hxbyDCL2Klzq',
                          __typename: 'Sys',
                        },
                        label: 'OpenAPI Specification Basics',
                        slug: 'openapi-specification-basics',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'openapi-specification-basic-structure',
                  summary:
                    'OpenAPI Specification (formerly known as Swagger) is a format that allows you to describe and document your HTTP API or ReSTful API from the interface to the authentication schemes and the permissions required for each route.\nA wide range of tools can use the OpenAPI Specification format to help you manage the lifecyle of your APIs from designing them to securing them while improving API consumers Developer eXperience.',
                  title: 'OpenAPI Specification Basic Structure',
                  url: 'https://swagger.io/docs/specification/basic-structure/',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '5nQ2auFi7jYwv3v0PZWCup', __typename: 'Sys' },
                  author: {
                    name: 'Younes Jaaidi',
                    picture: {
                      url:
                        'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
                      __typename: 'Asset',
                    },
                    __typename: 'Author',
                  },
                  duration: 33,
                  isWip: null,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/5ZJKJzWYwS1TR3kXexyfzW/f99097eb0f77490853781806d1b04966/boost-your-time-to-market-by-dancing-the-limbo.jpg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [
                      {
                        sys: { id: 'QDTym2ntmKSuIdzA5WNdE', __typename: 'Sys' },
                        label: 'Jasmine',
                        slug: 'jasmine',
                        __typename: 'Skill',
                      },
                      {
                        sys: {
                          id: '27P7hJElhFqY8iXLLPXhqg',
                          __typename: 'Sys',
                        },
                        label: 'Jest',
                        slug: 'jest',
                        __typename: 'Skill',
                      },
                      {
                        sys: {
                          id: '7HzsEBMbnVelnuzKdUtsax',
                          __typename: 'Sys',
                        },
                        label: 'TypeScript Basics',
                        slug: 'typescript-basics',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'external-video',
                  skillCollection: {
                    items: [
                      {
                        sys: { id: 'tp9edT0CX7Eo36tCvBSek', __typename: 'Sys' },
                        label: 'Limbo',
                        slug: 'limbo',
                        __typename: 'Skill',
                      },
                      {
                        sys: {
                          id: '1DBu03vVr53evNRubDJa7a',
                          __typename: 'Sys',
                        },
                        label: 'Timeboxed TDD',
                        slug: 'timeboxed-tdd',
                        __typename: 'Skill',
                      },
                      {
                        sys: { id: '7UiTMuaQp1HSjYj0BbAWV', __typename: 'Sys' },
                        label: 'TCR',
                        slug: 'tcr',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'boost-your-time-to-market-by-dancing-the-limbo',
                  summary:
                    'Stale or long-lived branches, conflicts & huge code reviews can cause technical and human issues in your team. In this talk, Younes demonstrates some alternative and sometimes extreme approaches promoting single-branch development with techniques like Limbo, Timeboxed TDD and Test && Commit || Revert.',
                  title: 'Boost Your Time to Market by Dancing the Limbo',
                  url: 'https://www.youtube.com/watch?v=izGz7H-8yIk',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '36pws1t12kdT2GNAQNwfpN', __typename: 'Sys' },
                  author: {
                    name: 'Younes Jaaidi',
                    picture: {
                      url:
                        'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
                      __typename: 'Asset',
                    },
                    __typename: 'Author',
                  },
                  duration: 4,
                  isWip: null,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/4m6dLwW0lZx1zHpv9U0ezx/fb73bc8a6f98ea2d3e7ee6a9255b7528/your-angular-module-is-a-scam.jpg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [
                      {
                        sys: {
                          id: '5wAEdDJEFeFL8C9W0VgPsl',
                          __typename: 'Sys',
                        },
                        label: 'Angular Modules',
                        slug: 'angular-modules',
                        __typename: 'Skill',
                      },
                      {
                        sys: {
                          id: '45eKVY9T265aPEfP7jLyrb',
                          __typename: 'Sys',
                        },
                        label: 'Angular Lazy Loading',
                        slug: 'angular-lazy-loading',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'external-blog-post',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '58wtD6mbyF8OFGRAWfrDin',
                          __typename: 'Sys',
                        },
                        label: 'Moduleless Angular',
                        slug: 'moduleless-angular',
                        __typename: 'Skill',
                      },
                      {
                        sys: {
                          id: '3RPw75Mj487lBFk2DXD9MH',
                          __typename: 'Sys',
                        },
                        label: 'SCAM',
                        slug: 'scam',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'your-angular-module-is-a-scam',
                  summary:
                    'Angular modules can bring some complexity to your app.\nChoosing the right modules architecture is tricky... but wait, do we really need modules?',
                  title: 'Your Angular Module is a SCAM!',
                  url:
                    'https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '3uDbRcJuHK6k1BBuE7qeaI', __typename: 'Sys' },
                  author: null,
                  duration: 5,
                  isWip: null,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/50Brp6Gjf722znBAvBcFoT/d2b4d9b3985e05ccead021fca03e6212/angular.svg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'documentation',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '5QhhgFU5KE0eJRWpJoLU8A',
                          __typename: 'Sys',
                        },
                        label: 'Angular CLI Basics',
                        slug: 'angular-cli-basics',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'angular-cli-overview-and-command-reference',
                  summary:
                    'An introduction to the Angular CLI by the Angular team.',
                  title: 'Angular CLI Overview and Command Reference',
                  url:
                    'https://angular.io/cli#cli-overview-and-command-reference',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '6GIlDXcmev0PEjM6y0Y0vK', __typename: 'Sys' },
                  author: null,
                  duration: 8,
                  isWip: null,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/50Brp6Gjf722znBAvBcFoT/d2b4d9b3985e05ccead021fca03e6212/angular.svg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'documentation',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '7Ec0XpecHrUiGWdB7eACQo',
                          __typename: 'Sys',
                        },
                        label: 'Angular Components',
                        slug: 'angular-components',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'angular-components',
                  summary:
                    "Controlling the behavior of a whole application or page can quickly get tricky if we don't split it into smaller chunks. In Angular, these chunks are called components. Every component is reusable and allows us to control the display and behavior of some part of the application or page.\nThis official documentation gives a nice introduction on how components work.",
                  title: 'Angular Components',
                  url: 'https://angular.io/guide/architecture-components',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '6ddSeJSF9IQRnAs7AoNeuO', __typename: 'Sys' },
                  author: null,
                  duration: 5,
                  isWip: null,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/50Brp6Gjf722znBAvBcFoT/d2b4d9b3985e05ccead021fca03e6212/angular.svg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'documentation',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '5wAEdDJEFeFL8C9W0VgPsl',
                          __typename: 'Sys',
                        },
                        label: 'Angular Modules',
                        slug: 'angular-modules',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'introduction-to-angular-modules',
                  summary:
                    'Angular Modules, or NgModules are the main modularity system in Angular.\nThey are fundamental for architecturing & structuring our apps and libraries in a performant, readable and scalable way.',
                  title: 'Introduction to Angular Modules',
                  url: 'https://angular.io/guide/architecture-modules',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '6oF1bjwQzv9jW3IRH8AaJy', __typename: 'Sys' },
                  author: null,
                  duration: 5,
                  isWip: null,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/4BTNMsTKjWBk6VUaWMOERR/dbdc4e551b0c2b1ad0bfbe299e98a153/typescript.svg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'documentation',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '7HzsEBMbnVelnuzKdUtsax',
                          __typename: 'Sys',
                        },
                        label: 'TypeScript Basics',
                        slug: 'typescript-basics',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'typescript-in-5-minutes',
                  summary:
                    'Unsurprisingly, the official TypeScript documentation contains one of the best introductions to TypeScript.',
                  title: 'TypeScript in 5 minutes',
                  url:
                    'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
                  __typename: 'Resource',
                },
                {
                  sys: { id: '6OaDo70mSbnx0GDoaffW8k', __typename: 'Sys' },
                  author: null,
                  duration: 9,
                  isWip: null,
                  picture: {
                    url:
                      'https://images.ctfassets.net/gowvxq3b4aid/50Brp6Gjf722znBAvBcFoT/d2b4d9b3985e05ccead021fca03e6212/angular.svg',
                    __typename: 'Asset',
                  },
                  requiredSkillCollection: {
                    items: [
                      {
                        sys: {
                          id: '5wAEdDJEFeFL8C9W0VgPsl',
                          __typename: 'Sys',
                        },
                        label: 'Angular Modules',
                        slug: 'angular-modules',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceRequiredSkillCollection',
                  },
                  resourceType: 'documentation',
                  skillCollection: {
                    items: [
                      {
                        sys: {
                          id: '45eKVY9T265aPEfP7jLyrb',
                          __typename: 'Sys',
                        },
                        label: 'Angular Lazy Loading',
                        slug: 'angular-lazy-loading',
                        __typename: 'Skill',
                      },
                    ],
                    __typename: 'ResourceSkillCollection',
                  },
                  slug: 'lazy-loading-angular-modules',
                  summary:
                    "Angular apps, like any other kind of apps, can get big.\nOne way of optimizing our apps is to avoid loading modules that we don't need immediately. This is called lazy-loading.\nYou can learn more about it in the official documentation.",
                  title: 'Lazy-loading Angular Modules',
                  url: 'https://angular.io/guide/lazy-loading-ngmodules',
                  __typename: 'Resource',
                },
              ],
              __typename: 'ResourceCollection',
            },
          },
        },
      ],
      [
        'getAllSkills',
        {
          data: {
            skillCollection: {
              items: [
                {
                  sys: { id: '5QhhgFU5KE0eJRWpJoLU8A', __typename: 'Sys' },
                  label: 'Angular CLI Basics',
                  slug: 'angular-cli-basics',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '7Ec0XpecHrUiGWdB7eACQo', __typename: 'Sys' },
                  label: 'Angular Components',
                  slug: 'angular-components',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '45eKVY9T265aPEfP7jLyrb', __typename: 'Sys' },
                  label: 'Angular Lazy Loading',
                  slug: 'angular-lazy-loading',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '5wAEdDJEFeFL8C9W0VgPsl', __typename: 'Sys' },
                  label: 'Angular Modules',
                  slug: 'angular-modules',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '4CJ8EFWXg4I6X6RXZug6dO', __typename: 'Sys' },
                  label: 'Express Gateway Request Validation',
                  slug: 'express-gateway-request-validation',
                  __typename: 'Skill',
                },
                {
                  sys: { id: 'QDTym2ntmKSuIdzA5WNdE', __typename: 'Sys' },
                  label: 'Jasmine',
                  slug: 'jasmine',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '27P7hJElhFqY8iXLLPXhqg', __typename: 'Sys' },
                  label: 'Jest',
                  slug: 'jest',
                  __typename: 'Skill',
                },
                {
                  sys: { id: 'tp9edT0CX7Eo36tCvBSek', __typename: 'Sys' },
                  label: 'Limbo',
                  slug: 'limbo',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '4Y0B2kkToZ6z17r0lYtR2N', __typename: 'Sys' },
                  label: 'Mocking Angular Services',
                  slug: 'mocking-angular-services',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '58wtD6mbyF8OFGRAWfrDin', __typename: 'Sys' },
                  label: 'Moduleless Angular',
                  slug: 'moduleless-angular',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '3OdKMyrBo5hxbyDCL2Klzq', __typename: 'Sys' },
                  label: 'OpenAPI Specification Basics',
                  slug: 'openapi-specification-basics',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '5hNVJpbqTAQIorIaGPf54l', __typename: 'Sys' },
                  label: 'Propagating HTTP request cancelation',
                  slug: 'propagating-http-request-cancelation',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '31ozuyIOuBP9Q4wENZ9T3d', __typename: 'Sys' },
                  label: 'RxJS Basics',
                  slug: 'rxjs-basics',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '3RPw75Mj487lBFk2DXD9MH', __typename: 'Sys' },
                  label: 'SCAM',
                  slug: 'scam',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '2Y314h47vgRaQzuJBYCVwb', __typename: 'Sys' },
                  label: 'Setup Express Gateway',
                  slug: 'setup-express-gateway',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '7UiTMuaQp1HSjYj0BbAWV', __typename: 'Sys' },
                  label: 'TCR',
                  slug: 'tcr',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '1DBu03vVr53evNRubDJa7a', __typename: 'Sys' },
                  label: 'Timeboxed TDD',
                  slug: 'timeboxed-tdd',
                  __typename: 'Skill',
                },
                {
                  sys: { id: '7HzsEBMbnVelnuzKdUtsax', __typename: 'Sys' },
                  label: 'TypeScript Basics',
                  slug: 'typescript-basics',
                  __typename: 'Skill',
                },
              ],
              __typename: 'SkillCollection',
            },
          },
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
    cy.get('mc-resource-card').its('length').should('eq', 13);
    cy.snapshot();
  });
});
