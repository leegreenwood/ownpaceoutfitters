# Own Pace Outfitters

Marketing site for **Own Pace Outfitters**, a Duke of Edinburgh's Award expedition delivery service — a trading name of [Independent Youth Volunteer Support (IYVS)](https://iyvs.org.uk) CIC, alongside its sibling programmes [Zanshin Archery](https://zanshinarchery.co.uk) and [Greenwood Bushcraft](https://greenwoodbushcraft.co.uk).

Live at [ownpaceoutfitters.co.uk](https://ownpaceoutfitters.co.uk/).

Built with [Astro](https://astro.build/), on top of the [AstroPaper](https://github.com/satnaing/astro-paper) theme.

## Site contents

- **Marketing pages** (`src/content/pages/`) — About, About Lee, What We Offer, Contact. Each is Markdown content rendered through a matching route in `src/pages/`.
- **News/blog** (`src/content/posts/`) — announcements and updates, e.g. team news. Supports tags, drafts, RSS, and dynamic OG image generation.
- **Design system** — see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the color, typography, and component tokens in use (derived from the Own Pace Outfitters trail-badge artwork). Check it before introducing new styling.

## Project structure

```bash
/
├── public/                   # static assets (favicon, default OG image)
├── src/
│   ├── assets/                # icons & images
│   ├── components/            # shared Astro components (Header, Footer, etc.)
│   ├── content/
│   │   ├── pages/              # About, About Lee, What We Offer, Contact (Markdown)
│   │   └── posts/              # news/blog posts (Markdown, tagged)
│   ├── layouts/
│   ├── pages/                  # route definitions, incl. about.astro, about-lee.astro,
│   │   │                       # contact.astro, what-we-offer.astro, posts/, tags/, archives/
│   ├── styles/                 # Tailwind v4 theme tokens (theme.css)
│   ├── config.ts               # resolved runtime config
│   └── content.config.ts       # content collection schemas (pages, posts)
├── astro-paper.config.ts     # site title, description, author, socials, feature flags
├── astro.config.ts
└── DESIGN_SYSTEM.md           # design token & component audit
```

## Tech stack

- **Framework** — [Astro](https://astro.build/)
- **Styling** — [TailwindCSS v4](https://tailwindcss.com/)
- **Type checking** — [TypeScript](https://www.typescriptlang.org/)
- **Static search** — [Pagefind](https://pagefind.app/)
- **Dynamic OG images** — [Satori](https://github.com/vercel/satori) + [Sharp](https://sharp.pixelplumbing.com/)
- **Linting/formatting** — [ESLint](https://eslint.org) + [Prettier](https://prettier.io/)
- **Package manager** — [pnpm](https://pnpm.io/)

## Running locally

```bash
pnpm install
pnpm dev
```

Site runs at `http://localhost:4321`.

## Commands

| Command              | Action                                                                                    |
| :------------------- | :----------------------------------------------------------------------------------------- |
| `pnpm install`       | Installs dependencies                                                                      |
| `pnpm dev`           | Starts local dev server at `localhost:4321`                                                |
| `pnpm build`         | Type-checks, builds the site, runs Pagefind indexing, and copies the index to `public/pagefind/` |
| `pnpm preview`       | Preview the production build locally before deploying                                      |
| `pnpm sync`          | Generates TypeScript types for content collections                                         |
| `pnpm lint`          | Lints the codebase with ESLint                                                              |
| `pnpm format`        | Formats the codebase with Prettier                                                          |
| `pnpm format:check`  | Checks formatting without writing changes                                                  |
| `pnpm astro ...`     | Run Astro CLI commands, e.g. `astro check`                                                  |

## Editing content

- **Marketing pages** — edit the corresponding Markdown file in `src/content/pages/`. Adding a new page also requires a route file in `src/pages/`.
- **News/blog posts** — add a new Markdown file to `src/content/posts/`. Frontmatter fields (`title`, `description`, `pubDatetime`, `tags`, `draft`, `featured`, etc.) are defined in `src/content.config.ts`.
- **Site metadata** (title, description, author, socials, feature flags) — `astro-paper.config.ts`.

## CI

Pull requests run lint, format-check, and build via [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## License

Site content and configuration © Own Pace Outfitters / IYVS CIC. Underlying theme (AstroPaper) is MIT licensed — see upstream [satnaing/astro-paper](https://github.com/satnaing/astro-paper) for theme license and credit.
