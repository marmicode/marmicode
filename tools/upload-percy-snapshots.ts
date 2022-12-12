/* @hack fix "Could not find a declaration file for module"
 * as `allowJs: true` was not enough. */
// @eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import utils from '@percy/sdk-utils';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { argv } from 'process';

async function main(projectPath?: string) {
  if (projectPath == null) {
    throw new Error(
      'No project path provided. Usage: percy-upload-snapshots <project-path>'
    );
  }

  console.info(`Uploading snapshots for ${projectPath}...`);

  const files = await readdir(join(projectPath, '__percy_snapshots__'));

  const snapshotInfoList: SnapshotInfo[] = await Promise.all(
    files.map(async (fileName) => {
      const snapshotInfo = JSON.parse(
        await readFile(
          join(projectPath, '__percy_snapshots__', fileName),
          'utf8'
        )
      );
      return {
        name: fileName.replace(/\.json$/, ''),
        ...snapshotInfo,
      };
    })
  );

  for (const snapshotInfo of snapshotInfoList) {
    await _uploadSnapshot(snapshotInfo);
  }
}

async function _uploadSnapshot(
  snapshotInfo: SnapshotInfo,
  remainingAttempts: number = ATTEMPTS - 1
) {
  console.info(
    `Uploading snapshot ${snapshotInfo.name}... (${remainingAttempts} attempts left)`
  );

  try {
    await utils.postSnapshot(snapshotInfo);
  } catch {
    if (remainingAttempts === 0) {
      return;
    }

    setTimeout(
      () => _uploadSnapshot(snapshotInfo, remainingAttempts - 1),
      (1000 * ATTEMPTS) / remainingAttempts
    );
  }
}

const ATTEMPTS = 5;

interface SnapshotInfo {
  name: string;
  domSnapshot: {
    html: string;
  };
  options: {
    widths: number[];
  };
}

main(argv[2]);
