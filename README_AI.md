# Frontmatter AI Workflow

This repository includes a strict AI workflow for generating or refactoring Astro code into the Frontmatter Solo contract.

## Files

- `fm-skill.md` — the strict compatibility skill
- `prompts/fix-project.md`
- `prompts/figma-to-astro.md`
- `prompts/audit.md`

## What this is for

Use these files with ChatGPT, Claude, Cursor, Copilot, or another coding assistant to:

- normalize an Astro project into the Solo contract
- audit a project for compatibility
- refactor unsupported patterns into explicit, backend-friendly Astro

## Important

This is not magic.

Not all Astro projects can be converted automatically.

The skill is strict:
- it should explain incompatibilities
- it should simplify unsupported patterns
- it should not fake compatibility

## Recommended usage

1. Copy `fm-skill.md` into the AI system prompt
2. Paste one of the prompts from `prompts/`
3. Provide your Astro files or HTML input
4. Ask the assistant to follow `fm-skill.md` strictly

## Validation target

The output must pass:

```bash
frontmatter solo:validate
```

Or validate for free first:

npx @withfrontmatter/solo-check

## Scope reminder

Frontmatter Solo supports:

- one layout per page
- literal scalar props
- global CSS only
- no runtime Astro features
- deterministic components only