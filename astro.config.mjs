// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

import remarkStripFirstH1 from './src/lib/remark/remark-strip-first-h1.mjs';
import remarkImageFigure from './src/lib/remark/remark-image-figure.mjs';

export default defineConfig({
  site: 'https://writingcontrol.org',
  output: 'static',
  adapter: netlify(),
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkStripFirstH1, remarkImageFigure],
  },
  vite: {
    server: {
      allowedHosts: ['orion-m4'],
    },
  },
});
