# Design System

Audit of the design tokens and reusable components actually in use in this codebase, as of 2026-08-18. This is a **Tailwind v4** project (Astro + `@tailwindcss/vite`), so most tokens live as CSS custom properties registered through `@theme inline` in [src/styles/theme.css](src/styles/theme.css), consumed via Tailwind utility classes rather than a JS config file.

## 1. Color tokens

All color is semantic — nothing in components references a raw hex value directly. Defined in [src/styles/theme.css](src/styles/theme.css:16-24), derived from the Own Pace Outfitters trail-badge artwork.

| Token | Value | Role |
|---|---|---|
| `--background` | `#fbf7ec` (parchment) | Page/surface background |
| `--foreground` | `#1f2b22` (pine charcoal) | Body text |
| `--accent` | `#a85217` (trail rust) | Links, active nav, primary interactive color — deepened from the badge path for AA contrast |
| `--accent-foreground` | `#ffffff` | Text on top of `--accent` |
| `--muted` | `#efe7d2` (parchment-tan) | Subtle fills (code background, striped table rows) |
| `--muted-foreground` | `#5b6b57` (sage) | Secondary/de-emphasized text (dates, edit-post link) |
| `--border` | `#e3d9bf` (tan) | Hairline borders, dividers |

Each is re-exposed as a Tailwind color (`--color-background`, `--color-accent`, etc.) in the `@theme inline` block, so components use ordinary utilities: `bg-background`, `text-accent`, `border-border`, `bg-muted/75`, `text-muted-foreground`, `selection:bg-accent/75`. Opacity modifiers (`/25`, `/35`, `/75`, `/80`, `/85`) are used freely on top of the base tokens rather than defining separate tint tokens — that's intentional and consistent throughout.

There is **one dark theme was removed** (per recent commit history) — `:root` is the only palette; no `prefers-color-scheme` or `[data-theme]` overrides exist.

