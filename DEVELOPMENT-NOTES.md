# Development Notes

Session-by-session journal. Newest entries at the top.

---

## 2026-04-26: Initial site bootstrap + scrapbook convention + .claude port

### Feature: (none — direct-to-main bootstrap)
### Worktree: writingcontrol.org (main)

**Goal:** Stand up writingcontrol.org from an empty repo as a sister to audiocontrol.org and editorialcontrol.org. Establish the literary-daylight brand, content model, scrapbook convention, and the project-management infrastructure needed to take the site forward.

**Accomplished:**
- Astro 5 + content collections (essays, projects), single-site flavor (no `src/sites/<name>/` indirection)
- Literary Daylight brand: cream paper (`#F4EFE3`), deep ink (`#2A1F18`), oxblood accent (`#7A2E25`); Newsreader display + Source Serif 4 body + JetBrains Mono editorial chrome — distinct from both dark sister sites
- Layouts, components, pages: BaseLayout / EssayLayout / ProjectLayout, Header / Footer / Logo / ProjectCard, homepage + essays/projects indices + dynamic routes + about + colophon
- Local remark plugins (`strip-first-h1`, `image-figure`) re-implemented in `src/lib/remark/`
- Sample content: published essay (East Bay Magazine "What's in a Name?" with `originallyPublishedIn` byline support), draft essay (state filter verified — present in dev, excluded from prod build), two projects (Outbound + Field Notes)
- Field Notes de-time-bound; auto "Pieces in this collection" listing on project pages via tag-equals-slug convention (no explicit cross-reference frontmatter needed)
- Replaced Lighthouse Year placeholder with The Outbound (satirical near-future novel); ingested 8 Ulysses notes into a nested scrapbook tree at `src/content/projects/the-outbound/`
- Scrapbook directory convention: bare directory tree alongside `index.md` IS the hierarchy — no `nodes/` ceremony. Documented in `CLAUDE.md` as: project-level `scrapbook/` plus arbitrarily nested sub-node directories with their own `scrapbook/` and `README.md`
- Content collection globs constrained from `**/index.md` to `*/index.md` so nested directories can never become public routes
- Real-name scrub on the Big Lie scrapbook note (Thiel/Mercer/Myhrvold → "program architects") since the source tree is public on GitHub
- Ported project-management infra from `~/work/audiocontrol.org/.claude/`: 7 agents + 14 skills (feature-* lifecycle + sessions) + 3 rules + 1 workflow YAML + `.claude/CLAUDE.md` + `project.yaml` + root `ROADMAP.md`. Skipped 23 `editorial-*` skills (deskwork's domain), 6 `feature-image-*` skills (audiocontrol-specific), 2 voice skills (site-specific), and `analytics` (needs writingcontrol's own analytics setup)
- Repo initialized, pushed to `git@github.com:oletizi/writingcontrol.org.git` main: 4 commits (`4194ebc` initial site, `13d974c` outbound replaces lighthouse, `2e22adc` scrapbooks + clean-slate-for-deskwork, `d82149d` .claude port)

**Didn't Work:**
- First `npm install` failed: package.json specified `@astrojs/check ^0.10.0` but actual latest is 0.9.8, and font versions were guessed. Fixed by querying `npm view <pkg> version` for each.
- First `npm run build` failed: YAML frontmatter dates parsed as `Date` objects and failed Zod `z.string()` validation. Fixed by quoting all `datePublished:` values.
- The first dev server (started via Bash `run_in_background`) was killed at the 120 s Bash background-task timeout. Second restart used `nohup npm run dev > /tmp/writingcontrol-dev.log 2>&1 & disown` to detach the process from the parent shell so it survives.
- The Ulysses zip path the user gave first didn't exist on this machine — the file was on the other laptop. Resolved when user `scp`'d (or AirDropped) it over.
- Initial framework default (Astro) was challenged by the user mid-plan — I had treated it as obvious; it wasn't.

**Course Corrections:**
- [PROCESS] Defaulted to Astro silently when bootstrapping. User wanted the framework choice surfaced as a deliberate question (Astro vs. Hono vs. Eleventy). Now: when picking infrastructure for a new project, surface the choice via AskUserQuestion in plan mode rather than committing on a default.
- [COMPLEXITY] Proposed a `nodes/` wrapper directory for the scrapbook hierarchy. User rejected — bare directory tree IS the hierarchy. Removed the indirection.
- [UX] Put "Originally published in *East Bay Magazine*…" in the body of the imported essay as a paragraph. User wanted it in the byline. Added optional `originallyPublishedIn: { venue, url }` frontmatter field + EssayLayout rendering as `· Originally in <venue>` with oxblood underline.
- [PROCESS] Wrote prose on the project page describing the connection to its essays but didn't actually wire the listing. User flagged: "the Field Notes page doesn't actually link to the articles in the collection." Added auto "Pieces in this collection" section to ProjectLayout via tag-equals-slug convention.
- [PROCESS] Background dev server died at the 120 s Bash timeout. Switched to `nohup … & disown` for restart so the process detaches from the agent's working window.
- [PROCESS] Asked the user for the Ulysses zip path on the wrong machine; should have noticed the path was MacOS-Ulysses-container-style and asked which machine before trying to read it.

**Quantitative:**
- Messages: ~60
- Commits: 4
- Corrections: 6
- Files created: 71 (35 site source + 14 outbound tree + 28 .claude infra + a few config / docs)

**Insights:**
- Astro 5 + content collections + light-mode literary-paper aesthetic is a fast and pleasant fit for a small publishing site. No client JS needed for any of the v0 surfaces.
- The `@/` import alias works in Astro 5 with only `tsconfig.json` `paths` set — no explicit Vite alias config needed.
- YAML frontmatter dates must be explicit strings (quoted) or they round-trip as `Date` objects and fail Zod `z.string()` schemas. Worth documenting as a content-conventions footgun.
- Bash background tasks have a hard 120 s default / 600 s max timeout. For a dev server that should outlive the agent's working window, use `nohup … > log 2>&1 & disown` and tail the log file separately.
- The directory tree IS the organizational hierarchy for project scrapbooks. Any extra wrapper (`nodes/`, `_meta/`, etc.) is unnecessary indirection. The convention `tag === project-slug` is enough to wire essay-to-project membership without explicit cross-reference frontmatter.
- For a fresh sister site, the right port is: agents + feature-* lifecycle skills + general rules. Skip the editorial skills (deskwork's domain), the image-pipeline skills (project-specific), and brand-voice skills (each site needs its own).
- Constraining content collection globs from `**/index.md` to `*/index.md` is a one-line change that gives you arbitrary nested working material under each entry without leaking it into the public build.
- The literary-daylight brand reads as decisively distinct from both audiocontrol's warm-dark service-manual and editorialcontrol's cool-dark editorial. Light mode + serif body + warm cream + a single muted accent is a strong differentiator in a family of dark-themed sister sites.
