# Style guide

Single source of truth for the front-end. Tokens live in `src/styles/tokens.css` — every page/component should read colors and fonts from these custom properties, never hardcode a hex value or font stack.

## Palette

Light and dark are both first-class (switched by `prefers-color-scheme`, overridable via `data-theme` on `<html>` for a future manual toggle).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#EAF2F2` | `#0A1B1F` | page background |
| `--ink` | `#123138` | `#E7F2F2` | primary text |
| `--ink-70` / `--ink-45` | tints of ink | tints of ink | secondary/tertiary text |
| `--hairline` | tint of ink, 15% | tint of ink, 15% | dividers, borders |
| `--accent` | `#12798C` | `#4FC3D9` | the one accent color — links, hover states, the lake mark |
| `--lake-light` / `--lake-deep` | lighter/deeper accent | lighter/deeper accent | the gradient used on the hero name, section rules, hover underlines |
| `--spine-1..4` | tints mixing ink/accent into paper | same, dark-adjusted | book spine background variety |

Never introduce a second accent hue. Depth and variety come from mixing `--ink` and `--accent` into `--paper` (via `color-mix()`, with flat-hex fallbacks for older browsers), not from new colors.

## Type

Two system font stacks, no webfonts:

- `--font-display`: `"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif` — headings, post/book titles, the hero name, nav wordmark.
- `--font-body`: `"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif` — everything else (paragraphs, captions, nav links).

Type scales fluidly with `clamp(min, preferred-vw, max)` rather than fixed breakpoints — see any heading rule for the pattern.

## Signature components (don't duplicate, reuse)

- **Lake mark** (`src/components/LakeMark.astro`) — Lake Como's real traced outline inside hand-wobbled contour rings. **Homepage hero only.** It's a one-time flourish, not a site-wide logo.
- **Gauge line** (post list styling in `src/styles/`) — a vertical gradient line with a dot per entry, used on any chronological post list (homepage teaser and the full `/posts` index both use it via `PostListItem.astro`).
- **Book shelf** (`src/components/BookShelf.astro`) — tilted, varied-height spines with a top sheen. This is a **teaser treatment** for a small curated set (the homepage). The full `/books` browse page (242 entries) uses a plain grid instead — don't force the whole library into one tilted scroll strip.
- **Gradient text/underline** — the same `--lake-deep → --accent → --lake-light` gradient reused as `background-clip: text` (hero name) and as a `background-image` underline reveal (title hover states, section rules). One gradient, several small applications — don't invent a second one.

## Ground rules

- No CSS framework, no component library. Plain Astro `<style>` blocks (scoped per component) plus the one shared `tokens.css`.
- Keep it minimal — this is a ~280-entry personal site, not a design system product. Componentize only what's genuinely reused across ≥2 pages.
- Every visual change gets checked with a real screenshot (light + dark + mobile) before being called done.
