/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { join } from 'node:path/posix';
import { defineConfig } from 'vite';

const testSetupPath = join(__dirname, 'test-setup.ts');
const tsconfig = join(__dirname, 'tsconfig.spec.json');

export default defineConfig(() => ({
  root: __dirname,
  plugins: [
    angular({ tsconfig }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  test: {
    passWithNoTests: true,
    watch: false,
    globals: true,
    environment: 'jsdom',
    isolate: false,
    pool: 'threads',
    testTimeout: 1_000,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: [testSetupPath],
    reporters: ['default'],
    coverage: {
      provider: 'v8' as const,
    },
  },
}));
