# Development Notes

Session-by-session journal. Newest entries at the top.

---

## 2026-04-26 (session 2): Licenses, prose typography, deskwork dogfood end-to-end

### Feature: (none — direct-to-main, continuing)
### Worktree: writingcontrol.org (main)

**Goal:** Add licensing to the repo + visible copyright. Standardize prose typography on book-style indented paragraphs. Take deskwork from "config exists" to a fully exercised editorial workflow installed via the marketplace plugin (not a workspace link), with calendar populated by `ingest`. File issues as bugs/gaps surface.

**Accomplished:**
- Licensing: MIT for site code (`LICENSE`), CC BY-NC-ND 4.0 for prose content (`LICENSE-CONTENT.md`), README updated, footer baseline gets a third cell linking content + code licenses to `/colophon`, colophon page gets a Rights section + Source link to GitHub
- Prose typography: switched all `.prose` containers (essays, projects, About, Colophon) from blog-style vertical-gap paragraphs to book-style first-line indents. Section-opener paragraphs (after h2/h3/h4/hr/blockquote/ul/ol/pre/figure or as first-child) reset to no indent — print-book convention. ~14 lines changed in `src/styles/prose.css`
- Content fix: corrected an oversold timeframe in *The Deskwork Experiment* ("For the last year" → "For the past few months")
- Deskwork dogfood (clean-slate test): deleted previous `.deskwork/config.json` + calendar before installing via marketplace plugin; verified install + ingest end-to-end
- Calendar populated to 5 entries via `/deskwork:ingest`: 4 Published (the-deskwork-experiment, whats-in-a-name, field-notes, the-outbound) + 1 Drafting (on-revising-in-the-open)
- Widened `contentDir` from `src/content/essays` to `src/content/` so the projects tree comes under deskwork's purview
- Verified the deskwork v0.4.2 fix end-to-end (#23 acceptance) — 0 add, 18 skip from `src/content/`: 5 already-tracked, 5 organizational READMEs correctly skipped with the new descriptive reason, 8 scrapbook files correctly skipped at all hierarchical depths
- Studio (deskwork-studio) running detached, bound to loopback + Tailscale interface (auto-detected — no flag needed); reachable at `http://orion-m4.tail8254f4.ts.net:47321/`
- 6 commits this session, all pushed to `origin/main`: `2d18be3` licenses, `6fd2653` deskwork timeframe correction, `df33edc` prose indents, `69cb868` install + ingest essays, `7648d31` widen contentDir, `7573f5a` ingest projects + plugin enablement

**Deskwork dogfood — issues filed this session (umbrella + follow-ups; all resolved during the session):**
- **#18** (umbrella) — *Editorial workflow assumes single content type and flat layout — needs to handle multiple content types and hierarchical trees.* Per maintainer response: most of the layout-half was already shipped in Phase 13/15 but undocumented. Phase 16 in v0.4.0 closed remaining surface gaps (scrapbook drawer in review, `/dev/content` bird's-eye view, in-browser preview)
- **#23** — *README.md ingested as Ideas-lane entries — harm + the legitimate underlying need.* Filed as a two-part observation (the harm + the legitimate underlying intent of bird's-eye-view structural visibility). Maintainer split: harm half closed in v0.4.2 (`README.md` without frontmatter now skipped with descriptive reason; provenance label says `state:default` instead of lying with `state:frontmatter`); intent half deferred to **#24** (still open) as design work
- **#24** filed by maintainer when deferring half of #23 — *studio: bird's-eye view should render organizational README nodes (deferred from #23)*. Tree-assembly contract has to invert (filesystem as primary, calendar as state overlay). v0.5.x or later
- **#20**, **#21** filed by maintainer during their work on #18 — both fixed in v0.4.1
- All deskwork issues from THIS session reach a terminal state by session end (closed or open-and-deferred-by-design). I posted the acceptance comment on #23 and closed it personally.

**Deskwork plugin versions traversed this session:** v0.3.0 → v0.4.0 → v0.4.1 → v0.4.2 → v0.5.0. Marketplace updates were fast — turn-around from issue-filed to fix-shipped was usually under an hour for the small ones.

**Didn't Work:**
- Force-push to `main` to fix two stale commit messages (`ea83393` and `2d18be3` had the previous commit's message attached due to a temp-file reuse bug) was blocked by the permission gate. User authorized "commit amend" but the gate caught the implicit force-push. User said "never mind" — left the messages slightly wrong on the two commits; the diffs are the source of truth
- The first attempt at `/deskwork-studio:studio` worked correctly but bound to loopback only — couldn't reach via Tailscale until v0.4.0's auto-Tailscale-detection landed
- The first attempt at `/deskwork:install` failed (exit 127) on v0.0.1 because the marketplace install ships no runnable CLI bundle — discovered as #4, fixed in v0.1.0
- The first dry-run of `deskwork ingest src/content/projects/` on v0.4.1 produced 7 adds with 5 README garbage in Ideas — fixed in v0.4.2 after I filed #23

**Course Corrections:**
- [PROCESS] Re-used `/tmp/wc-commit-msg.txt` for two consecutive commits without overwriting → both commits landed with the previous commit's message because Write requires Read before overwrite, and I didn't notice. Corrected by switching to `mktemp /tmp/wc-commit-XXXXXX.txt` for every commit message file going forward; problem hasn't recurred since.
- [PROCESS] Filed bug report #2 ("schema-mismatch detection") based on a wrong model — assumed user wanted protection against ingesting non-blog content. User clarified they want the OPPOSITE: deskwork should handle hierarchical projects natively. Withdrew the bug, reframed as the umbrella #18 ("plugin should handle hierarchical content; not just for blogs").
- [UX] Initial framing of #23 was "READMEs shouldn't be tracked, full stop" — user pushed back: they want the READMEs visible in the bird's-eye view as structure. Reframed the issue as a two-part observation (harm of current implementation + legitimate underlying need); maintainer agreed and split into #23 patch + #24 design. Lesson: don't conflate "this implementation is wrong" with "the underlying intent is wrong."
- [PROCESS] Tried to use `bash cat <<EOF` heredocs for commit messages until I remembered the global rule against `#` characters in heredocs (markdown headings would trigger the permission gate). The mktemp + Write tool flow handles this safely, including markdown bodies for `gh issue create --body-file`.
- [PROCESS] Asked the maintainer for "the next thing to do" via the bird's-eye-view of running studios + calendars — useful pattern for keeping the dogfood loop fast. Filed issues with concrete repros (writingcontrol's actual `the-outbound` tree as the test fixture) which the maintainer used directly for regression tests.

**Quantitative:**
- Messages: ~90
- Commits to writingcontrol.org: 6 (`2d18be3`, `6fd2653`, `df33edc`, `69cb868`, `7648d31`, `7573f5a`)
- Issues filed against deskwork: 2 substantive (#18, #23) + 1 self-discovered-and-closed (#23 closed with acceptance)
- Issues observed/tracked filed BY maintainer during their fix work: 3 (#20, #21, #24)
- deskwork plugin versions traversed: 5 (0.3.0 → 0.4.0 → 0.4.1 → 0.4.2 → 0.5.0)
- Course corrections: 5 ([PROCESS] × 4, [UX] × 1)

**Insights:**
- The deskwork dogfood loop works at extremely tight cadence — file an issue with concrete repro, maintainer ships fix in <60 minutes, marketplace update + reload pulls it, verify in-place. The plugin's regression tests literally lifted my `the-outbound` tree from #18 as a fixture (the maintainer's #18 reply explicitly named the test files).
- Filing issues as **two-part observations** (harm + underlying intent) is a much better frame than single-axis "this is wrong" framing. It gives the maintainer room to split the design correctly (e.g., #23 → #23-patch + #24-design) instead of conflating them. Use this frame whenever a bug report is really a design ambiguity.
- The `mktemp` pattern eliminates an entire class of "stale commit message" bugs that the Write-tool's prior-Read requirement creates. Should be the default for any tooling-driven message file (commits, gh issue bodies, anything where the agent generates the body fresh per call).
- Astro's content collection glob pattern `*/index.md` (single asterisk) is the right scope for the public site, but works seamlessly alongside arbitrary nested working-material directories under each entry. Combined with deskwork's hierarchical slug derivation (each `<dir>/index.md` is a tracked node and prefixes children's slugs), the same physical layout serves both the public-build and the editorial-pipeline at once.
- Tailscale auto-detection in deskwork-studio is the right default — operators on personal machines almost always want their other devices to reach the studio without ceremony, and Tailscale is the trust boundary. The implementation walks `os.networkInterfaces()` for IPs in `100.64.0.0/10` (CGNAT range) — clean signal that didn't need any tailscale CLI dependency.
- When the marketplace plugin install ships no runnable CLI (issue #4 condition), the failure mode is unhelpful (exit 127, generic). A post-install loud-fail check that detects the missing bundle would catch this before the operator hits a skill that depends on it. Worth filing if it happens again on a different plugin.

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
