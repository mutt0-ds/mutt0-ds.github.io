---
title: "Don't delegate taste"
date: 2026-10-31
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/ai_slop_ux/cover.webp
draft: false
author: "Davide Muttoni"
tags:
  - ai
  - design
  - ui
  - ux
  - vibe-coding
---


I'm definitely not a designer. I am practical: if it works, it works. 
But lately, I started seeing so many AI-designed sites and dashboards that my brain just says "AI AI AI -> B-tier work". Just like [the infamous em-dashes](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

AI today makes it possible to create a lot of fancy, shiny, incredible tools, but what everyone notices is that **LLM-generated UI also follows specific patterns**. And I'm not here to critique prototypes and projects that without AI would probably not exist. Creating UIs is HARD and it matters a lot in demos: most of the prototypes I spin up look like this.

![Four AI-built dashboards side by side](/images/ai_slop_ux/dashboards-side-by-side.webp)

_The AI layout: sidebar, a row of KPI cards, a chart below. Sources: [forexfin.tech](https://forexfin.tech/app/), [pug.sh](https://demo.pug.sh/), [stockfly.app](https://stockfly.app/demo), [verity.md](https://verity.md/demo)_

What is the problem then? I see two:

1. If everyone is following the same pattern, this becomes something we immediately associate with [slop](https://mutto.fyi/posts/2025/12/on-ai-slop/). It's generic, boring, and everyone can create it in 2 prompts. Do you want your work to be linked to that? I took great care in designing my website to feel a bit unique and "handmade": of course I used Claude to help me with Astro internals and lots of CSS tricks, but I don't want people to judge what I write by hand based on "slop signals" in the design.

2. More importantly, in interactive tools like dashboards, AI UIs often don't follow best practices. There are tons of UI smells, like long, basic text explanations scattered around the interface, inconsistency, wrong colors, no accessibility. This makes the experience ugly and frustrating for users.

What can we do about that? 
You can learn! 

**DO NOT DELEGATE TASTE**. 

👉 [AI has no taste](https://monroeclinton.com/ai-has-no-taste/). 👈

It's **you, unique and amazing human being**, who can add your experience, your craft, and your sense of aesthetics to deliver something that is beautiful and works.

Of course, there are skills like [Impeccable](https://impeccable.style/) that can audit and clean your UI. In my experience, they help a lot, but slapping a skill on top is a patch to a deeper issue. It's like a linter: it fixes what's wrong, but it doesn't teach you why it was wrong, and it misses the more nuanced decisions. Plus, Impeccable-patched websites still look the same once you start noticing them.

Follow a UX/UI course (I took [Shift Nudge](https://shiftnudge.com/), but you can find [many free resources on YouTube](https://www.youtube.com/results?search_query=ux+dashboard+course)). Ask for feedback on your frontend. Or ask your users. And presenting your work in a more aesthetic way, with minimalism, will help you grow because you can apply the same lessons to presentations/slides and visual communication in general. 

I also collected a little list of "AI UI smells" my tired brain sees (as of October 2026)


## Dashboards

**Same card, same 12px radius**

![KPI cards from eight dashboards with their corner radius](/images/ai_slop_ux/detail-kpi-card-radius.webp)

_Sources: [forexfin.tech](https://forexfin.tech/app/), [verity.md](https://verity.md/demo), [swiftcruit.ai](https://www.swiftcruit.ai/demo/candidate-scorecard), [pug.sh](https://demo.pug.sh/), [stockfly.app](https://stockfly.app/demo), [tryroal.com](https://tryroal.com), [easymacros.fit](https://easymacros.fit), [embersent.com](https://embersent.com)_

---

**Everything is a pill**

![Pills from ten sites, almost all with a 9999px radius](/images/ai_slop_ux/detail-pills.webp)

_Sources: [verity.md](https://verity.md/demo), [pug.sh](https://demo.pug.sh/), [stockfly.app](https://stockfly.app/demo), [tryroal.com](https://tryroal.com), [boilerroom.ai](https://boilerroom.ai), [easymacros.fit](https://easymacros.fit), [embersent.com](https://embersent.com), [swiftcruit.ai](https://www.swiftcruit.ai/demo/candidate-scorecard), [deepsql.ai](https://deepsql.ai)_

---

**Tiny uppercase labels everywhere**

![Eyebrow labels from seven sites](/images/ai_slop_ux/detail-eyebrows.webp)

_Small, gray, letter-spaced uppercase labels on top of every number and every section. Hard to read, and they add noise without adding information. Sources: [forexfin.tech](https://forexfin.tech/app/), [verity.md](https://verity.md/demo), [swiftcruit.ai](https://www.swiftcruit.ai/demo/candidate-scorecard), [tokenmaxxer.xyz](https://tokenmaxxer.xyz), [agentwatch](https://agentwatch-two.vercel.app), [embersent.com](https://embersent.com)_

---

**Cluttered card details**


![Six KPI tiles with delta pills, sparklines and truncated labels](/images/ai_slop_ux/dashboard-pug-kpis.webp)

_Every KPI gets a percentage change and a tiny chart. Compared to what? Over which period? Usually it doesn't say, and the labels get truncated to make room. Source: [demo.pug.sh](https://demo.pug.sh/)_

![Five KPI tiles with trend icons and green or red numbers](/images/ai_slop_ux/dashboard-stockfly.webp)

_Source: [stockfly.app](https://stockfly.app/demo)_

---

**Inconsistent data**


![+$0.00 and +0.00R on an account with no trades](/images/ai_slop_ux/dashboard-forexfin-kpis.webp)

_This account has zero trades, but the dashboard still shows +$0.00 in green, like a gain. Source: [forexfin.tech](https://forexfin.tech/app/)_

---


**Duplicated data**

![78 / 100 and 78% as two separate KPIs](/images/ai_slop_ux/dashboard-swiftcruit-kpis.webp)

_78 / 100 and 78% are the same number, shown as two separate KPIs. It tells you nothing new. Source: [swiftcruit.ai](https://www.swiftcruit.ai/demo/candidate-scorecard)_

---

**The vanity number**

![Tokens tracked across the network: a giant counter](/images/ai_slop_ux/dashboard-tokenmaxxer-vanity.webp)

_A giant counter. Which decision would you make with it without context? Source: [tokenmaxxer.xyz](https://tokenmaxxer.xyz)_


## Landing pages

**Three-beat headlines**

![Your footage. Your timeline. Your finished story.](/images/ai_slop_ux/triplet-filmcraft.webp)

_Source: [filmcraft.tools](https://filmcraft.tools/)_

![Locked. Local. Yours.](/images/ai_slop_ux/triplet-fundstash.webp)

_Source: [fundstash.app](https://fundstash.app/)_

![You find it. You lose it. Never again.](/images/ai_slop_ux/triplet-rocus.webp)

_Source: [rocus.io](https://rocus.io/)_

![Same app. Any price. You pick.](/images/ai_slop_ux/triplet-pulseos.webp)

_Source: [pulseos.finance](https://pulseos.finance)_

![Clear names. More room. Every folder.](/images/ai_slop_ux/triplet-lisorto.webp)

_Source: [lisorto.app](https://lisorto.app)_

![Your coding agents. From task to PR. One terminal.](/images/ai_slop_ux/triplet-craig.webp)

_Source: [craig-cli.com](https://craig-cli.com/)_

---

**The gradient (or italic) accent word**

![Your AI Media Workstation. Generate Magic.](/images/ai_slop_ux/gradient-word-chitra.webp)

_Source: [chitra.studio](https://chitra.studio/)_

![A CAD kernel for everyone who makes things](/images/ai_slop_ux/gradient-word-popkern.webp)

_Source: [popkern.dev](https://popkern.dev/)_

![Look rested, not done.](/images/ai_slop_ux/eyebrow-italic-mirrormd.webp)

_Source: [mymirrormd.com](https://mymirrormd.com/)_

---

**The eyebrow label**

![THE PROBLEM eyebrow](/images/ai_slop_ux/eyebrow-problem-aiknowsus.webp)

_Source: [aiknowsus.com](https://www.aiknowsus.com)_

![PROOF, NOT A PROMISE eyebrow](/images/ai_slop_ux/eyebrow-proof-aiknowsus.webp)

_Source: [aiknowsus.com](https://www.aiknowsus.com)_

![PRICING eyebrow over Every connector. One price.](/images/ai_slop_ux/eyebrow-notch-pricing.webp)

_Source: [notchmetrics.com](https://notchmetrics.com)_

---

**Cards with a thick left border**

![Rounded cards with a thick left accent border](/images/ai_slop_ux/side-accent-agentalley.webp)

_Source: [agent-alley.com](https://www.agent-alley.com/)_

![Quote cards with left accent borders](/images/ai_slop_ux/side-accent-permit.webp)

_Source: [permit.petercai.com](https://permit.petercai.com/)_

---

**The icon tile grid**

![Three principles grid with icon tiles](/images/ai_slop_ux/icon-tiles-pug.webp)

_Source: [pug.sh](https://pug.sh/about)_

![Single Knowledge Map, Zero Mental Load, Hidden Connections](/images/ai_slop_ux/icon-tiles-rocus.webp)

_Source: [rocus.io](https://rocus.io/)_

![Pastel cards with matching icon tiles](/images/ai_slop_ux/icon-tiles-12axes.webp)

_Source: [12axestest.org](https://12axestest.org)_

![Dark mode icon tile grid](/images/ai_slop_ux/icon-tiles-aivideosugc.webp)

_Source: [aivideosugc.com](https://www.aivideosugc.com/ai-video-generation)_

![Cards with icon tiles and bold-label checklists](/images/ai_slop_ux/icon-tiles-resourcedeck.webp)

_Source: [resourcedeck.app](https://resourcedeck.app/)_

---

**Numbered "How it works" steps**

![Three numbered step cards](/images/ai_slop_ux/numbered-steps-slidebyside.webp)

_Source: [slidebyside.com](https://slidebyside.com/)_

---


**The glowing/gradient button**

![Purple to blue gradient pill button](/images/ai_slop_ux/purple-cta-aivideosugc.webp)

_Source: [aivideosugc.com](https://www.aivideosugc.com/ai-video-generation/product-video)_


![Blue button with colored glow shadow](/images/ai_slop_ux/glow-button-alttabr.webp)

_Source: [alt-tabr.com](https://alt-tabr.com/)_

---

**The pill above the headline**

![Status dot pill above the headline](/images/ai_slop_ux/pill-keepword.webp)

_Source: [keepword.net](https://keepword.net/)_

![100% Client-Side & Secure pill](/images/ai_slop_ux/pill-jsonformatter.webp)

_Source: [instantjsonformatter.com](https://instantjsonformatter.com)_

---


**Acme, Northwind and Maria**

![Fake browser with Acme data](/images/ai_slop_ux/fake-window-acme-eze.webp)

_Source: [eze.page](https://eze.page/)_

![Fake window with Northwind data](/images/ai_slop_ux/fake-window-doozy.webp)

_Source: [askdoozy.com](https://askdoozy.com/)_

![Good evening, Maria dashboard](/images/ai_slop_ux/fake-dashboard-roal.webp)

_Source: [tryroal.com](https://tryroal.com)_

## Copy

**Saying it twice**

![CTA button with fine print repeated below](/images/ai_slop_ux/cta-fineprint-chitra.webp)

_Source: [chitra.studio](https://chitra.studio/)_

![Pricing paragraph explaining the free plan](/images/ai_slop_ux/wordy-pricing-fastbrowse.webp)

_Source: [fastbrowse.ai](https://www.fastbrowse.ai/pricing/)_
