# Frontmatter Skill — Astro (Solo-compatible)

You are generating or transforming Astro code that MUST be compatible with Frontmatter Solo.

---

## Validation target

The result MUST pass:

frontmatter solo:validate

---

## Core principle

Layout stays in code. Content becomes data.

---

## Context

You are working inside an existing Astro project.

You MUST:
- follow existing component patterns
- reuse components when possible
- preserve explicit structure
- simplify unsupported patterns instead of forcing them

This is NOT a generic Astro assistant.  
This is a strict compatibility skill for Frontmatter Solo.

---

## Data contract (minimal)

Frontmatter Solo renders templates using a single namespace:

- `fm.site` → global site data
- `fm.page` → page-level data
- `fm.data` → collections / datasets
- `fm.props` → component inputs (partials)

Implications for Astro:

- pages and layouts should expose clear page-level values
- components should use simple scalar props that map directly to `fm.props`
- do not invent complex nested data structures
- do not rely on computed data inside components

Think:
→ explicit inputs now  
→ mapped to `fm.*` at render time

---

## Absolute constraints

### 1. Layout

- Exactly ONE layout per page
- No nested layouts
- No dynamic layout selection

### 2. Props

Components MUST only use literal scalar props:

- string
- number
- boolean
- null

DO NOT use:
- arrays in props
- objects in props
- functions in props
- computed expressions
- property access in props
- concatenation in props

Examples of disallowed props:

- `headline={page.title}`
- `title={site.cta.title}`
- `headline={"Hello " + name}`

Exception:
- allowed ONLY for explicitly blessed components:
  - `SEOPage`
  - `SEOWebsite`
  - `SEOArticle`
  - `SEOOrganisation`
  - `SEOLocalBusiness`
- `RichText` only if already present as a trusted path

### 3. Rendering

Do NOT use in Astro source:

- `.map()`
- loops
- array iteration
- `Object.values`, `sort`, `filter`
- `new Date()`
- arbitrary JS in frontmatter

No dynamic rendering logic.

Allowed:
- explicit repeated markup
- static structure only

Note:
Loops are allowed later in generated templates (Twig/PHP via `fm.data`),
but NEVER in Astro source.

### 4. Styling

Allowed:

- global CSS
- global SCSS
- inline styles

Disallowed:

- `<style>` blocks in components
- scoped Astro CSS
- CSS modules

### 5. Data

Do NOT use:

- `import.meta.glob`
- runtime data fetching
- dynamic imports
- page-level orchestration logic

### 6. JavaScript

Do NOT add:

- `<script>` in Astro components
- client-side interactivity
- `client:*`
- islands

### 7. Images

Use only:

```html
<img src="/images/..." />
```

Do NOT use:

- Astro image pipeline
- dynamic sources
- processing components

## Allowed patterns

### Deterministic components

Components must be:

deterministic
explicit
readable
backend-friendly

### Repetition

When multiple items are needed:

Allowed:

- explicit repeated markup
- multiple component instances

Do NOT:

- pass arrays as props
- use `.map()`

## Transformation rules

This is NOT a 1:1 conversion system.

You MUST:

- adapt structure to the Solo contract
- simplify logic
- remove unsupported patterns
- prefer explicit markup over abstraction
- prefer duplication over cleverness

## Failure behavior (CRITICAL)
