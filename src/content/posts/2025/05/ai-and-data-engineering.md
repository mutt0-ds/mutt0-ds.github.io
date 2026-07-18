---
title: "No, AI is not replacing Data Engineers."
date: 2025-05-29
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/ai_data_engineers/pipeline.jpg
draft: false
author: "Mutt0-ds"
tags:
  - ai
  - data-engineering
  - power-bi
  - copilot
  - prototyping
---
[Claude 4](https://www.anthropic.com/news/claude-4) landed, and as usual, it kicked off the usual hype cycle.
"Best coding model ever" "It writes stories!" "AI is replacing programmers!" And of course, LinkedIn is buzzing with non-technical folks declaring how engineers are doomed and it’s time to "rethink talent".

Anthropic CEO even dropped a [spicy take](https://www.pcmag.com/news/anthropic-ceo-ai-poised-to-wipe-out-50-of-entry-level-jobs-in-next-5-years): AI could wipe out **half** of all entry-level white-collar jobs and spike unemployment to 10–20% in the next 1–5 years.

<blockquote class="twitter-tweet" data-dnt="true" align="center"><p lang="en" dir="ltr">Anthropic CEO predicts:<br>2025: 50% of code written by AI<br>2026: 100% AI-written code<br><br>My take:<br>2025: 50% AI code<br>2026: 100% AI code<br>2027: 75% human-written code<br>2028: Senior devs earning big by fixing AI’s mistakes from 2026</p>&mdash; Adi Polak (@AdiPolak) <a href="https://twitter.com/AdiPolak/status/1902688673562268055?ref_src=twsrc%5Etfw">March 20, 2025</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Bold. But **what about data engineers**?

And no, I’m not doing another ["AI is a tool, not a replacement" speech](https://mutt0-ds.github.io/posts/2025/04/ai-generated-code/). That’s tired. A slightly better score on some synthetic coding benchmark doesn’t move the needle for me. Developers will adapt, and more opportunities will unlock.

What I want to explore is this: 

> Why is Data Engineering still so unmoved by all this AI hype?

There’s still some wild claiming happening out there, like [this guy](https://www.linkedin.com/posts/mattdancho_tableau-and-powerbi-are-getting-killed-by-activity-7309237909319020544-_-lK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2U3k8BCS51ADEjGbUB2Wf0ovHOD7F_hng) saying "Tableau and Power BI are getting killed by free AI tools". We'll get back to it later.

For me, broad data engineering (*the building of systems to enable the collection and usage of data*) breaks down into three areas where AI still doesn't cut it:

## 1. Greenfield Prototyping

This one’s my favorite. Also, the most chaotic as it ranges from "try out this new API integration" to "Boss wants a number by 4 PM".

It’s what happens when a new project starts, or a client shares a dataset with you and says "can you tell us if this is usable?" You connect to the source, pull out the data, clean it out, maybe throw some Excel magic or Python scripts in there and get something to use before the meeting.

It’s not “data engineering” in the job-title sense. I’ve seen finance analysts, HR folks, even sales do some form of this. **Prototyping is the messy, improvisational foundation of early-stage data work**: that's why I find it so fascinating, and it's the core of my work.

<div style="max-width: 576px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//iframely.net/rO1XsCE2" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

*Me, prototyping.*

Indeed, we were all impressed when ChatGPT started parsing Excels and doing exploratory data analysis. But real life isn’t a demo video.

<div style="max-width: 2292px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 53.089%;"><iframe src="//iframely.net/dbcNKH9N" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

Take last week: I had to prep a usable API input for our product, [StoryTeller](https://www.investsuite.com/storyteller). The client sent over an Excel file with financial instruments. Here’s what I ran into:

- Excel date formatting broke the script
- U.S. numbers used dots and commas
- Some rows had negative quantities, but not always
- Internal instrument codes used a naming scheme no one warned me about
- One of those codes crashed another system
- Had to coordinate with the data team to understand what failed
- Then came up with a narrative to justify why we excluded some instruments in the final report

AI helped a bit. I mean, sure, it generated the skeleton of a Python script to start with. But the actual decisions, the weird little fixes, the intuition to say, "huh, this column doesn’t look right"? Still 100% human. It started hallucinated at point 1 of my list, removing instruments instead of trying to fix the error.

The truth is, coding AI works well when the problem is clean and the data is predictable, as it happens in simple software development. 

They're still doing decently in the greenfield data prototyping, and I recommend testing AI out and find its limit and strenghts! They can be incredible companions.

But they tend to crumble when they hit something new, which is pretty much the norm. Because **in early-stage, high-pressure, ambiguous data work, AI doesn’t really know what to do**. And let’s be honest: sometimes, **neither do you**, until you start poking around.

## 2. Structured Data Cleaning/Data Entry

Now let’s talk about the other kind of data work.
The "download a file, change some headers, check for mistakes, re-upload it to another system" kind. A staple in corporations everywhere.

<div style="max-width: 600px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 66.6%;"><iframe src="//iframely.net/RJi1v8Ra" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

I've seen around quite some time: from Marketing interns downloading Google Analytics results to make a weekly chart in Excel, to more complex manual steps between one internal system and another that "is not connected".

It’s mind-numbing. And honestly? This is **where AI should be amazing**. The process is clear, repeatable, and boring. 

But here’s where I’m still skeptical.
Because the truth is, most of this could’ve been automated years ago. Not even with AI (usually), just regular old Python scripts, or tools like Power Automate, Zapier, Excel macros. The real blocker is [**Organizational Inertia**](https://www.sciencedirect.com/science/article/pii/S1029313221000038).

We leave the realm of technology and step into something messier: corporate politics, unclear accountability, audit checkboxes, and datasets so poorly documented that nobody’s ever fully understood the process… Let alone explained it to an AI.

Sure, AI might help a non-technical person put together a working prototype and be more precise and convincing in the initial analysis. But will it slash 50% of these menial jobs like Anthropic CEO says?

Not unless corporations get serious about automation, documentation, and [data culture change](https://mutt0-ds.github.io/posts/2024/10/my-talk-about-data-culture/).


## 3. "Real" Data Engineering

Finally, the heavyweight: real, honest, at-scale data engineering.

This is the big stuff: pipelines, databases, orchestration tools, dbt, Airflow, AWS Glue, Azure Data Factory, cron jobs, **everything that the actual Data department is in charge of**. 

And what’s interesting is: this side of the field can be less complex than building a full-stack app, yet somehow, AI tools haven’t gained much ground here. 

I’m seeing Microsoft push hard tools like [Data Formulator](https://github.com/microsoft/data-formulator), Copilot in [Power BI]() and [Azure](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction). But like most AI tools, they work great on toy problems and fall apart when things get medium to high complexity. From what I’ve seen and read around (check [here](https://data-goblins.com/power-bi/copilot-in-power-bi) and [here](https://www.reddit.com/r/PowerBI/comments/1gmpuef/thoughts_on_powerbi_copilot/) for example), it’s mildly helpful. Copilot can nudge you toward a valid SQL query if you forget the syntax, but beyond that, it’s mostly noise.

<div style="max-width: 2042px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 51.6451%;"><iframe src="//iframely.net/87NeaWNO" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

*Copilot in Power BI - Credits: Data Goblin*

Because **it lacks the nuance**. Just a few complications, off the top of my head:

- You need **a deep understanding of stakeholders and internal context** before you even touch the data. In some cases, it took our team weeks of meetings just to get aligned on what was actually needed.
- Every company’s data setup is its own weird snowflake and **there is no training data**: custom tables, inconsistent logic, vague documentation (if any). You can add your own notes to help AI a bit, but it’s still new for these models. They haven’t ingested millions of Stack Overflow answers about your company’s data.
- Multiple joins, inconsistent naming, unexpected errors, buggy tools: there’s always something weird waiting to break.
- **Accountability**: Who signs off on the output? If a dashboard fails, or worse, silently shows the wrong numbers, what happens?

And even if the AI agent somehow gets the logic right… **how do you trust it?**

[A hallucinated React component is easy to spot](https://mutt0-ds.github.io/posts/2025/04/ai-generated-code/). It crashes or looks weird. Bad data quietly poisons your reporting until someone in the C-suite sees a chart that doesn’t add up, and then suddenly, it’s your problem.

The tooling is getting flashier, but the core problems are still human, still fuzzy, still hard to automate.

<div style="max-width: 941px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 99.7449%;"><iframe src="//iframely.net/93lNyZNr" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>


*Credits: Data Goblin*


## So... Will AI Replace Data Engineers?

**No**. Not even close (at least not right now).

AI is definitely helpful: it’s making some of the boring, repetitive stuff easier and speeding up the usual boilerplate work. A solid sidekick, for sure.

But data engineering is still too messy and too tied up in context; full of unique problems and half-formed business logic that you just can’t solve with a simple prompt or a few lines of code. 

Concluding, AI’s progress is impressive, and I’ll be watching every update closely. But if you’ve actually been in the trenches with data, you already know the truth:

> AI isn’t replacing you anytime soon. It’s just handing you a slightly faster shovel.


