import { readdir } from 'fs';
import * as fs from 'fs';
import { callbackify } from 'util';
import { buildGithubWorkflows, main } from './build-github-workflows';

jest.mock('fs');

describe('buildGithubWorkflows', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readdir').mockImplementation(
      /* eslint-disable @typescript-eslint/no-explicit-any */
      callbackify(jest.fn().mockResolvedValue(['main.yml'])) as any
    );

    jest.spyOn(fs, 'readFile').mockImplementation(
      /* eslint-disable @typescript-eslint/no-explicit-any */
      callbackify(
        jest.fn().mockResolvedValue(`
name: Test

on:
  - push
  
x-anchors:
  setup: &setup
    name: Setup
    run: yarn install

jobs:

  test:
    runs-on: ubuntu-latest
    steps:
      - *setup
      - name: Test
        run: yarn test


 `)
      ) as any
    );
  });

  afterEach(() => {
    (fs.readdir as jest.MockedFunction<any>).mockRestore();
  });

  xit('🚧 should convert anchors', async () => {
    await buildGithubWorkflows();
    // check fs.readdir call
    // check fs.readFile call
    // check fs.writeFile call
  });
});
