import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../lib/seo';
import { countStars, getExcerpt } from '../lib/text';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const books = (await getCollection('books')).sort(
    (a, b) => countStars(b.data.score) - countStars(a.data.score) || b.data.finished.valueOf() - a.data.finished.valueOf(),
  );

  const lines = [
    '# mutto.fyi',
    '',
    "> Davide Muttoni's personal site: posts on AI, data engineering and software, plus personal notes on 250+ books, mostly non-fiction (rating, takeaways). Every page has a plain Markdown version at the same URL with `.md` instead of the trailing slash.",
    '',
    '## Posts',
    '',
    ...posts.map((p) => `- [${p.data.title}](${SITE_URL}posts/${p.id}.md): ${getExcerpt(p.body ?? '', 160)}`),
    '',
    '## Book notes',
    '',
    ...books.map((b) => {
      const stars = countStars(b.data.score);
      return `- [${b.data.title} by ${b.data.author}](${SITE_URL}books/${b.id}.md)${stars ? ` (${stars}/5)` : ''}: ${b.data.summary.replace(/\s+/g, ' ').trim()}`;
    }),
    '',
    '## Optional',
    '',
    `- [About and contact](${SITE_URL}contact/)`,
    `- [RSS feed](${SITE_URL}index.xml)`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
