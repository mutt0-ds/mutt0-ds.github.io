---
title: "What Power BI is still missing"
date: 2023-03-27
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/power_bi_missing/what-power-bi-missing.jpg
draft: false
author: "Mutt0-ds"
tags:
  - power-bi
  - features
  - reporting
  - documentation
  - version-control
  - composite-model
  - ai
---
During these months I had the chance to take a look at Power BI at enterprise level, juggling advanced requests from hundreds of users and reports.
Definitely, I'm impressed by all the features that the developers has rolled out recently,greatly improving both user and creator's experience. However, one should always maintaing an impartial critic vision of the tools, no matter how useful they can be. For this reason, I decided to share my thoughts about some features that are currently lacking or require over-complicated solutions (often from third-party tool), in hope that Microsoft will find them useful when working on Power BI development roadmap.

While writing, I found myself lucky as all the points I'll state are currently edge cases or issues I've solved with other solutions, so I would say that, overall, Power BI has reached a level of maturity where it smoothly does its standard job (data visualization) and provide tons of useful tools, customization and synergies with the Office suite, while being updated monthly.

In a hope that these points will be tackled in the near future, I have added a "Hope level" rating, where I speculate about how likely it could be that the feature will be implemented in the near future. The time of writing is March 2023.

## 🔢 Basic Version Control

