import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { bookMarkdown } from '../../lib/markdown-export';
import { countStars } from '../../lib/text';

export const getStaticPaths = (async () => {
  const books = await getCollection('books');
  return books.map((book) => ({ params: { slug: book.id }, props: { book } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ book: CollectionEntry<'books'> }> = ({ props }) =>
  bookMarkdown(props.book, countStars(props.book.data.score));
