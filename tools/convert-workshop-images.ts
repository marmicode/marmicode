#!/usr/bin/env node

import { basename, join, resolve } from 'node:path';
import { argv } from 'node:process';
import { $, chalk, glob } from 'zx';

const __dirname = import.meta.dirname;

const CONFIG = {
  THUMBNAIL_HEIGHT: 600,
  WEBP_QUALITY: 100,
  /**
   * Workshop slugs in banner export order (002/003 → first, 005/006 → second, …).
   */
  WORKSHOP_ORDER: [
    'pragmatic-angular-testing',
    'pragmatic-react-testing',
    'pragmatic-ui-testing-with-playwright',
    'charted-coding',
  ],
} as const;

main().catch((error: unknown) => {
  console.error(chalk.red(error));
  process.exit(1);
});

async function main() {
  const inputDir = argv[2];
  if (inputDir == null || inputDir === '') {
    throw new Error(
      'Usage: node tools/convert-workshop-images.ts <folder-with-banner-jpegs>',
    );
  }

  const resolvedInputDir = resolve(inputDir);

  await $`command -v cwebp`;
  await $`command -v magick`;

  const jpegPaths = await glob('workshop-banners.*.jpeg', {
    cwd: resolvedInputDir,
    absolute: true,
  });

  if (jpegPaths.length === 0) {
    console.info(
      chalk.yellow(
        `No workshop-banners.* JPEG files found in ${resolvedInputDir}`,
      ),
    );
    return;
  }

  const sortedPaths = jpegPaths.sort((a, b) => {
    const indexA = _parseBannerIndex(a) ?? 0;
    const indexB = _parseBannerIndex(b) ?? 0;
    return indexA - indexB;
  });

  let convertedCount = 0;

  for (const jpegPath of sortedPaths) {
    const bannerIndex = _parseBannerIndex(jpegPath);
    if (bannerIndex == null) {
      continue;
    }

    const info = _getBannerInfo(bannerIndex);
    if (info.kind === 'skip') {
      console.info(chalk.gray(`Skipping ${basename(jpegPath)}`));
      continue;
    }

    const workshopSlug = CONFIG.WORKSHOP_ORDER[info.workshopIndex];
    if (workshopSlug == null) {
      throw new Error(
        `No workshop slug for banner #${String(bannerIndex).padStart(3, '0')} (index ${info.workshopIndex}). Update CONFIG.WORKSHOP_ORDER.`,
      );
    }

    if (info.kind === 'full') {
      await _convertFullBanner(jpegPath, workshopSlug);
    } else {
      await _convertThumbnailBanner(jpegPath, workshopSlug);
    }

    convertedCount++;
  }

  console.info(chalk.green(`Converted ${convertedCount} image(s).`));
}

function _parseBannerIndex(filePath: string): number | null {
  const match = basename(filePath).match(/^workshop-banners\.(\d+)\.jpeg$/i);
  return match == null ? null : Number.parseInt(match[1], 10);
}

type BannerInfo =
  | { kind: 'skip' }
  | { kind: 'full' | 'thumbnail'; workshopIndex: number };

/**
 * Every group of three banners: skip, full, thumbnail.
 * 001 skip · 002 full · 003 thumbnail · 004 skip · 005 full · …
 */
function _getBannerInfo(bannerIndex: number): BannerInfo {
  const remainder = bannerIndex % 3;
  if (remainder === 1) {
    return { kind: 'skip' };
  }

  const workshopIndex = Math.floor((bannerIndex - 2) / 3);
  return {
    kind: remainder === 2 ? 'full' : 'thumbnail',
    workshopIndex,
  };
}

async function _convertFullBanner(jpegPath: string, workshopSlug: string) {
  const webpPath = join(
    __dirname,
    '../libs/workshop/infra/workshops',
    `${workshopSlug}.webp`,
  );
  console.info(
    chalk.cyan(`Full banner ${basename(jpegPath)} → ${basename(webpPath)}`),
  );
  await $`cwebp -q ${CONFIG.WEBP_QUALITY} ${jpegPath} -o ${webpPath}`;
}

async function _convertThumbnailBanner(jpegPath: string, workshopSlug: string) {
  const workshopsDir = join(__dirname, '../libs/workshop/infra/workshops');
  const webpPath = join(workshopsDir, `${workshopSlug}-thumbnail.webp`);
  const croppedJpegPath = join(
    workshopsDir,
    `${workshopSlug}-thumbnail-crop.jpg`,
  );

  console.info(
    chalk.cyan(
      `Thumbnail ${basename(jpegPath)} → ${basename(webpPath)} (bottom ${CONFIG.THUMBNAIL_HEIGHT}px)`,
    ),
  );

  try {
    await $`magick ${jpegPath} -gravity South -crop x${CONFIG.THUMBNAIL_HEIGHT}+0+0 +repage ${croppedJpegPath}`;
    await $`cwebp -q ${CONFIG.WEBP_QUALITY} ${croppedJpegPath} -o ${webpPath}`;
  } finally {
    await $`rm -f ${croppedJpegPath}`;
  }
}
