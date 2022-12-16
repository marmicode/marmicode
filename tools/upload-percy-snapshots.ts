/* @hack fix "Could not find a declaration file for module"
 * as `allowJs: true` was not enough. */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

  const percySnapshotPath = join(projectPath, '__percy_snapshots__');
  const fileNames = await readdir(percySnapshotPath);
  const infoFileNames = fileNames.filter((file) => file.endsWith('.json'));

  const snapshotInfoList: SnapshotInfo[] = await Promise.all(
    infoFileNames.map(async (infoFleName) => {
      /* Merge metainfo from json file + html file. */
      return {
        ...JSON.parse(
          await readFile(join(percySnapshotPath, infoFleName), 'utf8')
        ),
        domSnapshot: {
          html: await readFile(
            join(percySnapshotPath, infoFleName.replace('.json', '.html')),
            'utf8'
          ),
        },
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
  } catch (error) {
    if (remainingAttempts === 0) {
      throw error;
    }

    console.warn(error);

    setTimeout(
      () => _uploadSnapshot(snapshotInfo, remainingAttempts - 1),
      (1000 * ATTEMPTS) / remainingAttempts
    );
  }
}

const ATTEMPTS = 5;

interface SnapshotInfo {
  name: string;
  url: string;
  widths: number[];
}

main(argv[2]);
