// One-off migration: legacy markdown calendar → per-entry sidecars.
//
// The studio dashboard reads entries from `.deskwork/entries/<uuid>.json`.
// Pre-v0.17 calendars only had the markdown table; this script writes the
// missing sidecars from the calendar + ingest journal, then re-renders the
// markdown using the new stage vocabulary (Final, Blocked, Cancelled).

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

const PROJECT_ROOT = process.cwd();
const CALENDAR_PATH = join(PROJECT_ROOT, 'docs/editorial-calendar-writingcontrol.md');
const ENTRIES_DIR = join(PROJECT_ROOT, '.deskwork/entries');
const HISTORY_DIR = join(PROJECT_ROOT, '.deskwork/review-journal/history');
const INGEST_DIR = join(PROJECT_ROOT, '.deskwork/review-journal/ingest');

const LEGACY_STAGE_MAP = {
  Ideas: 'Ideas',
  Planned: 'Planned',
  Outlining: 'Outlining',
  Drafting: 'Drafting',
  Final: 'Final',
  Published: 'Published',
  Blocked: 'Blocked',
  Paused: 'Blocked',
  Cancelled: 'Cancelled',
  Review: null,
  Distribution: null,
};

const STAGE_ORDER = [
  'Ideas', 'Planned', 'Outlining', 'Drafting', 'Final',
  'Published', 'Blocked', 'Cancelled',
];

function splitSections(md) {
  const re = /^## (\w+)\s*$/gm;
  const matches = [...md.matchAll(re)];
  const sections = [];
  for (const [i, m] of matches.entries()) {
    const start = (m.index ?? 0) + m[0].length;
    const end = matches[i + 1] ? matches[i + 1].index : md.length;
    sections.push({ name: m[1], body: md.slice(start, end) });
  }
  return sections;
}

function extractEntries(md) {
  const out = [];
  for (const { name, body } of splitSections(md)) {
    const stage = LEGACY_STAGE_MAP[name];
    if (!stage) continue;
    const rowRe = /^\|\s*([0-9a-f-]{36})\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|/gm;
    for (const m of body.matchAll(rowRe)) {
      out.push({
        currentStage: stage,
        uuid: m[1],
        slug: m[2].trim(),
        title: m[3].trim(),
        description: m[4].trim(),
        keywords: m[5].split(',').map((s) => s.trim()).filter(Boolean),
        source: m[6].trim() || 'manual',
      });
    }
  }
  return out;
}

async function readIngestJournal() {
  const out = new Map();
  let names;
  try { names = await readdir(INGEST_DIR); }
  catch { return out; }
  for (const name of names) {
    if (!name.endsWith('.json')) continue;
    const rec = JSON.parse(await readFile(join(INGEST_DIR, name), 'utf8'));
    if (typeof rec.entryId === 'string') out.set(rec.entryId, rec);
  }
  return out;
}

function escapePipe(s) { return s.replace(/\|/g, '\\|'); }

function renderRow(e) {
  return `| ${e.uuid} | ${escapePipe(e.slug)} | ${escapePipe(e.title)} | ${escapePipe(e.description ?? '')} | ${escapePipe(e.keywords.join(', '))} | ${escapePipe(e.source)} | ${e.updatedAt} |`;
}

function renderCalendar(entries) {
  const byStage = new Map(STAGE_ORDER.map((s) => [s, []]));
  for (const e of entries) byStage.get(e.currentStage)?.push(e);

  let md = '# Editorial Calendar\n\n';
  for (const stage of STAGE_ORDER) {
    md += `## ${stage}\n\n`;
    const bucket = byStage.get(stage) ?? [];
    if (bucket.length === 0) {
      md += '*No entries.*\n\n';
      continue;
    }
    md += '| UUID | Slug | Title | Description | Keywords | Source | Updated |\n';
    md += '|------|------|------|------|------|------|------|\n';
    for (const e of bucket) md += renderRow(e) + '\n';
    md += '\n';
  }
  md += '## Distribution\n\n*reserved for shortform DistributionRecords — separate model*\n';
  return md;
}

async function main() {
  const md = await readFile(CALENDAR_PATH, 'utf8');
  const sources = extractEntries(md);
  const ingest = await readIngestJournal();

  await mkdir(ENTRIES_DIR, { recursive: true });
  await mkdir(HISTORY_DIR, { recursive: true });

  const entries = [];
  for (const src of sources) {
    const j = ingest.get(src.uuid);
    const at = j?.timestamp ?? new Date().toISOString();
    const datePublished = j?.frontmatterSnapshot?.datePublished;
    const artifactPath = j?.sourceFile;

    const entry = {
      uuid: src.uuid,
      slug: src.slug,
      title: src.title,
      keywords: src.keywords,
      source: src.source,
      currentStage: src.currentStage,
      iterationByStage: {},
      createdAt: at,
      updatedAt: at,
    };
    if (src.description) entry.description = src.description;
    if (datePublished) entry.datePublished = `${datePublished}T00:00:00.000Z`;
    if (artifactPath) entry.artifactPath = artifactPath;

    const sidecarPath = join(ENTRIES_DIR, `${entry.uuid}.json`);
    await writeFile(sidecarPath, JSON.stringify(entry, null, 2));

    const eventId = randomUUID();
    const tsKey = at.replace(/[:.]/g, '-');
    const event = { kind: 'entry-created', at, entryId: entry.uuid, entry };
    await writeFile(
      join(HISTORY_DIR, `${tsKey}-${eventId}.json`),
      JSON.stringify(event, null, 2),
    );

    entries.push(entry);
    console.log(`wrote sidecar ${entry.uuid} (${entry.slug}, ${entry.currentStage})`);
  }

  const newMd = renderCalendar(entries);
  await writeFile(CALENDAR_PATH, newMd);
  console.log(`re-rendered ${CALENDAR_PATH} with ${entries.length} entries`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
