# writingcontrol.org

Astro-based static site for fiction and literary nonfiction. Hosted on Netlify. Sister to [audiocontrol.org](https://audiocontrol.org) and [editorialcontrol.org](https://editorialcontrol.org).

> See `/CLAUDE.md` (project root) for content conventions, dev commands, and the deskwork plugin install instructions. This file covers **agent operations**: session lifecycle, delegation, and code-quality rules.

## Session Lifecycle

### Starting a Session

1. Read the feature workplan and latest journal entry
2. Check open GitHub issues for the feature
3. Review DEVELOPMENT-NOTES.md for past session corrections
4. Report context to the user and confirm the session goal
5. Do NOT start coding until the user confirms

Use `/session-start` to automate this, or `/feature-pickup` to resume a feature.

### Ending a Session

1. Update the feature README.md status table
2. Update workplan.md (check off completed acceptance criteria)
3. Write a DEVELOPMENT-NOTES.md entry (see template below)
4. Comment on or close GitHub issues as appropriate
5. Commit all documentation changes

Use `/session-end` to automate this.

### Project Management

Use `/feature-help` to see the full feature lifecycle.

Feature documentation lives in `docs/1.0/<status>/<slug>/`:
- `001-IN-PROGRESS/` — active development
- `003-COMPLETE/` — merged and shipped

Each feature directory contains: `prd.md`, `workplan.md`, `README.md`, and optionally `implementation-summary.md`.

### Before Committing — Review Checklist

- [ ] Workplan updated with completed acceptance criteria?
- [ ] Could this task have been delegated to a sub-agent?
- [ ] No ad-hoc test infrastructure left behind?
- [ ] No fabricated claims (all data verified from source)?
- [ ] Documentation updated if behavior changed?
- [ ] No secrets, `.env` files, or build artifacts staged?
- [ ] Commit message is descriptive and has no Claude attribution?

## Sub-Agent Delegation

Delegate tasks to specialized agents when appropriate:

| Task Type | Agent |
|-----------|-------|
| Feature planning, PRD creation, branch/worktree setup | project-orchestrator |
| Implementation delegation, workplan tracking, PR delivery | feature-orchestrator |
| Code quality review, best practices | code-reviewer |
| Feature docs, blog content, SEO content | documentation-engineer |
| TypeScript logic, Astro component code | typescript-pro |
| Codebase health, DRY violations, guideline adherence | codebase-auditor |
| Site structure, component design | architect-reviewer |

Always instruct agents to **use the Write/Edit tool to persist all changes to disk**.

## Project Structure

```text
writingcontrol.org/
├── src/
│   ├── components/     # Reusable Astro components
│   ├── content/        # Content collections (essays, projects, scrapbooks)
│   ├── layouts/        # Page layouts
│   ├── lib/            # Local libraries (remark plugins, helpers)
│   ├── pages/          # Route pages (file-based routing)
│   ├── styles/         # Global CSS + design tokens
│   ├── brand.ts        # Brand tokens (mirror of design-tokens.css)
│   └── content.config.ts  # Content collection schemas
├── public/             # Static assets (favicon, fonts via @fontsource)
├── docs/               # Feature documentation + editorial calendar (deskwork)
├── .claude/            # Skills, agents, rules
├── .deskwork/          # Deskwork plugin config (when installed)
├── astro.config.mjs    # Astro configuration
├── netlify.toml        # Netlify deploy config
├── package.json
└── tsconfig.json
```

## Core Requirements

### Security

- Never hardcode secrets (API keys, tokens, passwords) in code or config files
- Use environment variables for sensitive data
- Never commit `.env` files

### Error Handling

Never implement fallbacks or use mock data outside of test code. Throw errors with descriptive messages instead. Fallbacks and mock data are bug factories.

### Code Quality

- TypeScript strict mode is enabled
- Prefer editing existing files over creating new ones
- Keep components focused and reusable
- Use semantic HTML for accessibility and SEO
- Files must be under 300–500 lines — refactor larger files

### Repository Hygiene

- Build artifacts go in `dist/` (gitignored)
- Netlify artifacts go in `.netlify/` (gitignored)
- Astro cache goes in `.astro/` (gitignored)
- Never bypass pre-commit or pre-push hooks — fix issues instead
- Never commit temporary files or build artifacts

## Astro Conventions

- Use `.astro` files for pages and components
- Use TypeScript in frontmatter
- Keep styles scoped within components when possible
- Use the `public/` directory for static assets
- Never set color values outside `src/brand.ts` and `src/styles/design-tokens.css` — keep them in sync by hand
- Use `@/` imports for internal paths (configured via `tsconfig.json` + Astro's auto-resolution)

### Component Structure

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  <p>{description}</p>
</div>

<style>
  .component { /* scoped styles */ }
</style>
```

## Content Conventions

See `/CLAUDE.md` for the essay/project frontmatter contracts and the scrapbook directory pattern. Brief recap:

- Essays: `src/content/essays/<slug>/index.md`, deskwork-managed when the plugin is installed
- Projects: `src/content/projects/<slug>/index.md`, hand-authored
- Scrapbooks: nested directories alongside `index.md`; never become public routes (collection glob is `*/index.md`)
- Quote ISO dates in frontmatter — unquoted dates parse as `Date` objects and fail the schema

## Common Commands

```bash
npm run dev            # Start development server (http://localhost:4321)
npm run build          # Build for production
npm run preview        # Preview production build
npm run check          # astro check (TypeScript + Astro diagnostics)
```

## Documentation Standards

- Don't call what you have built "production-ready"
- Never specify project management goals in temporal terms — use milestone, sprint, phase
- Never offer baseless projection statistics
- Use GitHub links (not local file paths) in issue descriptions
- Keep brand tokens (`src/brand.ts`) and design tokens (`src/styles/design-tokens.css`) in sync by hand

## Development Journal Format

Each session gets an entry in `DEVELOPMENT-NOTES.md`:

```markdown
## YYYY-MM-DD: [Session Title]
### Feature: [feature-slug]
### Worktree: writingcontrol.org-[slug]

**Goal:** [What we set out to do]

**Accomplished:**
- [What was done]

**Didn't Work:**
- [What failed and why]

**Course Corrections:**
- [PROCESS] [Description of correction]
- [UX] [Description of correction]
- [COMPLEXITY] [Description of correction]

**Quantitative:**
- Messages: ~N
- Commits: N
- Corrections: N

**Insights:**
- [What was learned]
```

## Critical Don'ts

- Never hardcode secrets in code or config files
- Never bypass pre-commit/pre-push hooks
- Never commit build artifacts outside gitignored directories
- Never commit `.env` files
- Never implement fallbacks or mock data outside test code
- Never add Claude attribution to git commits or PR descriptions
- Never call builds "production-ready"
- Never put sensitive material in scrapbooks — the source tree is public on GitHub even though scrapbook content never reaches the published site
