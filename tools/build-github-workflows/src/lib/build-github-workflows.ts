import { readdir, readFile, writeFile } from 'fs/promises';
import { dump, load } from 'js-yaml';
import { join } from 'path';
import { promisify } from 'util';

export async function buildGithubWorkflows() {
  const encoding = 'utf-8';
  const workflowsSrcPath = '.github/src/workflows';
  const workflowsPath = '.github/workflows';

  /* Get workflow names. */
  const fileNames = await readdir(workflowsSrcPath);
  const workflowFileNames = fileNames.filter((file) => file.match(/\.ya?ml$/));

  /* Parse and convert each workflow. */
  for (const workflowFileName of workflowFileNames) {
    const workflowSrcPath = join(workflowsSrcPath, workflowFileName);
    const workflowPath = join(workflowsPath, workflowFileName);
    let workflow = load(await readFile(workflowSrcPath, encoding));

    workflow = _removeExtraKeys(workflow as { [key: string]: unknown });

    await writeFile(
      workflowPath,
      `# DO NOT EDIT: This file was generated.

${dump(workflow, { noRefs: true })}`,
      encoding
    );
  }
}

export function _removeExtraKeys(workflow: { [key: string]: unknown }) {
  return Object.entries(workflow)
    .filter(([key]) => !key.startsWith('x-'))
    .reduce((result, [key, value]) => {
      return {
        ...result,
        [key]: value,
      };
    }, {});
}
