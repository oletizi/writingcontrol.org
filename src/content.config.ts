import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Essays — long-form pieces (craft notes, literary nonfiction, the
 * occasional polemic). Each essay is a directory at
 * `src/content/essays/<slug>/index.md` so per-post images sit beside
 * the markdown. Deskwork's `blog` content type points here.
 *
 * `state: draft` keeps a piece out of production builds; the dev
 * server still renders it for review.
 */
const essays = defineCollection({
  loader: glob({
    // One-level deep: only `essays/<slug>/index.md` becomes a route.
    // Anything nested deeper (scrapbooks, sub-notes) stays out of the
    // public collection.
    pattern: '*/index.md',
    base: './src/content/essays',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      datePublished: z.string(),
      dateModified: z.string().optional(),
      author: z.string().optional(),
      image: image().optional(),
      socialImage: image().optional(),
      tags: z.array(z.string()).optional(),
      state: z.enum(['draft', 'published']).default('draft'),
      originallyPublishedIn: z
        .object({
          venue: z.string(),
          url: z.string().url(),
        })
        .optional(),
    }),
});

/**
 * Projects — work-in-progress hubs. One entry per fiction or literary
 * nonfiction project (a novel, an essay collection, a long piece in
 * progress). The `status` axis is the public surface of the editorial
 * state; `state` still gates whether the project page is live.
 */
const projects = defineCollection({
  loader: glob({
    // One-level deep: only `projects/<slug>/index.md` becomes a route.
    // Sub-directories under a project (characters/, settings/,
    // structure/, etc.) and their `scrapbook/` folders are
    // organizational-only and never become public routes.
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      logline: z.string(),
      form: z.enum(['novel', 'novella', 'short-story', 'essay-collection', 'long-essay', 'memoir', 'other']),
      status: z.enum(['ideating', 'drafting', 'revising', 'paused', 'shopping', 'complete']),
      date: z.string(),
      datePublished: z.string(),
      dateModified: z.string().optional(),
      image: image().optional(),
      socialImage: image().optional(),
      tags: z.array(z.string()).optional(),
      state: z.enum(['draft', 'published']).default('draft'),
      order: z.number().optional(),
    }),
});

export const collections = { essays, projects };
