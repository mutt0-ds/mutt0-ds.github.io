---
title: "Second Brains in the AI era: still worth it?"
date: 2026-09-06
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/second_brain_ai/title.jfif
draft: false
author: "Davide Muttoni"
tags:
  - ai
  - second-brain
  - obsidian
  - notes
  - ontology
---

I've been working on my second brain(s) for years now. Brains, plural, because I had to create new ones, for example when I changed jobs... Otherwise Legal wouldn't have appreciated.
From what ex-colleagues tell me, a couple of them are still alive and being updated by other people, which made me happier than I expected.

In case the term is new to you, a [second brain](https://fortelabs.com/blog/basboverview/) is **a personal knowledge** base where you dump everything worth remembering and link it together, so your head doesn't have to hold it.

I wrote about the first one [back in 2023](https://mutto.fyi/posts/2023/02/obsidian-productivity-second-brain/), then [again six months later](https://mutto.fyi/posts/2023/09/obsidian-update-6-months-later/). Three years and one AI revolution later, the obvious question is whether the whole exercise still makes sense. Why keep hand-feeding a vault of markdown notes when a model can produce a summary of anything in four seconds?

Short answer: it's worth **more** than before. Long answer below.

## AI needs context

This part isn't even worth an argument.

An assistant is only as good as the context you can hand it, and a second brain is a pile of context that is already cleaned, dated, and **connected**. Documentation, meeting notes, brain dumps, half-finished guides: all of it is a "no-brainer" to feed to an agent, and the good part is that it doesn't even need to be refactored or indexed, because LLMs are crazy good at grasping complex information, GIVEN THE CONTEXT.

<div style="max-width: 1440px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 53.5833%;"><iframe src="https://iframely.net/Rj6aXFOs?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_Example of big knowledge graph in Obsidian. Source: Obsidian's X_

What matters is the shape of it. If you throw 500 files at an AI agent, it will easily get confused and hallucinate, as it needs to understand what is connected to what, the meaning of hundreds of concepts, and how they fit together. But a second brain is not a folder of documents, it is a graph of notes pointing at each other: this meeting relates to that ticket, that ticket touches this data source, that data source has these business rules. For years that structure existed for me only, and I navigated it by clicking around the graph view. Now it happens to be the format agents are best at walking, and it maps almost one to one to what the memory world calls [graph memory](https://mutto.fyi/posts/2026/05/long-term-memory/).

What happened, in practice, is that the second brain topic quietly merged with the much hotter [graph database theory](https://en.wikipedia.org/wiki/Graph_database), which is what lets agents traverse extremely complex concepts. Like, you know, a decade of notes, a massive codebase, or the entire shape of a business. Not that surprising, given that we built these vaults to imitate human knowledge in the first place.

AI also fixed my oldest complaint. Four years ago my main problem was retrieval: if I couldn't remember roughly how I had phrased a note, finding it was painful, and I spent a silly amount of time renaming notes just to make them findable later. Semantic search over the same vault removed most of that friction. All the tribal knowledge that used to live in three people's heads is now written down **and** retrievable, which are two very different things.

## But does it change how you build one?

Here I'm a bit divided.
Just like with coding, it's extremely easy to build a second brain now. Just ask Claude to set up an [Obsidian](https://obsidian.md/) vault, attach some files, and it will happily craft a nice-looking tree you can automate, attach to a swarm of agents and other buzzwords.

And that's cool, not everyone enjoys taking notes. But I still cultivate most of mine by hand, and you will see why.

Meanwhile, AI-generated summaries have quietly appeared in every tool I use, whether I asked for them or not. After a year of living with them, this is my personal ranking of how much they help.

- **Meeting notes: 9/10.** The easiest win of the last two years. They save a lot of time, everyone in the room gets the same version, and transcription is now good enough to survive mixed languages and heavy accents (mine included). I never trust AI-generated action points, because some of them are plain wrong (they need context, remember!), but I can finally follow a meeting without half of my attention going into typing.
- **How-to guides: 8/10.** Here verbose and overly descriptive is a feature. Two caveats: you have to keep the guide updated, and people follow guides blindly, so a wrong step can bite you months later. These are the ones I always re-read, making sure they still work.
- **Technical documentation: 7/10.** The model summarizes correctly but you need some human psychology to avoid falling into AI slop that people won't read. I still haven't found a reliable way to get it to the point: it's either bloated or it trims exactly the detail that mattered. It doesn't hurt, it just saves me less than I hoped.
- **Code and knowledge changes: 5/10.** Dumping automatic commit or ticket recaps in there adds noise, because most of the context that matters never made it into the commit message. We tried summarizing commits for technical reviews in the past and it was too shallow to stand on its own. If I need to know what changed in a project, I'd rather query the repository with AI and ask follow-up questions.
- **High-level and architectural choices: 3/10.** Same problem, higher stakes. AI doesn't understand architectural decisions that well, and while trying to connect the dots it often hallucinates decisions that were never taken. For these docs I'd rather hand it the meeting notes where the architecture was discussed, much more efficient.
- **TIL, personal notes, book notes: 3/10.** I prefer doing these myself. Writing them is the learning, and there is plenty of research on how much reviewing and rethinking what we read actually matters. Also, [my book notes](https://mutto.fyi/posts/2025/06/we-have-no-idea-book/) are mostly me arguing with my own thoughts, which is not something I want to automate.
- **Cleaning up scrambled notes taken in a hurry: 10/10.** No contest. Especially when in meetings with no recordings, my notes are absolutely terrible. I now paste all my typos, half sentences, and stray Italian, and I get back something readable with the meaning intact. I tried this exact thing [in 2023 with OCR and GPT on my conference notes](https://mutto.fyi/posts/2023/11/ai-tweaked-data-saturdays-notes/) and back then it was painful. Now it just works, and it's the single feature keeping my brain-dumping habit alive.

<div style="max-width: 1744px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 11.6999%;"><iframe src="https://iframely.net/GQL6QIZ6?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_Some of my messy notes for this post..._

The rule is the same across all of these: **you still have to read what ends up in the vault**. Garbage in, garbage out: the day my second brain fills up with slop and unreliable notes, I'll start skipping it the way I skip half of my LinkedIn feed. AI fatigue is real.

## Unloading your brain is not the same as switching it off

So, am I worried about learning less? **A little, yes**.
There's a real contradiction in building a second brain and then delegating it to a machine.

The original point, though, was never to stop thinking, but to stop *storing*: you offload the remembering so the brain can spend its energy on connecting.

It all comes down to knowing when to reach for it. 
Cleaning up dirty notes and querying the knowledge base is a big yes. 
Delegating the whole thing? That ruins the entire point of journaling, and you never learn how to connect the dots.

If you switch it off completely and let the model build the vault for you, **you end up with the note-taking version of a vibe-coded repository**. [I've built one of those](https://mutto.fyi/posts/2025/04/ai-generated-code/) and it was great fun for forty-five minutes: thousands of files, no idea how to navigate them, and no idea what's inside, so no way to go looking for the interesting parts.

<div style="max-width: 1440px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 95.75%;"><iframe src="https://iframely.net/1t8LGani?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_Example of vibe-code knowledge graph. Source: https://github.com/hroyhong/Haoshan-Vault_

And that's where the tradeoff hits, in my opinion.
If I know, even vaguely, that somewhere in my vault there's a note on M Query internals covering the exact edge case I'm hitting, I know what to ask for. 
**If I don't know it's in there, I'll never ask**, and the vault might as well be empty. It's the same thing I wrote about [Terence Tao's chat](https://mutto.fyi/posts/2026/08/jacobian-conjecture-chat/): the model will go as deep as you can take it, but it won't pick the rabbit hole for you. It's [Lateral Thinking](https://en.wikipedia.org/wiki/Lateral_thinking), and it's like a superpower.

So here's the compromise I settled on: **I read every note I add to my second brain**. Still way less effective than writing them myself, but we don't have infinite time.

## The connections are still your job

This is the part I feel strongly about.

**The key feature of a second brain is connecting the dots**, and the nice part is that linking notes takes almost no work, provided you read them and make the effort to remember what they relate to.

Let the model clean, transcribe, reformat, summarize, even suggest links. **Do NOT let it draw them for you**. Building the big picture is the reason the vault exists in the first place, and placing a link by hand is the cheapest form of revision I know.

## My routine today

So how much has my routine changed lately? Not a lot, it's just faster.
Every day, before closing the laptop, I sit with my AI companion and debrief:

1. Dump the meeting notes, my own observations, and whatever I learned during the day
2. Run an AI pass to fix the grammar and untangle the notes I typed in a hurry
3. Read what comes out, place the links myself, and check whether anything needs an action. If it does, it goes in a connected TODO note

The whole debrief is under five minutes now, against the fifteen it used to take, and almost all of the saving comes from step 2.

I deliberately don't automate the collection part. 
I tried pulling in commits and tickets from Jira and Slack, and most of it turned out to be noise for the way my work is structured. There was a period where I filed the genuinely complex ones, with the debugging path and the dead ends included, and those are still among the most useful notes I own. They became more like how-to guides.

So, are second brains still worth it? **More than in 2023.**

They are a great way of storing information and handing it over to AI agents, the old bottleneck (cleaning the data) is 90% solved, and they scale well now that there is a lot more noise coming in and a lot more worth dumping.

The only requirement that hasn't moved is that you have to know, roughly, what's inside.
That part is still on you, and I would keep it that way.
