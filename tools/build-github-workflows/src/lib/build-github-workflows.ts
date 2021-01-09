import { readdir, readFile } from 'fs';
import { promisify } from 'util';
import { parse } from 'yaml';

export async function buildGithubWorkflows() {
  const filePaths = await promisify(readdir)('.github/src/workflows');
  const workflowPaths = filePaths.filter((file) => file.match(/\.ya?ml$/));
  for (const workflowPath of workflowPaths) {
    const workflow = parse(await promisify(readFile)(workflowPath, 'utf-8'));
  }
}
