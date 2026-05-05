# CUT Site — Domain Glossary

Vocabulary used in architecture discussions and code. See LANGUAGE.md (in the improve-codebase-architecture skill) for structural terms.

## Content types

**Licenciatura** — undergraduate program (4-year degree). URL: `/licenciaturas/:slug`. Collection: `licenciaturas`.

**Maestría** — graduate program (master's degree). URL: `/maestrias/:slug`. Collection: `maestrias`.

**Post** — news article or institutional announcement. URL: `/posts/:slug`. Collection: `posts`.

**Page** — generic CMS-managed static page. URL: `/:slug`. Collection: `pages`.

## Layout concepts

**Program Detail** — shared page structure for Licenciatura and Maestría detail pages. Slots: `hero`, `content-main`, `sidebar`, `mid`, `curriculum`, `cta`. Layout: `src/layouts/ProgramDetail.astro`.

**Entry Page** — any page that resolves a single CMS entry by slug, redirects on missing entry, sets cache, and computes SEO meta. Utility: `src/utils/resolve-entry-page.ts`.

## Data conventions

- `entry.id` = URL slug
- `entry.data.id` = database ULID (use for `getEntryTerms`, `content.id` in `<Base>`)
- `curriculum.semesters` = array of semester objects (type: `unknown` — cast with `as any`)
- `characteristics` = program stats object on Maestría entries (type: `unknown` — cast with `as any`)
