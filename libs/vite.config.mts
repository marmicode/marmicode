/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { join } from 'node:path/posix';
import { defineConfig } from 'vite';

const testSetupPath = join(__dirname, 'test-setup.ts');

export default defineConfig(() => ({
  root: __dirname,
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  test: {
    passWithNoTests: true,
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: [testSetupPath],
    reporters: ['default'],
    coverage: {
      provider: 'v8' as const,
    },
  },
}));
