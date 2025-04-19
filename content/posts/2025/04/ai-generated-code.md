---
title: "45 Minutes, 100% AI-Generated Code"
date: 2025-04-19
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/vibe_coding/ollivander.gif
draft: false
author: "Mutt0-ds"
tags:
  - ai
  - coding
  - cursor
  - next-js
  - prototyping
---
Last Saturday, I woke up with an idea: what if **[StoryTeller](https://www.investsuite.com/storyteller), the product I work on, had an interactive dashboard with an AI agent that could perform tasks**? 
It was one of those half-formed concepts I could picture it but couldn’t quite articulate it. I knew if I wanted my team to take it seriously, I’d need to build something tangible. Otherwise, it’d just sound like abstract brainstorming.

So, I sinned. I *vibe coded*.
(I hate that word, so let's say "I went full speed with AI and ignored the brakes.")
Here’s what I learned from prototyping with **100% AI-generated code**.

## My take on AI tools for Devs

I won't claim to reveal hidden truths, but here's my stance on AI tools for developers:
I consider them as an evolution of Googling. It's an art. It's... a vibe.

Back in the day 👴, when you had a problem, you needed to:

1. Carefully select search terms for Google
2. Choose the right results (usually Stack Overflow)
3. Analyzing the top comments
4. Copy-pasting and adapting the solution to your needs.

AI speeds this up dramatically, but you still need that critical thinking - knowing what you want, how you want it and whether the solution might backfire later. **Prompting is becoming an art like Googling**. This comes with experience.

Vibe coding (blindly accepting AI output) is like always picking Google's first result and pasting it. Sure, it might work, but you're building technical debt with code you barely reviewed. At insane speed. That’s why AI is perfect for prototyping: I knew this wouldn’t ship to production, so I could afford to be reckless.

(Don't get me wrong, I use AI for a lot of other tasks: brainstorming, exploring approaches, cleaning up messy code, etc... How to correctly use it is a long and complex topic I'm only quikcly touching here)

What scares me is how easily AI-assisted tools sell shiny demos: exactly what marketers love. But in reality, you can't open a million-line code repository, pick a medium-complexity issue, and let the AI agent work unsupervised.

## From Figma to Cursor

I first tried mocking upthe confuse idea in my mind using [Figma](https://www.figma.com/) and [Framer](https://www.framer.com/), but static designs couldn't capture the flow I wanted: *me chatting with an AI agent -> the agent updating report data in real time*. Or maybe it was just me being bad at using them.

So I decided to set up [Cursor](https://www.cursor.com/) (my favorite IDE at the moment) and created a new project. It was a Next.js web app, because [I've already some experience with it](https://mutt0-ds.github.io/posts/2024/11/my-journey-with-webapp/), and it was a complete solution for creating and interactive web application to show what I had in mind.

Finally I had some time to try to experiment a little bit without the pressure of a complex codebase to handle. I had something in my mind, and the freedom to create everything I wanted.

**45 minutes later**, I was done.

## The strategy

Remember, I had no clear ideas yet. I just wanted to imagine how an AI agent would work in my mind.

My only rule was that **all code would be AI-generated**.

In the Cursor Agent prompt, I told my model ([Gemini 2.5 Pro](https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/), by far my favorite for coding) to follow this strategy, iterating as I refined my vision:

- Create a dashboard with 4 panels
- Add a chat component
- Set up an OpenAI API agent that uses tools to interact with my data (a local file)
- Create 2 chart components (to simulate a dashboard)
- Embed a mock report in the final panel

Then we developed the interactive logic where I could ask the model to change parameters, modify data, and generate final reports.

## First impressions: amazing experience

It felt **incredible**. I entered "the flow" immediately, rapidly iterating, building, transforming my code. I've rarely felt so productive. 
What would normally take days (if I ever finished it, probably not, it wasn't worth the effort for something I would have shown in a 5-minute call) took minutes. The dopamine hits kept coming as each task completed.

Then I realized what I'd done. I'd sinned. I'd vibecoded.
**The codebase was a mess (especially the tool-usage logic) and I barely understood it.**

Jokes aside, I noticed how tempting it was to keep prompting fixes without thinking. LLMs tend to overcomplicate solutions when uncertain. Despite limiting verbosity (with Cursor Rules), the model built an unnecessarily complex tool-calling system when I just wanted: "If I ask to change data, call change_data; if refreshing, call refresh_report". You need discipline to rein them in when they hallucinate or derail. As I've said repeatedly: it's an art. A vibe.

What truly scared me? **I didn't learn from my work**. It felt like reading a stranger's codebase.
For throwaway code, fine, but for serious projects? Unacceptable. You must understand what you're creating, at least structurally. I'm tired of working on undocumented codebases with obscure logic, and I refuse to contribute to that legacy.

Near the end, I got stuck because I'd forgotten how the chart logic worked. I spent 10 of my 45 minutes reverse-engineering my own "code." A warning sign.

Still, my ugly prototype served its purpose. On Monday, I showed it to my team and we briefly discussed the (still vague) concept.

The lesson? **Going full speed with AI is tempting and fun, but also dangerous without critical thinking**. I understand the excitement. But combining tools with experience, judgment, and "vibe" yields far better results in the long run.


## Final Observations

- **AI excels at frontend work** (structured, framework-specific code). I struggled more with backend tasks where business logic derails LLMs.
- **Perfect for throwaway code** and scripting (obviously).
- **"AI etiquette" remains crucial: critical thinking can't be automated**. I learned through experience, just like with Googling.
- If I was a junior, **I would prioritize learning how to use AI tools effectively**. It's a different approach, where you keep asking and asking the LLM to explain what it did, and learn during the procces. It's important because the landscape has changed. I don't need juniors for menial tasks, but a junior with a reliable strategy (e.g. not just throwing bad AI-generated code) can go very far.
- [**Cursor Rules**](https://ghuntley.com/stdlib/) help (I hate LLM verbosity).
- **Experienced devs can 2x-5x productivity** by knowing what to ask and how to supervise. My workflow: brainstorm → AI drafts → I implement → AI refines → I verify. The human in the loop can't be removed. DO NOT AI implement -> end.
- Experience also helps to **identify when AI is going in the wrong direction**, usually an over-complicated solution you don't need
- **Non-technical users going unchecked worries me**. But in the end is no worse than bad consultants or a bunch of interns. Just harder to detect, but we still didn't break the world.
- **Explaining these nuances to non-devs will be tough**. Anyone with no experience can build my same dahsboard and think *"why do I need an engineer"*. As other have predicted, this mountain of technical debt written by AI will kick us back in a few years and there will be more sensitivity about the topic, but for now, we need to be very clear about how important the human in the loop still is.

That said, I'm optimistic about AI's potential. These tools are transformative and here to stay. We just need to use them wisely.
