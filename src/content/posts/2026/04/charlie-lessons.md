---
title: "10 Lessons learned when building Charlie"
date: 2026-04-05
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/charlie_lessons/title.png
draft: false
author: "Mutt0-ds"
tags:
  - ai
  - software-engineering
  - productivity
  - framework
---

Last week, we launched [**Charlie**](https://www.investsuite.com/charlie), our first AI Agent, specifically designed and tailored for financial institutions.

While designing and building it over the past few months, the pace was intense. Now I finally have the space to step back and document the core insights we gained while developing this application. These lessons were instrumental for my team and me, and I believe they offer a valuable roadmap for anyone building in the agentic AI space.

I mentioned some of them in this episode of [The Suite Spot podcast](https://open.spotify.com/episode/5ns5bY7lzh0MHsSiCnyEzF), with more to come in the future. 

<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/episode/5ns5bY7lzh0MHsSiCnyEzF/video?utm_source=generator" width="496" height="279" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

Enjoy **10 lessons learned when building Charlie**!

---

### 1. Keep things simple

[**Simplicity** is my mantra for everything](https://mutt0-ds.github.io/posts/2025/03/first-pitch/), but in the AI world, where there is constant noise, it is essential. It is incredibly easy to over-engineer. We initially thought Charlie needed a massive, multi-step reasoning chain for every query, complete with nested agents. However, we learned that for 80% of the questions, a direct path from data retrieval to natural language explanation is both more robust and faster. The key is providing more high-quality tools and fewer complex agent systems that only add friction between tasks.

---

### 2. Design with evals in mind

You can't improve what you can't measure. We built a dedicated evaluation pipeline early on because, in the LLM era, [**evals** are the new Test-Driven Development (TDD)](https://mutt0-ds.github.io/posts/2026/01/evals-help-build-reliable-ai/). By testing Charlie against a "golden dataset" of real-world financial queries, we ensured that every prompt tweak or model update didn't accidentally break core logic or introduce hallucinations.

However, **building evals in a vacuum is a trap**. If you don't understand the specific context (the unique tasks, edge cases, and user intent) you're just flying blind. An evaluation framework only works if it mirrors the complexity of the actual environment Charlie operates in. Writing tests just for the sake of it will inevitably let real edge cases slip through.

---

### 3. The architecture must be flexible

Financial stacks are diverse. We built Charlie to be **model-agnostic and infrastructure-agnostic**. Whether a client runs on OpenAI, Anthropic, or a high-security on-premise model, our "Intelligence Layer" remains the source of truth.

The key here is choosing a stack that doesn't lock you in. Early on, we discarded several popular SDKs because they were too tightly coupled to a single AI provider. Getting entangled in those kinds of software decisions too early makes it impossible to pivot later when the tech landscape shifts.

---

### 4. Context is king

Charlie's real power comes from its ability to bridge the gap between macro events like a Fed rate hike and the specific holdings in a user's account.

Before, I was used to having a big set of rigid rules to steer the LLM in the right direction. What we discovered is that **modern models are exceptionally good at handling massive context windows**. By shifting the burden from "rule-following" to "context-understanding," the system becomes much more fluid and capable of handling nuances we might have missed in a manual workflow.

---

### 5. UI is underrated

We learned early on that relying solely on text is a recipe for user fatigue. Instead of delivering walls of text, **we crafted beautiful, functional widgets** and taught Charlie how to trigger them. This makes the experience unique, intuitive, and significantly faster. To keep this scalable, we use a standardized protocol to ensure the UI remains consistent regardless of the underlying stack.

<div style="max-width: 1500px;"><div style="left: 0; width: 80%; height: 0; position: relative; padding-bottom: 97.7647%;"><iframe src="https://iframely.net/oDazLGUc?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

---

### 6. Flows are difficult to enforce

In a regulated environment, you can't simply let an AI "hallucinate" a trade. To ensure absolute reliability, **we built strict, deterministic state machines** to handle order execution. Blending non-deterministic language with execution was one of our trickiest challenges. In high-risk scenarios, we actually prefer a "dumb" AI that follows a rigorous, pre-defined checklist over the more creative or nuanced "classic Charlie" experience.

---

### 7. Add constitutional guardrails

We implemented a dedicated **Compliance Layer**: a set of constitutional guardrails that act as a real-time filter for every single output. It is a separate, highly specialized logic layer that monitors the conversation. If Charlie's response even skirts the line of providing unauthorized financial advice or making unverifiable claims, these guardrails catch and neutralize it before the user ever sees it. I cannot stress the importance of guardrails enough.

---

### 8. Deterministic math is non-negotiable

**Never let an LLM do the math**. Charlie uses the LLM to understand the intent, but the actual performance figures and calculations are pulled from our deterministic financial engines.

Every figure Charlie presents is generated by audited tools because the very first thing a user asks when they see a number is: "Where exactly did this come from?" Our quant team worked hard to ensure that every point is backed by a verifiable tool, not a statistical guess from a language model.

---

### 9. Latency is the silent killer

Users expect **instant feedback**. We quickly realized that while a powerful model is smart, waiting 10 seconds for an answer feels like an eternity in a chat UI. We solved this with several techniques, from caching to streaming responses, asynchronous calls, and preloading the heavy calculation engine. This wasn't really an AI challenge—it was a classic performance and parallelization task.

---

### 10. Observability is the secret sauce

Using tools like Braintrust for observability allowed us to see exactly how Charlie reasons through complex data in production. This **transparency** is what eventually wins, because you can monitor and measure the actual logic paths the agent takes. Without that visibility, we're just navigating blind.