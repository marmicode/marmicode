import { readdir, readFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { parse } from 'yaml';

export async function buildGithubWorkflows() {
  const workflowsPath = '.github/src/workflows';

  /* Get workflow names. */
  const fileNames = await promisify(readdir)(workflowsPath);
  const workflowFileNames = fileNames.filter((file) => file.match(/\.ya?ml$/));

  /* Parse and convert each workflow. */
  for (const workflowFileName of workflowFileNames) {
    const workflowPath = join(workflowsPath, workflowFileName);
    const workflow = parse(await promisify(readFile)(workflowPath, 'utf-8'));
  }
}
