---
name: workflow-playbooks
description: "Step-by-step playbooks for common writingcontrol.org workflows"
---

# Workflow Playbooks

## Add a New Page

1. Create `.astro` file in `src/pages/`
2. Wrap content in `<BaseLayout>` (or `<EssayLayout>` / `<ProjectLayout>` as appropriate)
3. Use semantic HTML; rely on the design tokens in `src/styles/design-tokens.css` rather than inline color values
4. Add to footer nav (`src/components/Footer.astro`) if it's a top-level surface
5. Verify with `npm run dev` (visual) and `npm run build` (no warnings, sitemap regenerates)

## Add an Essay (manual fallback — use `/deskwork:add` etc. when the plugin is installed)

1. Create directory: `src/content/essays/<slug>/`
2. Create `index.md` with the required frontmatter:
   ```yaml
   title: "..."
   description: "..."        # one-line dek
   date: "Month Year"        # display string
   datePublished: "YYYY-MM-DD"
   author: "Orion Letizi"
   state: draft              # promote to `published` when ready
   tags: [...]               # include the project slug to attach to a project's "Pieces" listing
   originallyPublishedIn:    # optional, for re-attributed pieces
     venue: "..."
     url: "..."
   ```
3. Quote dates in YAML — unquoted ISO dates parse as `Date` objects and fail the schema
4. Write the body. The first H1 is stripped at render time, so keep `# Title` at the top of the markdown for standalone validity
5. Co-locate figures next to `index.md` and reference relatively (`./figure.png`)
6. Verify in dev (drafts render in dev only); promote `state: published` when ready

## Add a Project

1. Create directory: `src/content/projects/<slug>/`
2. Create `index.md` with project frontmatter:
   ```yaml
   title: "..."
   logline: "..."
   form: novel | novella | short-story | essay-collection | long-essay | memoir | other
   status: ideating | drafting | revising | paused | shopping | complete
   date: "Month Year"
   datePublished: "YYYY-MM-DD"
   order: 1                  # lower numbers sort first on indices
   state: published
   ```
3. Sub-node directories (`characters/`, `settings/`, `structure/`, etc.) and their `scrapbook/` folders are organizational-only — never become public routes (the collection glob is `*/index.md`)
4. Each sub-node should get a brief `README.md` describing what it holds
5. Verify with `npm run build` (project page renders, no schema errors)

## Add a Scrapbook Note

1. Choose the right directory — project-level (`src/content/projects/<slug>/scrapbook/`) or any nested sub-node's `scrapbook/`
2. Write a markdown file with a descriptive slug (e.g. `wealth-is-other-people.md`, not `01-note.md`)
3. No frontmatter required; lead with an H1 derived from the note's subject
4. Don't put anything sensitive in scrapbooks — the source tree is public on GitHub even though scrapbook content never reaches the published site