**Inconsistency found:** the image-zoom overlay in [src/pages/posts/\[...slug\]/index.astro:297](<src/pages/posts/[...slug]/index.astro#L297>) uses raw `bg-black/70` and `text-white` instead of the semantic tokens above — the only place in the codebase that steps outside the token set.

## 2. Typography tokens

Font families are registered in `@theme inline` ([src/styles/theme.css:10-12](src/styles/theme.css)) and loaded via Astro's experimental `fonts` API in [astro.config.ts:63-82](astro.config.ts):

| Token | Family | Weights loaded | Used for |
|---|---|---|---|
| `--font-heading` (`font-heading`) | Roboto Slab → ui-serif/Georgia/serif | 400, 600, 700 | All `h1`–`h6` (applied globally in [global.css:12-19](src/styles/global.css)), header wordmark |
| `--font-sans` (`font-sans`) | system stack (`-apple-system`, Segoe UI, Helvetica Neue, Arial) | n/a (system) | Body (`<body>` in Layout.astro) |
| `--font-mono` (`font-mono`) | Google Sans Code → monospace | 300–700 | `code`, `pre`, `kbd`, `samp` (global in [global.css:20-25](src/styles/global.css)) |

Type scale in use is the stock Tailwind scale — no custom `font-size` tokens. Observed usage across pages/components: `text-xs`, `text-sm` (most common, secondary text), `text-base`, `text-lg`, `text-xl`, `text-2xl` (section headings), `text-3xl`, `text-4xl`/`text-5xl` (home hero), `text-9xl` (404 glyph).

Weights in use: `font-light`, `font-normal`, `font-medium` (nav/links), `font-semibold` (page titles), `font-bold` (headings/emphasis) — again stock scale, no custom weight tokens.

## 3. Spacing

No custom spacing scale — everything is stock Tailwind (`0.25rem` steps). Padding/margin usage is consistent and mostly falls into a small recurring set: `p-1`/`p-2` (icon buttons), `px-3`/`px-4` + `py-1`–`py-3` (nav links, badges), `my-6`/`my-8`/`mt-8`/`mb-8` (vertical rhythm between sections), `gap-1`/`gap-2`/`gap-4`/`gap-6` (flex/grid gaps). Logical properties (`ms-`, `me-`, `inset-s-`, `inset-e-`) are used in a few RTL-aware spots (Header skip-link, back button, back-to-top button), which is worth keeping consistent as more components are added.

Two custom layout utilities effectively function as spacing/width tokens (defined via Tailwind v4 `@utility` in [global.css:37-43](src/styles/global.css)):

- `max-w-app` → `max-w-3xl`
- `app-layout` → `max-w-app mx-auto w-full px-4` — the standard page-content container, used on every top-level section (Header, Footer, Main, Breadcrumb, 404, index, back button)

## 4. Radii

Stock Tailwind radius scale, no custom `--radius-*` tokens. In use: `rounded` (default, `0.25rem` — search dev-mode banner/code), `rounded-md` (`0.375rem` — nav dropdown, header badge image, back-to-top button desktop state), `rounded-full` (back-to-top button mobile state, progress indicator), `rounded-none` (back-to-top button focus-visible override).

**Near-duplicate found:** the Pagefind search UI theme override in [src/pages/search.astro:133-135](src/pages/search.astro) hardcodes its own radius values instead of reusing the scale above: `--pagefind-ui-border-radius: 0.375rem` (matches `rounded-md`, but restated in rem rather than the class) and `--pagefind-ui-image-border-radius: 8px` (a different unit, and doesn't map cleanly to any Tailwind step — closest is between `rounded-md` and `rounded-lg`). Worth normalizing to `0.375rem` for both, or intentionally choosing a step from the scale.

## 5. Shadows

Only used in one component: the back-to-top button ([BackToTopButton.astro:19-24](<src/pages/posts/[...slug]/_components/BackToTopButton.astro>)) — `shadow-xl` on its mobile (floating) state, overridden to `shadow-none` at the `md:` breakpoint where it becomes an inline sticky button. No other shadow usage anywhere else in the codebase; nothing to consolidate.

## 6. Other custom utilities

Defined in [global.css](src/styles/global.css) via Tailwind v4's `@utility`:

- `active-nav` → `underline decoration-wavy decoration-2 underline-offset-8` — marks the current nav item (Header)

**Dead/undefined utility found:** `focus-outline` is referenced in four places ([Header.astro:80,106,165,188](src/components/Header.astro), [BackButton.astro:18](<src/pages/posts/[...slug]/_components/BackButton.astro>)) but is never defined anywhere (`@utility`, plugin, or otherwise) — it's a no-op class today. Real focus styling on those elements currently comes only from the global `a, button, #main-content` rule in [global.css:26-30](src/styles/global.css). Either wire up a real `focus-outline` utility or drop the dead references.

## 7. Component inventory

| Component | Purpose | Token usage |
|---|---|---|
| [Layout.astro](src/layouts/Layout.astro) | Root HTML shell: meta, fonts, `<body>` | `bg-background text-foreground`, `selection:bg-accent/75 selection:text-accent-foreground`, `font-sans` |
| [PostLayout.astro](src/layouts/PostLayout.astro) | Wraps Layout for posts; adds JSON-LD + OG article meta | No styling of its own |
| [Header.astro](src/components/Header.astro) | Site header: skip-link, wordmark/badge, primary nav, About dropdown | `bg-background`, `border-border`, `text-accent`, `font-heading`, `rounded-md`, `shadow-md`, `active-nav` |
| [Footer.astro](src/components/Footer.astro) | Footer: socials, copyright, sibling-brand links | `border-border`, `text-accent` (via hover) |
| [Main.astro](src/components/Main.astro) | Page wrapper: `<h1>`+description+slot, sets back-navigation URL | `app-layout`, stock type scale |
| [Card.astro](src/components/Card.astro) | Post-list item (title link + `Datetime` + description) | `text-accent`, `text-lg font-medium` |
| [Tag.astro](src/components/Tag.astro) | Hashtag-style tag link, `sm`/`lg` size variants | `text-foreground`/`text-accent`, `border-foreground`/`hover:border-accent` |
| [LinkButton.astro](src/components/LinkButton.astro) | Unstyled-by-default link/span wrapper (icon + text pattern), disables to `<span>` | `hover:text-accent` only — otherwise a bare layout primitive callers style via `class` |
| [Breadcrumb.astro](src/components/Breadcrumb.astro) | Path-based breadcrumb nav | `app-layout`, opacity-scaled text (no custom tokens) |
| [Pagination.astro](src/components/Pagination.astro) | Prev/next post-list navigation, built on `LinkButton` | Inherits `LinkButton`/`IconArrow*` |
| [Datetime.astro](src/components/Datetime.astro) | Published/updated date display, `sm`/`lg` size variants | `text-muted-foreground`, `text-sm`/`sm:text-base` |
| [Socials.astro](src/components/Socials.astro) | Social-icon row, built on `LinkButton` | `p-2`/`sm:p-1`, `size-6` icons |
| [ResponsiveTable.astro](src/components/ResponsiveTable.astro) | Table wrapper with `minimal`/`striped`/`striped-minimal` variants | `bg-muted/25` (striped rows), border removal via arbitrary selectors |
| `_components/AdjacentPostNav.astro`, `BackButton.astro`, `BackToTopButton.astro`, `EditPost.astro`, `ShareLinks.astro` | Post-detail-page-only components (route-scoped, under `src/pages/posts/[...slug]/_components/`) | `text-accent/85`, `text-muted-foreground`, `shadow-xl`→`shadow-none`, `rounded-full`→`rounded-md`, dead `focus-outline` (see §6) |

`.app-prose` in [src/styles/typography.css](src/styles/typography.css) is the de-facto "rich text component" — a `@tailwindcss/typography` override layer applied to all Markdown-rendered content (About, Contact, What We Offer, post bodies). It's where prose-specific token usage lives: `text-foreground`, `text-accent` (links/list markers/blockquote border), `border-border` (rules, images, table cells), `bg-muted/75` (inline code).

## 8. Summary of issues found

1. **`focus-outline` is a dead utility class** — used in 4 places, defined nowhere. (§6)
2. **Pagefind's CSS-variable theme override restates radius values instead of reusing the scale**, and does so in inconsistent units (`rem` vs `px`). (§4)
3. **One raw-color escape hatch**: the image-zoom lightbox overlay uses `bg-black/70`/`text-white` instead of the semantic tokens. (§1)

None of these are urgent — the token set itself is small, consistent, and fully semantic (no hardcoded hex outside `theme.css` and the one lightbox exception above).
