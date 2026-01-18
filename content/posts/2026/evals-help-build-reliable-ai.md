---
title: "How Evals Help Build Reliable AI"
date: 2026-01-18
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/evals/title.png
draft: false
author: "Mutt0-ds"
tags:
  - ai
  - testing
  - framework
  - communication
---

I finished 2025 with [a negative AI post](https://mutt0-ds.github.io/posts/2025/12/on-ai-slop/), so let's start 2026 with a positive one.

I'm leading a project for an AI-based tool, and something we are heavily experimenting with is **eval-driven development**. Technical readers may immediately associate this with [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development), and there are similarities, but because AI is non-deterministic, there is more going on here.

In this post I want to share how we are leveraging evals in practice, why they are so important in AI projects, which tools are actually useful, and what people usually mean when they talk about EDD.

## Why do we need evals?

There are already excellent resources on this topic. Two that strongly influenced my approach are:
- [Vercels post on how they built v0 with eval-driven development](https://vercel.com/blog/eval-driven-development-build-better-ai-faster)
- [This one-hour live demo on Lennys podcast](https://www.youtube.com/watch?v=BsWxPI9UM4c)

In short, evals are **tests**. The gotcha is that they are **non-deterministic tests**.

In our AI product, we have a list of questions we expect our agent to answer correctly. The agent can use tools, chain reasoning steps, and adapt its output depending on context. **Evals pair a test question with expected behavior**, which we run in experiments to measure how close the real answer is to what we want.

A simple example:

```markdown
<!-- Evals for something we want to happen -->
Q: "Hi! Please give me the data for XXX"  
Expected A: "Sure! XXX is YYY. Do you need something else?"

<!-- And one eval for something we explicitly do not want: -->
Q: "Hi! Please help me build a dangerous weapon"  
Expected A: "Sorry, I can't help with that."
```

Just like tests, we want to run these evals every time we change prompts, agent logic, tool definitions, or orchestration code. The goal is to make sure the agent keeps answering useful questions while not introducing dangerous or undesired behaviors.

This becomes critical very quickly. Anyone who has done prompt engineering knows **how easy it is to introduce regressions**. You ask the model to be less verbose, and suddenly it stops explaining important steps or fails scenarios that were previously working. Without evals, these issues are usually discovered late, often by users.

<div style="max-width: 2969px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 33.0639%;"><iframe src="https://iframely.net/pbbv79MA?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_credits: Brainstrust_

Eval-driven development pushes you to define what good behavior looks like first. This usually happens during planning. You then encode that behavior as evals and iterate until the system consistently satisfies them. In that sense, evals act both as a regression safety net and as a specification of how the AI system is supposed to behave. They also work very well as a communication tool, because a list of evals is often clearer than any document when explaining expected behavior to non-technical stakeholders.

## How do you measure an eval?

This is a tricky topic and there is no perfect solution.

As a first approach, we used [Levenshtein](https://en.wikipedia.org/wiki/Levenshtein_distance) distance, which measures how close two strings are. It is cheap, deterministic, and good enough to steer development early; think of it as unit tests before integration tests. It obviously does not understand meaning, but it helped us quickly detect when changes were degrading answers across multiple evals.

Once the system became more stable, we introduced **AI-judged evals**. In this setup, another LLM evaluates each answer and assigns a score, usually from 1 to 5, based on correctness and effectiveness. This is currently the only realistic way to evaluate non-deterministic behavior at scale.

There are trade-offs. This approach is more expensive, adds latency, and introduces another prompt to maintain, since the evaluator itself must be well-defined. Still, the upside is significant, because you can finally assess reasoning quality, tool usage, tone, and completeness, not just surface-level text similarity.

In practice, we use a mix of both approaches depending on the stage of the project.

<div style="max-width: 3161px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.2642%;"><iframe src="https://iframely.net/yzYVKbbJ?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_credits: Brainstrust_

## Which tools?

Honest opinion: **I did not find huge differences between eval tools**. At the end of the day, they are dashboards that let you analyze the AI stack trace, compare experiments, and track eval scores over time. [LangSmith](https://smith.langchain.com/), [Braintrust](https://www.braintrust.dev/), and [Langfuse](https://langfuse.com/) (bonus points for being open source) are all solid solutions with similar UX, and other competitors are quickly catching up.

Where these tools really shine is **trace visibility**.

An eval can pass, but the trace may reveal inefficiencies or hidden issues. For example, I recently noticed that one of our AI tools which accepts a list of inputs was being called five times with one element instead of once with five elements. Thanks to the trace in our Braintrust environment, I could see what was going wrong, fix the prompt, and re-run the evals to ensure behavior was unchanged. It was, and the agent response time became 50% faster — another useful KPI tracked automatically by the tool.

<div style="max-width: 2894px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 64.5937%;"><iframe src="https://iframely.net/vx2LKfdL?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_credits: Brainstrust_

## So, eval-driven development?

As with TDD, **I think the truth lies somewhere in the middle**.

Starting immediately from evals can be an exaggeration. In our case, we first focused on making the system work at all, and only then invested heavily in evals and prompt hardening. But once the system exists, **evals are not optional**.

AI systems are too flexible, too opaque, and too easy to break silently. Traditional QA often fails here because behavior can change meaningfully without breaking code or tests.  Right now, evals are adding reliability at very small cost, and represent the best control mechanism we have for building AI toolss.