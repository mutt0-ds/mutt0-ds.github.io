---
title: "Why AI needs to dream: a guide to long-term memory"
date: 2026-05-09
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/memory/title.png
draft: false
author: "Mutt0-ds"
tags:
  - ai
  - software-engineering
  - coding
  - rag
  - memory
  - framework
---

**Agentic Memory** is an area of the AI world where even benchmarks are vague. How do you really measure "*memory*"? Retention? Relevance? Recall quality? Personality consistency? 

Honestly, it is surprisingly difficult to find concise, practical information on the topic. 

Sure, there are tons of libraries, frameworks, and academic papers around, but there is also a lot of [lies](https://www.reddit.com/r/LangChain/comments/1kg5qas/lies_damn_lies_statistics_is_mem0_really_sota_in/) and [confusion](https://blog.getzep.com/the-ai-memory-wallet-fallacy/). Plus, implementing this in a real-world scenario isn't easy.

Today, I'll guide you through long-term memory, "dreams", and the challenges I encountered while trying to implement it in production.


## Why we needed long-term memory

Essentially, to give our users a better experience.

How satisfying is it when ChatGPT, Gemini, or Claude remembers your name, your preferences, or instructions you gave weeks ago? It feels natural, and the overall experience dramatically improves. You build a relationship with your agent, and that matters a lot in UX.

I still remember when I told my ChatGPT: *"YOU MUST ALWAYS TALK TO ME IN A CONCISE WAY - NO BULLETS - NO SYCOPHANCY"*, and it has been quiet and direct since that day...

[good_boy]

I also noticed this with technical tools like [CodeRabbit](https://mutt0-ds.github.io/posts/2026/02/code-rabbit/). At some point, fed up with wrong PR comments, I repeatedly told the bot we were using Pydantic V1 (it was assuming V2). It stored that information in long-term memory and stopped flagging non-existent issues for good.

That's incredibly cool because it really feels like talking to a human. You don't need to change prompts or hardcode instructions, the model "learns" in real time.

But achieving that reliably is *very* difficult.


## The intricacies of long-term memory

For starters, **memory is complex**.

The earliest implementations were basically "startup context": injecting instructions like *"remember that my name is Davide, I like concise responses, and I live in Italy"* into every prompt. This is already up and running in most flagship models, and it's a highly efficient way to keep customizations active. I recommend to use it for things that rarely change like your name, tone preferences, and localization. 

[chatgpt memory]

But back in the day (about 500 days ago, I mean) there was a whole hype cycle around [ChatGPT "plugins"](https://openai.com/index/chatgpt-plugins/). They were essentially just injecting prompts like *"you are a helpful go-kart pilot"*, pairing it with a couple of tools to read data, and releasing them to users in a marketplace. 

This concept was quickly forgotten because:
1. Models got better, so you don't need a 500-word-long startup context anymore; you can just ask for something and the model understands what you expect.
2. Apps and plugins evolved into data connectors, which are a different thing entirely: they feed data, and the AI already knows how to use it.

So, while "startup context" works, it only goes so far. It doesn't really capture the nuances of personality, habits, or evolving preferences. It simply reminds the AI of some hardcoded instructions. Boring.

Over time, more sophisticated systems appeared. 
Starting with [this 2024 paper](https://arxiv.org/html/2410.15665v2) on long-term memory, the topic became increasingly interesting. [Google](https://research.google/blog/titans-miras-helping-ai-have-long-term-memory/) and [others](https://arxiv.org/abs/2504.19413) have experimented with newer architectures and memory systems.


## But how do memory systems work?

There are many advanced approaches, but most memory systems today are essentially a combination of:

- Vector storage
- Embeddings
- Summarization/compaction loops
- Reflection phases
- Retrieval systems (RAG)

Lots of big words, eh? The simplest version works like this:

1. The conversation is cleaned and trimmed.
2. Relevant information is extracted (usually by another model or complex algorithms).
3. The memory gets transformed into numeric vectors (easier for search) and stored in a vector database.
4. Future conversations retrieve relevant memories through semantic similarity (which is why we need vectors).

But let's simplify this even further. 
For example, after a long discussion with my AI tool, the conversation is packed and trimmed (removing noise, fillers, emojis, and other junk) and sent to a smaller model for a key-point summary.

From, say, 50 messages, the LLM generates 3 memories:

* *"Davide likes concise responses"*
* *"Davide prefers practical examples over theory"*
* *"Davide works mostly with FastAPI and Pydantic v1"* *(btw, I updated to v2 now, so this memory will have to change...)*

**Instead of storing 300 messages, the system stores less than 50 words**, converting them into vectors for optimization so when the LLM searches for "Davide preferences," it finds this info. The final step is giving the LLM a tool it can use to search this unique internal knowledge base whenever it feels it's needed. Like when I ask, *"how should you talk to me?"*

More advanced systems periodically "reflect" on conversations. Instead of storing raw interactions forever, they summarize patterns and compress information into higher-level memories.

For example, the list above may be "compacted" overnight into: *"Davide is a practical FastAPI/Pydantic v1 developer."* [Claude Code's "dream"](https://claudefa.st/blog/guide/mechanics/auto-dream) feature is a particularly fascinating example of this. Very complex and a real rabbit hole, which is outside the scope of this article.

Then there's **graph memory**, one of the most advanced strategies at the time of writing. Instead of storing isolated memories, it builds relationships between concepts.

For example:

```text
Davide
 ├── works with → FastAPI
 ├── prefers → concise responses
 ├── dislikes → unnecessary abstractions
 └── uses → Pydantic v1
```

https://raw.githubusercontent.com/DEEP-PolyU/Awesome-GraphMemory/main/figures/illustration_memory_comparison.png
(brief recap)
Graph memory allows for more contextual and relational retrieval instead of pure similarity search, mapping closely to how our own brains work with networks of neurons.

I'm intentionally oversimplifying here because there are already [many deeply technical articles](https://github.com/DEEP-PolyU/Awesome-GraphMemory) explaining the individual strategies much better than I could in a single post.

## What did I choose?

Imagine my confusion in this world of rapidly changing technologies.
During my research, I mainly explored [Mem0](https://github.com/mem0ai/mem0), [Zep](https://www.getzep.com/), and [Hindsight](https://github.com/vectorize-io/hindsight), plus a large amount of proprietary logic and hosted services.

I had pretty simple requirements starting out:

- Something simple
- Something reliable
- Something fast
- Something that doesn't burn too many tokens

The user needs to *feel listened to* without the system becoming incredibly expensive or slow.
After a lot of experimentation, I focused mainly on **Hindsight**.

It's still relatively new and requires some exploration, but I really like the philosophy behind it:

[Hindsight Research Paper](https://arxiv.org/html/2512.12818v1)

The core idea is pretty simple:

- **Retain** important interactions
- **Recall** them when needed
- **Reflect** periodically to reorganize memory

The reflection part is especially interesting, and it connects right back to the graph memory system I mentioned earlier.

Instead of treating memory as static storage, the system continuously revisits and restructures information over time, similar to how humans reinforce or forget memories. This helps avoid context pollution and prevents the memory layer from becoming a giant pile of irrelevant chat logs.

Hindsight also features a nice graph view so you can explore the memory freely, just like a "second brain". It honestly reminds me a lot of [my Obsidian vault](https://mutt0-ds.github.io/posts/2023/09/obsidian-update-6-months-later/).

[memory image]
*This is how it looks at scale (source: Reddit)*

<video src="https://github.com/user-attachments/assets/923b798d-3581-4897-bb62-9cfa5a931682" controls></video>
*A brief introduction to Hindsight, and a clean explanation of the graph memory mechanism!*


## Lessons learned

Now, **the more I talk with my AI applications, the more they understand me**, and the more some things start feeling completely natural.

Working with Hindsight was fascinating, but it forced us to make some difficult decisions, especially around optimization. And this is tricky for applications that need to scale.

We had to find a balance between caching meaningful interactions and skipping noisy data. If a user simply replies "OK" or pastes 100 lines of unrelated code in the chat, that's not clean memory material. Filtering what is actually worth remembering quickly became one of the hardest parts of the system.

Memory database read/write optimization is also interesting. You want to make it incredibly fast on reads, but it's totally fine if writes are a bit slower and handled in the background. Testing memory retrieval and recall is no easy feat either: it's a highly subjective, slippery metric.

Internally, we ended up building batching processes to:
- Split conversations
- Filter valuable interactions
- Compact redundant memories
- Asynchronously process reflections
- Update memory indexes

All of this had to run in the background while keeping user-facing latency under tight control.

I still think we are far away from a truly stable, universal model for AI memory, but current solutions are already solid enough to create a much more familiar, "*human*" experience. 

The key lesson is simple: **everyone wants to feel listened to**. Adding even a trivial long-term memory layer can step up your AI system's UX in completely new ways.