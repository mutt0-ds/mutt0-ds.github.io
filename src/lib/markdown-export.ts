import type { CollectionEntry } from 'astro:content';
import { SITE_URL, toIsoDate } from './seo';

// Root-relative links and images break once the Markdown leaves the site.
function absolutize(markdown: string): string {
  return markdown.replace(/(\]\(|src=["'])\/(?!\/)/g, `$1${SITE_URL}`);
}

function markdownResponse(body: string): Response {
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}

export function postMarkdown(post: CollectionEntry<'posts'>): Response {
  const url = `${SITE_URL}posts/${post.id}/`;
  const meta = [
    `- URL: ${url}`,
    `- Author: Davide Muttoni`,
    `- Published: ${toIsoDate(post.data.date)}`,
    post.data.tags.length ? `- Tags: ${post.data.tags.join(', ')}` : '',
  ].filter(Boolean);
  return markdownResponse(`# ${post.data.title}\n\n${meta.join('\n')}\n\n${absolutize(post.body ?? '').trim()}\n`);
}

export function bookMarkdown(book: CollectionEntry<'books'>, stars: number): Response {
  const url = `${SITE_URL}books/${book.id}/`;
  const meta = [
    `- URL: ${url}`,
    `- Book author: ${book.data.author}`,
    `- Notes by: Davide Muttoni`,
    stars ? `- Rating: ${stars}/5` : '',
    `- Finished: ${toIsoDate(book.data.finished)}`,
  ].filter(Boolean);
  return markdownResponse(
    `# ${book.data.title} by ${book.data.author}: book notes\n\n${meta.join('\n')}\n\n> ${book.data.summary}\n\n${absolutize(book.body ?? '').trim()}\n`,
  );
}
