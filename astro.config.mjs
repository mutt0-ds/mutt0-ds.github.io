// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeLinkIcons from './src/lib/rehype-link-icons.ts';
import { slugify } from './src/lib/slugify.ts';

const SITE = 'https://mutto.fyi';

/** @param {string} dir @returns {string[]} */
function listMarkdown(dir) {
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.md'))
    .map((f) => join(dir, f));
}

/** @param {string} file @returns {Record<string, any>} */
function frontmatter(file) {
  return parse(readFileSync(file, 'utf8').split(/^---\s*$/m)[1] ?? '') ?? {};
}

// Mirrors the URL logic in src/content.config.ts and the page routes.
function buildLastmodMap() {
  /** @type {Map<string, string>} */
  const map = new Map();
  for (const file of listMarkdown('src/content/posts')) {
    const { lastmod, date } = frontmatter(file);
    const id = relative('src/content/posts', file).replace(/\\/g, '/').replace(/\.md$/, '');
    if (lastmod ?? date) map.set(`${SITE}/posts/${id}/`, lastmod ?? date);
  }
  for (const file of listMarkdown('src/content/books')) {
    const { slug, title, finished } = frontmatter(file);
    if (finished) map.set(`${SITE}/books/${slug || slugify(String(title ?? ''))}/`, finished);
  }
  return map;
}

const lastmod = buildLastmodMap();

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Tag pages are thin link lists; keeping them out of the sitemap focuses crawl budget.
      filter: (page) => !page.startsWith(`${SITE}/tags/`),
      serialize(item) {
        const date = lastmod.get(item.url);
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeLinkIcons] }),
  },
});
