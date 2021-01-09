import { buildGithubWorkflows } from './build-github-workflows';

describe('buildGithubWorkflows', () => {
  it('should work', () => {
    expect(buildGithubWorkflows()).toEqual('build-github-workflows');
  });
});
