Here is an HTML template generated from Figma.

Convert it into an Astro project compatible with Frontmatter Solo.

Follow fm-skill.md strictly.

Use this starter as the preferred reference for:
- component structure
- naming conventions
- page composition
- layout patterns

[Frontmatter Solo Starter](https://github.com/withfrontmatter/fm-solo-starter)

Prefer existing starter patterns over inventing new component abstractions.

Requirements:
- break the HTML into reusable Astro components
- keep props scalar only
- do not use arrays or objects in props
- do not use .map()
- do not use client-side JS
- use explicit markup when repetition is needed
- reuse existing starter patterns when possible

If a pattern is incompatible with the Solo contract:
- do not force it
- explain the issue
- provide a compatible alternative

The final Astro output must pass:

frontmatter solo:validate