> 📿 Hope level: 7/10
That's an old story: .pbix files are binary, so they can't be easily tracked and compared with git or other versioning systems. Considering that the parent company owns Github, this is tragicomic, but I guess that the priorities are different, see [Copilot X with GPT-4](https://github.blog/2023-03-22-github-copilot-x-the-ai-powered-developer-experience/)... There aren't many big teams of Power BI developers out there who really need the feature.

In our situation, this was starting to became annoying month after month, with models bicoming bigger and still no easy way to compare the different versions. I put a patch in [another blog post](https://mutt0-ds.github.io/posts/2022/11/turbulent-journey-power-bi-source-control/), where an over-engineered Azure Pipeline downloads a third-party tool (Tabular Editor 2) every time, uses it for extracting JSON metadata that will be then committed together and used for keeping track of part of the model (only tables, columms and relationships but no charts or visuals). Git integration [was announced a few weeks ago](https://twitter.com/mthierba/status/1618701222177042433), then canceled, then supported in [an upcoming TMDL](https://twitter.com/PowerBITips/status/1636675335591788545/photo/1) initative by SQLBits... There is still no clear direction defined, but things are in motion.

## 🔘 Enhanced User Input

> 📿 Hope level: 4/10
An edge cases which is more common than I was expecting, especially in case of forecasts. In short, users need to insert one or more inputs (e.g. a Coefficient of Growth) and then see live results in Power BI.
At the moment this is rather difficult to put in practice, either with over-engineered Power App solutions or with a combination of Tables, Slicers and code (I almost lost my sanity on 100-lines DAX code).
I wish there was a plugin or a chart with "User Input" with an input area where the user can write some values that will populate the live data, but I see how complicate it can be at structural level, and probably not worth the effort for an edge case. Also, Power BI is a data visualization tool so this is not really what we are expecting from it.

Microsoft has partially got around it with the Analyze in Excel feature: it is now easier to just connect the dataset to Excel and create ad-hoc formulas from there. While waiting for a native Power BI solution, let's just stick to Excel.

## 🧰 Developer tools

> 📿 Hope level: 6/10
Compared to other Microsoft's products, like Typescript or Playwright, Power BI is lacking some basic developer-friendly plugins, mostly because BI developers that need them are just a tiny niche. However, coming from other languages, I feel the lack of support for my daily activities rather bizarre, especially when things get messy with DAX (Power BI script language, inspired by Excel's fomula one).

I don't like DAX, sometimes I want to give up on it, and Microsoft doesn't really give me anything for improving my experience when writing queries that are more than 2 lines long. Poor DAX doesn't even hage a logo or a Syntax Highlighting plugin!
Luckily I rarely have to create long DAX queries in Power BI, the majority of calculations logics are in the Data Warehouse, but sometimes there are edge cases that require ad-hoc DAX measures, rarely of multiple lines.

Creating them in the Power BI tab is suitable only if you like to become crazy with debugging: the simplest solution is another Third-party tools, DAX Studio by SQLBI, which enables Syntax Highlighting, Formatting, Linting, quick access to Documentation and rather simple debugging. I totally recommend DAX Studio, a wonderful and open-source tool, but considering that Microsoft owns VS Code, I am waiting for some DAX-compatible extensions to better integrate my workflow.  

## 📄 Intermediate-level Documentation

> 📿 Hope level: 2/10

This is a struggle I'm having with Microsoft in general, as its documentation spectacularly manage to overcomplicate even simple concepts.
In my opinon, Microsoft docs are great when someone is an advanced user which can understand all the technical jargon that is took for granted, but for a beginner or even an intermediate dev, this is overwhelming.
For beginners, I recommend [dax.guide](https://dax.guide) from the SQLBI team (just compare their [COUNT](https://dax.guide/count/) example with the [one on Microsoft.com](https://learn.microsoft.com/en-gb/dax/count-function-dax): examples, working code, clear explanations of the cases, links to other concepts) for understanding what each function does and how it works.

For the majority of intermediate doubts (row/filter context, data connectors, small DAX formulas and so on), it's still quicker to look at the Power BI forums or to YouTube videos, for example from [Guy In A Cube](https://www.youtube.com/c/GuyinaCube).

[Learn.microsoft.com](https://learn.microsoft.com) remains my last hope when I'm looking for documentation, even if I consider myself an advanced user, and I wish that Microsoft will simplify the website for less-technical users. Luckily enough, this has lower priority as the web is full of useful and informative third-party sources.

## 📈 Composite model

> 📿 Hope level: 8/10

Another experimental feature from Power BI that is giving me a bit of headaches lately.
Don't get me wrong, the Composite Model is as **game changer** as it makes possible to provide a central Power BI dataset with all the data and security rules enabled, and then creators can use it as a source and merge it with their owns (usually Excel files).
This is very cool as it replaces and simplify many manual processes while giving lots of power to the secondary report creators, but it's still an experimental feature which requires a bit of a tricky (and badly documented) steps for working on the Power BI Service, while on Desktop is pretty straightforward:

- Viewers need Build Permissions to all the underlying datasets (which could be a security issue)
- Apparently, RLS impersonation gets screwed, as I tried to impersonate users and I was able to look at all the data (but in reality they can't)
- If the original dataset has a gateway, we have to set it up credentials on all the Composite Model dataset and map everything on the gateway
- User can't add calculated columns or tables to the tables from the original Dataset, which blòocks many custom logic requirements

In the future, I would love to just keep a central dataset where users are free to connect and create their own reports with independence, but even if the Composite Model is a great starting point, it still requires some tweaks to achieve before being adopted.

## 🤖 AI-enhanced capabilities

> 📿 Hope level: 9/10

I wrote this final line just for tagging the post with #chatgpt and #agi to boost views.
Joking, I am sincerely curious to see how Microsoft will implement Open AI's tool in Power BI, as the current option are a bit limited in terms of UX experience. Yes, there is the Q&A feature, but it never really clicked with me as it's not that smart and intuitive at the moment.

I wouldn't be surprised to see a ChatGPT-like prompt where the user can type the questions and receive quick replies, charts, or even help with the filters to apply or tables to manipulate. If the system can be tweaked with external documentations and ad-hoc instructions (now possible with the Retrieval Plugin), it will make Power BI way more powerful also for helping people discovering new data and information.

Giving the hype and the excitement for AI in the current months, I'm pretty sure that Microsoft will adapt Copilot's features in Power BI and make some magic. It's the right moment.
