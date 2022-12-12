import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import * as fs from 'fs/promises';
import { readdir, readFile, writeFile } from 'fs/promises';
import { buildGithubWorkflows } from './build-github-workflows';

jest.mock('fs/promises');

describe('buildGithubWorkflows', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readdir').mockResolvedValue(['test.yml'] as any);

    jest.spyOn(fs, 'readFile').mockResolvedValue(`
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
`);

    jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined);
  });
  afterEach(() => {
    (readdir as jest.MockedFunction<any>).mockRestore();
    (readFile as jest.MockedFunction<any>).mockRestore();
    (writeFile as jest.MockedFunction<any>).mockRestore();
  });

  it('should convert anchors', async () => {
    await buildGithubWorkflows();
    expect(readdir).toBeCalledTimes(1);
    expect(readdir).toBeCalledWith('.github/src/workflows');
    expect(readFile).toBeCalledTimes(1);
    expect(readFile).toBeCalledWith('.github/src/workflows/test.yml', 'utf-8');
    expect(writeFile).toBeCalledTimes(1);
    expect(writeFile).toBeCalledWith(
      '.github/workflows/test.yml',
      `# DO NOT EDIT: This file was generated.

name: Test
'on':
  - push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Setup
        run: yarn install
      - name: Test
        run: yarn test
`,
      'utf-8'
    );
  });
});
