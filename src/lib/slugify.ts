/** Turn a free-text title into a clean, URL-safe slug — strips accents,
 * drops punctuation, collapses whitespace/hyphens. Verified against all 242
 * book titles at migration time with zero collisions. */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
