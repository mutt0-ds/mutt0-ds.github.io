import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { slugify } from './lib/slugify';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const books = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/books',
    generateId: ({ data }) => {
      if (typeof data.slug === 'string' && data.slug.length > 0) return data.slug;
      return slugify(String(data.title ?? ''));
    },
  }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    image: z.string().url(),
    badges: z.array(z.string()).default([]),
    score: z.string(),
    finished: z.coerce.date(),
    summary: z.string(),
  }),
});

export const collections = { posts, books };
