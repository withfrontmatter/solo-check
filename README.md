# Frontmatter Solo Check

Validate an Astro project against the Frontmatter Solo contract.

[Frontmatter Solo](https://frontmatter.tech/solo)

## What It Is

`@withfrontmatter/solo-check` is a free validation CLI.

It tells you whether an Astro project is compatible with Frontmatter Solo before build time and before purchase.

It does not:

- generate templates
- build output
- emit files
- produce Twig or PHP

It only validates.

## Why It Exists

Frontmatter Solo works with a constrained subset of Astro.
Not every Astro project is compatible as-is.

`solo-check` gives you that answer upfront, with stable error codes and concrete fix suggestions.

## Try It

```bash
npx @withfrontmatter/solo-check
```

Or install it:

```bash
npm install -g @withfrontmatter/solo-check
frontmatter-check --root .
```

## Usage

```bash
frontmatter-check [options]
```

Options:

- `--root <path>` Astro project root, defaults to the current directory
- `--strict` treat warnings as blocking errors
- `--json` output machine-readable diagnostics
- `--quiet` keep only the final summary
- `--help-ai` print the AI workflow guide and exit `0`
- `-h, --help` show CLI help

## Output

Valid project:

```text
✓ src/pages/index.astro — OK
✓ src/layouts/Base.astro — OK
✓ src/pages/contact.astro — OK

──────────────────────────────────────────
0 errors · 0 warnings
──────────────────────────────────────────
```

Invalid project:

```text
E201 src/pages/index.astro:13 Non-literal props used in component Hero.
  Fix: Use only string, number, boolean, or null props in Solo v1.

E230 src/components/Hero.astro:6 Component-scoped CSS is not supported.
  Fix: Move CSS to a global stylesheet or mark it explicitly global.

──────────────────────────────────────────
2 errors · 0 warnings

Tip: use the AI workflow to fix these errors automatically.
     npx @withfrontmatter/solo-check --help-ai
──────────────────────────────────────────
```

## Exit Codes

- `0` valid project
- `1` validation errors
- `2` CLI usage error
- `3` unexpected internal error

## What It Checks

Frontmatter Solo enforces a constrained Astro contract:

- exactly one layout per page, with no nested layouts
- literal scalar props only: `string`, `number`, `boolean`, `null`
- no dynamic expressions in props such as `headline={page.title}`
- no runtime Astro features such as `client:*`
- no `import.meta.glob`
- global CSS only, no scoped Astro component `<style>` blocks
- deterministic, backend-friendly components
- static images from `public/`

Full contract:

[frontmatter.tech/docs/contract](https://frontmatter.tech/docs/contract)

## Relationship With Frontmatter Solo

If `frontmatter-check` exits `0`, the project should also pass:

```bash
frontmatter solo:validate
```

The contract is intended to match Solo exactly:

- same validation rules
- same diagnostic codes
- same strict-mode behavior

If `solo-check` and `frontmatter solo:validate` disagree on the same project, that is a bug.

## AI Workflow

This package also includes an AI workflow for fixing incompatible Astro code and converting generated markup into Solo-compatible Astro.

See:

- [`README_AI.md`](./README_AI.md)
- `fm-skill.md`
- `prompts/fix-project.md`
- `prompts/figma-to-astro.md`
- `prompts/audit.md`

Quick entrypoint:

```bash
npx @withfrontmatter/solo-check --help-ai
```

## Starter

Recommended reference starter:

[github.com/withfrontmatter/fm-solo-starter](https://github.com/withfrontmatter/fm-solo-starter)

## Build From Source

```bash
npm install
npm run build
```

## Package Contents

- `src/cli.ts` CLI entrypoint
- `src/commands/validate.ts` validation command
- `src/utils/diagnostics.ts` Solo-style diagnostic formatting
- `fm-skill.md` strict AI compatibility skill
- `README_AI.md` AI workflow guide
- `prompts/` AI prompts
- `dist/` compiled package output

## Philosophy

Layout stays in code.
Content becomes data.

## License

MIT
