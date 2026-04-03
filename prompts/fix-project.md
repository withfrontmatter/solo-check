This Astro project does not pass Frontmatter Solo validation.

Fix it so it becomes fully compatible with the Frontmatter Solo contract.

Follow fm-skill.md strictly.

Use this starter as the preferred reference for:
- component structure
- naming conventions
- page composition
- layout patterns

[Frontmatter Solo Starter](https://github.com/withfrontmatter/fm-solo-starter)

Prefer existing starter patterns over inventing new component abstractions.

Constraints:
- do not introduce arrays or objects in props
- remove unsupported runtime features
- remove scoped CSS
- simplify component APIs
- keep exactly one layout per page
- do not add new abstractions unless clearly necessary

Instructions:
1. list the compatibility violations
2. explain why each one is invalid
3. rewrite the files so they become Solo-compatible
4. keep the result explicit and backend-friendly

The final result must pass:

frontmatter solo:validate
