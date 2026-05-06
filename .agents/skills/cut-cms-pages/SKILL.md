---
name: cut-cms-pages
description: Edit CUT pages stored in the EmDash CMS `pages` collection. Use when the user asks to update, create, or fix content on a CMS-backed page (not static .astro files). Covers the edit flow, portableText block formats, and known page index.
---

# CUT CMS Pages — Edit Skill

Pages in this site are managed in the EmDash `pages` collection. They render via `src/pages/[slug].astro` and are accessible at `/{slug}`.

Dev server typically runs on **port 4322** (confirm with user if unsure). All commands below use `--url http://localhost:4322`.

---

## Pages Collection Schema

```
collection: pages
fields:
  title         string       required
  content       portableText optional  (stored as PT blocks, CLI shows as markdown)
  featured_image image       optional
```

Supports: drafts, revisions, search. No SEO fields.

---

## Known Pages Index

| slug | id | title |
|------|----|-------|
| servicio-social | 01KQZNVK31802R2V8AGF15DN2S | Servicio Social |
| servicios-escolares | 01KQQGCAWF57K5SCFRNB12NQ9D | Servicios Escolares |
| ejercicio-profesional-docente | 01KQQGCACED0Y3QH4W1BETAA64 | Ejercicio Profesional Docente |
| biblioteca | 01KQQGC9VKAP51AZRP6PQM2EXD | Biblioteca |
| galeria | 01KQQGC9BXZKSV8G69VH309RYQ | Galería |
| liberar-alfabetizando | 01KQQGC8W1JFM94APWT2ECWJAQ | Liberar Alfabetizando |
| reglamento | 01KQQGC8BMT9EH75YFX1H635AE | Reglamento |
| acerca-de | 01KQQGC7V8E9QYCKXYA0Q1B58Z | Acerca de |
| control-escolar | 01KQQGC03HWZ5S1PCYNKSM4K6H | Control Escolar |
| titulacion | 01KQQGBZ3NHN7Y7DRHZYBDEBCY | Titulación |
| ejercicio-profesional | 01KQQGBYKTH5067FFN2GWBVN88 | Ejercicio Profesional |
| convocatoria | 01KQQGBY3PA3YFF47WGV9HA2YX | Convocatoria de Admisión |
| nosotros | 01KQQGBXKJCJHX440NSC1N93EG | Sobre Nosotros |

> IDs are stable unless the DB is reseeded. If a `get` returns "not found", run `list` to refresh the ID.

---

## Edit Flow

**Never** guess content — always `get` first to read current state and capture `_rev`.

### Step 1 — Get current content + _rev

```bash
npx emdash content get pages <ID> --url http://localhost:4322
```

Save the `_rev` value from the response. Required for update.

To inspect raw portableText blocks (not markdown):
```bash
npx emdash content get pages <ID> --url http://localhost:4322 --raw --json
```

### Step 2 — Write updated content to a temp file

Write the new `title` + `content` (markdown string) to `/tmp/page-update.json`:

```json
{
  "title": "Page Title",
  "content": "## Heading\n\nParagraph text.\n\n- list item"
}
```

### Step 3 — Update

```bash
cat /tmp/page-update.json | npx emdash content update pages <ID> \
  --url http://localhost:4322 \
  --rev "<_rev from step 1>" \
  --stdin
```

---

## Markdown Content Tips

The CLI accepts markdown strings for `content`. Markdown converts to portableText internally.

| Markdown | Renders as |
|----------|------------|
| `## Heading` | h2 block |
| `**bold**` | bold mark |
| `- item` | bullet list |
| `1. item` | numbered list |
| `[label](url)` | link |
| pipe tables | **DOES NOT PARSE** — use raw PT block (see below) |

---

## PortableText Table Block (Critical)

Markdown pipe tables are **not parsed** — they become raw text blocks. Always inject tables as raw portableText JSON.

### Table block structure

```json
{
  "_type": "table",
  "_key": "unique_key",
  "hasHeaderRow": true,
  "rows": [
    {
      "_type": "tableRow",
      "_key": "tr_header",
      "cells": [
        {
          "_type": "tableCell",
          "_key": "h0",
          "content": [{"_type": "span", "_key": "h0s", "text": "Col A", "marks": []}],
          "isHeader": true
        }
      ]
    },
    {
      "_type": "tableRow",
      "_key": "tr0",
      "cells": [
        {
          "_type": "tableCell",
          "_key": "tc00",
          "content": [{"_type": "span", "_key": "tc00s", "text": "Value", "marks": []}],
          "isHeader": false
        }
      ]
    }
  ]
}
```

### How to inject a table into existing content

1. Get raw blocks: `--raw --json`
2. In Python, find block indices of any pipe-text blocks
3. Build the table block object
4. Splice it in: `new_blocks = blocks[:N] + [table_block] + blocks[N+M:]`
5. Write full `{"title": ..., "content": new_blocks}` to file
6. Update with `--stdin`

When the CLI shows `<!--ec:block {...}-->` in markdown output, the non-standard block IS stored correctly — that comment is just the markdown serialization.

---

## Common Portabletext Blocks Reference

```json
// Paragraph
{"_type": "block", "_key": "k0", "style": "normal", "children": [{"_type": "span", "_key": "k0s", "text": "text", "marks": []}], "markDefs": []}

// Heading h2
{"_type": "block", "_key": "k1", "style": "h2", "children": [{"_type": "span", "_key": "k1s", "text": "Heading", "marks": []}], "markDefs": []}

// Bullet list item
{"_type": "block", "_key": "k2", "style": "normal", "listItem": "bullet", "level": 1, "children": [{"_type": "span", "_key": "k2s", "text": "Item", "marks": []}], "markDefs": []}

// Numbered list item
{"_type": "block", "_key": "k3", "style": "normal", "listItem": "number", "level": 1, "children": [{"_type": "span", "_key": "k3s", "text": "Item", "marks": []}], "markDefs": []}

// Bold span
{"_type": "span", "_key": "k4", "text": "Bold text", "marks": ["strong"]}

// Link (needs markDef)
// In markDefs: {"_type": "link", "_key": "lnk1", "href": "https://example.com"}
// In span marks: ["lnk1"]
```

---

## Refreshing the Page Index

If IDs seem stale or a page returns "not found":

```bash
npx emdash content list pages --url http://localhost:4322 --json | \
  python3 -c "import sys,json; d=json.load(sys.stdin); [print(i['id'], i['slug'], i['title']) for i in d['items']]"
```

Update the Known Pages Index table in this skill file with the new IDs.
