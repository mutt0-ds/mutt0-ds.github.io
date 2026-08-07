---
title: "On Terence Tao's chat: the prompt engineering era is over"
date: 2026-08-06
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/conjecture_chat/title.png
draft: false
author: "Davide Muttoni"
tags:
  - ai
  - math
  - terence-tao
  - engineering
  - prompt
---

There is something so satisfying in reading [Terence Tao's ChatGPT conversation](https://chatgpt.com/share/6a5fdc7a-d6f8-83e8-bbea-8deb42cfed56), where he and the model together verify a counterexample to the [Jacobian conjecture](https://en.wikipedia.org/wiki/Jacobian_conjecture), a problem that had been open since 1939. To be precise, Tao didn't find the example itself: it was presented by Levent Alpöge (with the help of Fable 5). But it's impressive to read how a mathematician that smart talks to an AI model, and how fast things move with "some good prompting".

It only took a few well-calibrated back-and-forth messages. This is incredibly advanced math, a topic with rabbit holes so deep you need years of study just to enter them, which makes what happens in that chat even more impressive.

And it left me thinking.

What struck me first is how the LLM immediately switches tone when the question is technical. Like when Tao wrote `I can see why the jacobian map from x y z to x u r is so simple, this map is “upper triangular“ in some sense. But why is the jacobian from x u r to P Q R just a monomial?`: it suddenly cuts the fluff and proceeds, guided by the mathematician, to verify its findings. And notice that the prompt isn't reall-y a question. He says what he already understands, points at the one bit that doesn't fit, and asks the model to account for it. That's why it doesn't wander off.

<div style="max-width: 1055px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 79.5222%;"><iframe src="https://iframely.net/cHfy6AHe?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_Second message of the chat_

If I had been in that chat and asked _"wait, what is a three-sheeted/cubic structure?"_ - around the 20th word - the whole thing would have gone sideways into a math primer. Tao instead prompted the LLM as a peer, asking his questions only after working out the assumptions, sometimes unstated, that the model was running on.

Which is why I think **the "prompt engineering era" is over**. You don't need a super complex prompt like "[you are a smart mathematician. You are good with logic and math and thinking. ALWAYS follow these rules, etc...](https://community.openai.com/t/is-role-system-content-you-are-a-helpful-assistant-redundant-in-chat-api-calls/191229/3)". No. LLMs are smart enough to mirror us from the few words we give them.

And that's what I'm doing in my own LLM chats. No more prompt engineering, just direct, deep-dive hints on the thing I actually know. Translating this into the "tech" world, I don't ask my LLM generic questions like "fix this database migration" or "make my code faster". I point at the approach and the things to take into consideration, usually after a separate chat spent exploring the root issue together. Something concrete like "this migration adds a NOT NULL column to the XYZ table, so it holds an exclusive lock for the whole rewrite, check whether the foreign key on YZX gets dragged into the same lock".

There's a positive side to this, and it's exactly where the difference between a junior and a senior shows up: **you can only guide an LLM as far as you can follow it**. A senior developer, or in this case a brilliant mathematician, can route a model by orders of magnitude better than someone who doesn't yet know what to look for.

<div style="max-width: 774px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 121.8604%;"><iframe src="https://iframely.net/yBcyVGkx?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_The more you read the chat, the scarier it becomes_

You could say that modern AI models are getting better at generating their own questions, so maybe this advantage doesn't last. I don't think so. It's like having more powerful cars: everyone benefits, but only professional drivers can push them to the real limit.

With LLMs you can learn faster than ever, but I don't think you can shortcut your way to that _pro_ status. I can't just tell Claude _"generate some prompts to validate this Jacobian conjecture counterexample"_ and expect Tao's results.

<div style="max-width: 790px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 76.4438%;"><iframe src="https://iframely.net/YxNcOa0N?theme=dark" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_No shortcuts!_

Which raises the real question: **how do you become that "pro" today**? Most of my critical thinking came from failure, and the model removes exactly those hours... It hands you the working version before you ever build the broken one. But I don't think that closes the door. The struggle used to find you anyway; now you have to go looking for it. Read the diff before accepting it, ask why this approach and not the other, make the model defend its answer instead of thanking it, and so on... Done that way you can build the muscle, but it's going to take time.

So, it's the end of shortcuts. The model will go as deep as you can take it, but it won't pick the depth for you, and that's the moat: **Tao got to a real counterexample because he knew which rabbit hole was worth going down**, and could tell when the model was standing in the right one.

Which is good news, in a way.  
The better these models get, the more they pay out to whoever knows where to point them.