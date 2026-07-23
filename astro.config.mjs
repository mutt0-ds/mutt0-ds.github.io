// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeLinkIcons from './src/lib/rehype-link-icons.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://mutto.fyi',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeLinkIcons],
  },
});
