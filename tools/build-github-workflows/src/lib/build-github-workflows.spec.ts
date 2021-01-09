import * as fs from 'fs';
import { readdir, readFile, writeFile } from 'fs';
import { callbackify } from 'util';
import { buildGithubWorkflows } from './build-github-workflows';

jest.mock('fs');

describe('buildGithubWorkflows', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readdir').mockImplementation(
      /* eslint-disable @typescript-eslint/no-explicit-any */
      callbackify(jest.fn().mockResolvedValue(['test.yml'])) as any
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
    expect(readdir).toBeCalledTimes(1);
    expect(readdir).toBeCalledWith('.github/src/workflows');
    expect(readFile).toBeCalledTimes(1);
    expect(readFile).toBeCalledWith('./github/src/workflows/test.yml');
    expect(writeFile).toBeCalledTimes(1);
    expect(writeFile).toBeCalledWith(`
name: Test

on:
  - push

jobs:

  test:
    runs-on: ubuntu-latest
    steps:
      - name: Setup
        run: yarn install
      - name: Test
        run: yarn test
    `);
  });
});
