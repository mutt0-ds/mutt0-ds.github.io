/** Strip Markdown/HTML down to plain text and truncate — used where a post
 * has no real description in front matter, so the list can still show a
 * useful one-line teaser instead of nothing. */
export function getExcerpt(markdown: string, maxLength = 140): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_]/g, '')
    .replace(/[#>~`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/** Book badges are free text like "🧘‍♀️ Lifestyle" — the emoji vary wildly in
 * color and clash with the site's controlled palette, so strip any leading
 * emoji/symbols and keep just the label. */
export function stripLeadingEmoji(text: string): string {
  return text.replace(/^[^\p{L}\p{N}]+/u, '').trim();
}

/** `score` is a literal star-emoji string (e.g. "⭐⭐⭐⭐"), not a number —
 * count the base star codepoint only, since some entries attach a trailing
 * variation selector (⭐️ = U+2B50 U+FE0F) and some don't, for the same
 * visual star. */
export function countStars(score: string): number {
  return (score.match(/⭐/gu) ?? []).length;
}
