import { getCollection } from 'astro:content';
import { getExcerpt } from '../lib/text';

export async function GET() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const books = await getCollection('books');

  const items = [
    ...posts.map((post) => ({
      type: 'post',
      title: post.data.title,
      url: `/posts/${post.id}/`,
      date: post.data.date.toISOString(),
      text: getExcerpt(post.body ?? '', 200),
    })),
    ...books.map((book) => ({
      type: 'book',
      title: book.data.title,
      author: book.data.author,
      url: `/books/${book.id}/`,
      date: book.data.finished.toISOString(),
      text: book.data.summary,
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}
