# writingcontrol.org — Agent Playbook

A literary site for fiction and literary nonfiction, built to dogfood the [deskwork](https://github.com/audiocontrol-org/deskwork) editorial plugin.

## Stack

- Astro 5, static output, Netlify
- Vanilla CSS with HSL custom properties (no Tailwind, no CSS-in-JS)
- Self-hosted variable fonts via `@fontsource-variable/*`
- Markdown content collections (`essays`, `projects`)
- Local remark plugins under `src/lib/remark/` (strip first H1, image figures)

## Dev commands

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve dist/
npm run check    # astro check (TypeScript + Astro diagnostics)
```

## Content conventions

**Essays** live at `src/content/essays/<slug>/index.md` with co-located figures. Frontmatter requires:

```yaml
title: ...
description: ...        # one-line dek
date: April 2026        # display string
datePublished: 2026-04-20  # ISO
state: draft | published
```

Optional: `dateModified`, `author`, `image`, `socialImage`, `tags`.

**Projects** live at `src/content/projects/<slug>/index.md`. Frontmatter requires:

```yaml
title: ...
logline: ...
form: novel | novella | short-story | essay-collection | long-essay | memoir | other
status: ideating | drafting | revising | paused | shopping | complete
date: April 2026
datePublished: 2026-04-15
state: draft | published
order: 1                # optional; lower numbers sort first on indices
```

`state: draft` keeps an entry out of production builds (`getStaticPaths` filters by `state === 'published'` when `import.meta.env.PROD`). Drafts are visible in the dev server.

## Deskwork plugin

This repo is a deskwork host. `.deskwork/config.json` points at `src/content/essays` as the blog directory and `docs/editorial-calendar-writingcontrol.md` as the calendar. New essays scaffolded by `/deskwork:outline` will appear at `src/content/essays/<slug>/index.md` with `state: draft`.

Deskwork manages **essays only**. Project entries are authored by hand because the schema (logline, form, status) doesn't match deskwork's blog model. Future work: a deskwork plugin extension for project-style entries.

### Installing the plugin (local link, pre-v0.1)

The plugin isn't on npm yet. Add the local checkout as a Claude Code marketplace:

```sh
# from this repo's root
mkdir -p .claude
cat > .claude/settings.local.json <<'EOF'
{
  "marketplaces": {
    "deskwork-local": {
      "type": "local",
      "path": "../deskwork-work/deskwork-plugin"
    }
  }
}
EOF
```

Then in Claude Code, install the plugin from the `deskwork-local` marketplace. Once `deskwork@0.1` ships to npm, replace the local marketplace with the published version.

### Standard workflow

1. `/deskwork:add "<title>"` — capture an essay idea (lands in `## Ideas`)
2. `/deskwork:plan <slug>` — promote to `## Planned` and set keywords
3. `/deskwork:outline <slug>` — promote to `## Outlining`, scaffold `src/content/essays/<slug>/index.md` with frontmatter and an `## Outline` section
4. Annotate the outline by hand. Write the body alongside the agent.
5. `/deskwork:draft <slug>` — promote to `## Drafting`, opens a GitHub issue for the piece
6. `/deskwork:review-start <slug>` — open an editorial review; iterate until approved
7. `/deskwork:publish <slug>` — sets `state: published` in the file's frontmatter, moves the calendar row to `## Published`

### Studio (optional)

`/deskwork-studio:studio` launches a local Hono server at `localhost:4321`*. Provides a calendar dashboard, longform review surface, and the scrapbook viewer.

*Note: dev port collides with Astro's default. Run them on different ports if both are needed simultaneously (deskwork-studio respects `PORT=`).

## Family

Sister repos (sharing aesthetic vocabulary but no code):

- `~/work/audiocontrol.org/` — audiocontrol.org + editorialcontrol.org dual-site Astro monorepo
- `~/work/deskwork-work/deskwork-plugin/` — the plugin this repo dogfoods

## Scrapbooks

Working notes for projects (and, rarely, essays) live as nested directories alongside the entry's `index.md`. The directory tree is the organizational hierarchy — there is no `nodes/` ceremony.

```
src/content/projects/<slug>/
├── index.md                    ← the public project page
├── scrapbook/                  ← project-level scratch
│   └── *.md
└── <organizational-node>/      ← e.g. characters/, settings/, structure/
    ├── README.md               ← what this node holds
    ├── scrapbook/              ← node-level scratch
    └── <sub-node>/             ← arbitrary depth
        ├── README.md
        └── scrapbook/
```

Conventions:

- The project's `index.md` is the only file in the public content collection (glob is `*/index.md`). Everything nested is dev/working material — never published.
- Each organizational sub-node gets a `README.md` describing what it holds.
- Scrapbook items are plain markdown with descriptive slugs. No frontmatter required.
- Same convention is available for essays (rare): `src/content/essays/<slug>/scrapbook/`.
- A future deskwork plugin will likely browse these via a web UI; for now the filesystem is the UI.

## Conventions

- Use `@/` for internal imports (configured via `tsconfig.json` paths and Astro's auto-resolution).
- No client JavaScript by default. If a feature needs JS, prefer one small `<script>` over a framework island.
- Hairline rules over boxes. Mono labels over headings for editorial chrome.
- Never set color values outside `src/brand.ts` and `src/styles/design-tokens.css`. Keep brand and tokens in sync by hand.
