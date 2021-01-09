import { readdir, readFile, writeFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { parse, stringify } from 'yaml';

export async function buildGithubWorkflows() {
  const encoding = 'utf-8';
  const workflowsSrcPath = '.github/src/workflows';
  const workflowsPath = '.github/workflows';

  /* Get workflow names. */
  const fileNames = await promisify(readdir)(workflowsSrcPath);
  const workflowFileNames = fileNames.filter((file) => file.match(/\.ya?ml$/));

  /* Parse and convert each workflow. */
  for (const workflowFileName of workflowFileNames) {
    const workflowSrcPath = join(workflowsSrcPath, workflowFileName);
    const workflowPath = join(workflowsPath, workflowFileName);
    const workflow = parse(
      await promisify(readFile)(workflowSrcPath, encoding)
    );
    // await promisify(writeFile)(workflowPath, stringify(workflow), encoding);
  }
}
