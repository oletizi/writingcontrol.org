---
title: The Deskwork Experiment
description: Why I'm running my fiction calendar through a Claude Code plugin I wrote for technical blogging.
date: April 2026
datePublished: "2026-04-20"
author: Orion Letizi
tags:
  - craft
  - tooling
  - dogfood
state: published
---

# The Deskwork Experiment

For the past few months I've been running an editorial calendar inside an AI coding agent. Not a tracker pasted into a chat window — an actual versioned, file-on-disk system that the agent can read, write, and reason about. The pieces it manages are technical: posts about open-source audio software, essays about working with agents on editorial workflows. The system I wrote to manage them is called *deskwork*. It is small and opinionated and lives at the bottom of a working tree.

Deskwork was built for an audience of one: me, writing about samplers and shell scripts. It works well for that. But the work it manages is the easy work — there is a thing that happened (a release, a discovery, a fix), and writing about it is a matter of finding the cleanest line. The piece exists before I sit down. I just have to find it.

The hard work is the writing that *doesn't* exist before you sit down. The novel I have been carrying around for two years. The essay collection I keep returning to but never quite begin. A piece of literary nonfiction about my father that has been three different drafts in three different forms and is maybe just one form away from being one draft of the right thing. Work where the editorial calendar is not a record of what happened, but a confession of what hasn't.

That's why this site exists.

## What gets dogfooded

Writingcontrol is the third site in a small family. [Audiocontrol](https://audiocontrol.org) is where I publish about audio tools; [editorialcontrol](https://editorialcontrol.org) is where I publish about working with agents on editorial workflows. This one is for the writing that doesn't fit either bucket — fiction, literary nonfiction, the kind of piece where the *craft* is the subject.

It's also where I'm putting deskwork under load.

The audio site has the kind of editorial pipeline a one-person hobby publication can sustain on goodwill and a Sunday morning. The fiction projects don't. They have multiple acts, multiple drafts, beta readers, structural revisions that recur every six months — they have the messy, recursive, non-monotonic shape that creative work actually has, and that almost no project-management software is honest about.

If deskwork can hold *that* shape, it can hold anything.

## What I expect to learn

A few things I'm watching for as I work:

**The "outline" stage doesn't model how fiction outlines work.** A blog-post outline is a finished thing — sections, claims, examples, in order. A novel outline is a temporary scaffolding that you keep rebuilding as you discover what the book is about. I expect to find the existing outline workflow uncomfortable for fiction, and I'm interested in what shape it wants to grow into.

**The review pipeline assumes one reviewer.** Drafting an essay alongside Claude is a two-person review loop — operator annotates, agent iterates. Fiction often wants three or more people in the room: the writer, an editor, two beta readers. I want to see where deskwork resists that and where it bends.

**Status doesn't capture momentum.** "Drafting" and "revising" tell you what stage a project is in. They don't tell you whether it's moving. I'd like to see what surfaces when I work this way for six months — whether the calendar starts to honestly reflect the slow projects, the stalled ones, the ones I keep returning to without progress.

These are the kinds of bugs that only show up under real prose. They're why I'm posting this here, in public, where the system has to account for itself.

## What lives here

The Projects page is the front of the house. Each entry is a long piece I'm carrying — its current status, its logline, whatever excerpts or process notes have earned the right to be visible. The Essays page is where pieces go that don't belong to a project: short craft notes like this one, the occasional reportage, literary nonfiction that wants to be read as itself.

What you don't see — what is the whole point of deskwork — is the calendar behind both of them. The pipeline of ideas that didn't pan out, the outlines that got abandoned, the drafts that never came back from review. That's where most of the work happens, and that's the part this experiment is testing.

If you find this interesting, the plugin is open source. If you find it useful, that means it survived.
