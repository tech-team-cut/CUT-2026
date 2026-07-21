# Guía para desarrolladores — CUT

Sitio institucional de CUT (Centro Universitario Tlacaélel), construido con [EmDash CMS](https://github.com/emdash-cms/emdash) sobre Astro y desplegado en Cloudflare Workers.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro (SSR, `output: "server"`) |
| CMS | EmDash |
| Runtime | Cloudflare Workers |
| Base de datos | Cloudflare D1 (SQLite) |
| Almacenamiento | Cloudflare R2 |
| Caché de sesión | Cloudflare KV |

---

## Configuración local

### Requisitos

- Node.js 22+
- Cuenta en Cloudflare (solo para deploy)

### Primer arranque

```bash
git clone <repo>
cd cut-2026
npm install
npx emdash dev
```

`emdash dev` hace tres cosas: corre migraciones sobre la base de datos local, aplica el seed, y arranca el servidor de Astro.

- Sitio: http://localhost:4321
- Admin: http://localhost:4321/_emdash/admin

Para el admin en local no se requiere contraseña — el bypass de desarrollo está activo automáticamente.

### Regenerar tipos TypeScript

Después de modificar el esquema (colecciones o campos), regenera los tipos:

```bash
npx emdash types
```

Escribe `emdash-env.d.ts` en la raíz. Este archivo se auto-genera — no lo edites a mano.

---

## Estructura del proyecto

```
cut-2026/
├── src/
│   ├── pages/          # Rutas Astro (todas SSR)
│   ├── layouts/        # Base.astro y layouts de sección
│   ├── components/     # Componentes React y Astro
│   ├── styles/         # CSS global y tokens de diseño
│   └── utils/          # Helpers (resolve-entry-page, site-identity, etc.)
├── seed/
│   └── seed.json       # Esquema de colecciones + contenido demo
├── docs/               # Esta documentación
├── public/             # Assets estáticos
├── astro.config.mjs    # Configuración de Astro + integración EmDash
└── wrangler.jsonc      # Configuración de Cloudflare Workers
```

### Reglas importantes

- **Todas las páginas son SSR.** No uses `getStaticPaths()` para contenido del CMS.
- Los campos de imagen son objetos `{ src, alt }`, no strings. Usa `<Image image={...} />` de `"emdash/ui"`.
- `entry.id` = slug (para URLs). `entry.data.id` = ULID de base de datos (para llamadas API como `getEntryTerms`).
- Siempre llama `Astro.cache.set(cacheHint)` en páginas que consultan contenido.

---

## Colecciones y esquema

El esquema vive en `seed/seed.json`. Define colecciones, campos, taxonomías y menús.

### Colecciones actuales

| Slug | Label | Descripción |
|---|---|---|
| `posts` | Noticias | Noticias e artículos |
| `pages` | Páginas | Páginas estáticas del CMS |
| `licenciaturas` | Licenciaturas | Programas de licenciatura |
| `maestrias` | Maestrías | Programas de posgrado |
| `announcements` | Anuncios | Avisos temporales |
| `aviso_destacado` | Aviso Destacado | Hero highlight de la home |
| `library_collections` | Acervos Bibliotecarios | Colecciones de biblioteca |

### Agregar una colección nueva

**Opción A — vía CLI (solo para producción o instancias remotas):**

```bash
npx emdash schema create mi_coleccion --label "Mi Colección" \
  --url https://cut.com.mx

npx emdash schema add-field mi_coleccion titulo --type string --label "Título" --required \
  --url https://cut.com.mx
```

**Opción B — vía seed (recomendada para desarrollo):**

1. Agrega la colección y sus campos en `seed/seed.json` dentro de `"collections"`.
2. Agrega contenido demo en `seed/seed.json` dentro de `"content"`.
3. Valida: `npx emdash seed seed/seed.json --validate`
4. Reinicia el servidor para aplicar migraciones.

> Tipos de campo disponibles: `string`, `text`, `number`, `integer`, `boolean`, `datetime`, `image`, `reference`, `portableText`, `json`.

---

## Consultar contenido en páginas

```typescript
import { getEmDashCollection, getEmDashEntry } from "emdash"

// Lista
const { entries, cacheHint } = await getEmDashCollection("posts", {
  orderBy: { published_at: "desc" },
  limit: 10,
})
Astro.cache.set(cacheHint)

// Entrada única por slug
const { entry, cacheHint } = await getEmDashEntry("posts", Astro.params.slug)
if (!entry) return Astro.redirect("/404")
Astro.cache.set(cacheHint)
```

---

## Deploy a Cloudflare

### Prerequisitos

- `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` configurados (en CI o `.dev.vars` local).
- Base de datos D1 creada: `npx wrangler d1 create cut-2026` y el ID registrado en `wrangler.jsonc`.

### Deploy manual

```bash
npm run deploy
# equivalente a: astro build && wrangler deploy
```

### Deploy automático (CI)

El workflow `.github/workflows/deploy-preview.yml` despliega automáticamente en cada PR a `main`.

El merge a `main` **no despliega automáticamente** — se hace manualmente o se puede agregar un workflow de deploy en `push` a `main`.

### Aplicar seed en producción

El seed aplica el esquema y el contenido demo. Solo es necesario en el primer setup o después de un reset de la base de datos:

```bash
# No hay comando directo para D1 remota vía seed.
# Usa el CLI de EmDash para crear colecciones y contenido en remoto:
npx emdash schema create ... --url https://cut.com.mx
npx emdash content create ... --url https://cut.com.mx
```

---

## Variables de entorno

| Variable | Dónde | Descripción |
|---|---|---|
| `EMDASH_SECRET` | Workers secret | Clave de cifrado de sesiones |
| `CLOUDFLARE_API_TOKEN` | CI / `.dev.vars` | Token para deploy con Wrangler |
| `CLOUDFLARE_ACCOUNT_ID` | CI / `.dev.vars` | ID de cuenta Cloudflare |

Para desarrollo local, crea `.dev.vars` en la raíz:

```bash
EMDASH_SECRET=cualquier-cadena-larga-aqui
```

---

## Comandos frecuentes

```bash
npx emdash dev                              # Servidor local con migraciones
npx emdash types                            # Regenerar tipos TS
npx emdash seed seed/seed.json --validate   # Validar seed sin aplicar
npx emdash content list posts               # Listar contenido local
npx emdash whoami                           # Ver sesión activa
npm run deploy                              # Build + deploy a Cloudflare
npm run typecheck                           # Type check con astro check
npm run lint                                # Lint con oxlint
```
