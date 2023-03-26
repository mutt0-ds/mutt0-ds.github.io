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
During this months I had the chance to take a look at Power BI at enterprise level, with hundreds of users and reports and advanced needs and requests. I must admit that I'm impressed by all the features that the team has rolled out in this period, which have greatly improved. However, I decided to share my thoughts about some features that are currently lacking or require advanced knowledge of third party tool, which I hope one day Microsoft will decide to keep in consideration. 
While writing this article I acknowledged that these missing or underdeveloped features are mostly impacting specific needs or edge cases, so I would say that, overall, really grateful and appreciative of the current state of the tool, which does its standard job. However, being vocal about our niche's requests and needs may help Microsoft while setting their priorities and furtherly facilitating their process

I have added a "Hope level" counter to each of this feature, where I guess how likely it could be that this feature will be implemented in the near future. At the time of writing (March 2023)

## 🔢 Basic Version Control
> Hope level: 7/10
That’s an old story: .pbix files are binary, so they can’t be easily tracked and compared with git or other version tools. A lack of tools for version control from the company that owns Github and just dropped a tool that explains PR requests with GPT-4 is particularly hironic... It’s starting to became annoying month after month, when the models are bicoming bigger and there are no easy way to compare the different versions. I put a patch on the matter in [another blog post](https://mutt0-ds.github.io/posts/2022/11/turbulent-journey-power-bi-source-control/), where an over-engineered Azure Pipeline downloads a third-party tool (Tabular Editor 2) every time, uses it for extracting JSON metadata that will be then committed together and used for keeping track of part of the model (only tables, columms and relationships but no charts or visuals). Git compatibility was announced a few weeks ago, then canceled, but I am hopeful that it will come soon.

## Enhanced User Input
> Hope level: 4/10

An edge cases which is way more common than I was expecting, especially in case of forecasts. Users need to insert one or more inputs (e.g. a Growth Coefficient) to see live results in Power BI, but at the moment this is rather difficult to apply, either with over-engineered Power App solutions or with a combination of Tables, Slicers and DAX code. 
I wish there was a plugin or a chart with "User Input" with an input area where the user can write some values that will populate the live data, but I see how complicate it can be at structural level, and this still remains an edge case. Also, Power BI is a data visualization tool so this is not really what we are expecting from it.

Microsoft has partially AGGIRARE L'OSTACOLO with the Analyze in Excel feature: for anything involving user input and data manipulation, it is now easier to just connect the dataset to Excel and create ad-hoc formulas from there. So, one day we may fix this need, but right now Excel looks the easiest solution, despite its limitations.


## Developer tools
> Hope level: 6/10
Compared to other Microsoft's products, like Typescript or Playwright, Power BI is lacking some basic developer-friendly tools, mostly because BI developers that require them are just a fraction of the total users. However, I feel the lack of this feature, especially when things get messy with DAX (Power BI script language, inspired by Excel's fomula one).

I don't like DAX, sometimes I want to strangle them, and Microsoft doesn't really give me anything for improving my experience when writing queries that are more than 2 lines long. Poor DAX doesn't even hage a logo or a Syntax Highlighting plugin!
Luckily I rarely have to create long DAX queries in Power BI, the majority of calculations logics are in the Data Warehouse, but sometimes there are edge cases that require ad-hoc DAX measures, rarely of multiple lines.

Creating them in the Power BI tab is suitable only if you like to risk your sanity in infinite debugging, the simplest solution is another Third-party tools, DAX Studio, which enables Syntax Highlighting, Formatting, Linting, quick access to Documentation and rather simple debugging (with EVALUATE). I have nothing against DAX Studio, a wonderful free tool, but considering that Microsoft owns VS Code, I am waiting for some DAX-compatible extensions to better integrate my workflow.  


## Intermediate-level Documentation
> Hope level: 2/10
This is a struggle I’m having with Microsoft in general, as its documentation spectacularly manage to make complex even simple concepts. 
In my opinon, Microsoft docs are great when someone is an advanced user which can understand all the technical jargon that is took for granted, but for a beginner or even an intermediate user, this is overwhelming.
For beginners, I recommend [dax.guide](https://dax.guide) from the SQLBI team (just compare their [COUNT](https://dax.guide/count/) example with the [one on Microsoft.com](https://learn.microsoft.com/en-gb/dax/count-function-dax): examples, working code, clear explanations of the cases, links to other concepts) for understanding what each function does and how it works.

For the majority of intermediate doubts (row/filter context, data connectors, small DAX formulas and so on), it's still quicker to look at the Power BI forums or to YouTube videos, for example from [Guy In A Cube](https://www.youtube.com/c/GuyinaCube).

[Learn.microsoft.com](https://learn.microsoft.com) remains my last hope, even if I consider myself an advanced user, and I wish that Microsoft will simplify the website for less-technical users. Luckily enough, this has lower priority as the web is full of useful and informative third-party sources.

## Composite model
> Hope level: 8/10
Another experimental feature from Power BI that is giving me a bit of headaches lately.
Don't get me wrong, the Composite Model is as **game changer** as it makes possible to create a central Power BI dataset with all the data and security rules enabled, and then users can use it as a source and merge it with their owns (usually Excel files).
This is very cool as it replaces and simplify many manual processes, but it's still an experimental feature which requires a bit of a tricky and badly documented steps for working on the Power BI Service, while on Desktop is pretty straightforward:

- Viewers need Build Permissions to all the underlying datasets (which could be a security issue)
- Apparently, RLS impersionation gets screwed, as I tried to impersonate users and I was able to look at all the data (but in reality they can't)
- If the original dataset has a gateway, we have to set it up credentials on all the Composite Model dataset and map everything on the gateway
- User can't add calculated columns or tables to the tables from the original Dataset, which blòocks many custom logic requirements

In the future, I would love to just keep a central dataset where users are free to connect and create their own reports without assistance, but even if the Composite Model is a great starting point, it still requires some tweks to achieve 100% smooth usability.

## AI-enhanced capabilities
> Hope level: 9/10
I wrote this final line just for tagging the post with #chatgpt and #agi to boost views.
Joking, I am sincerely curious to see how Microsoft will implement Open AI's tool in Power BI, as the current option are a bit limited in terms of UX experience.
I wouldn't be surprised to see a ChatGPT-like prompt where the user can type the questions and receive chart's screenshots, help with the filters to apply or tables to download in Excel. If the system can be tweaked with external documentations and ad-hoc instructions, it will make Power BI way more powerful also for helping people discovering new data and information.
Giving the hype and the excitement for AI in the current months, I'm pretty sure that Microsoft will adapt Copilot's features in Power BI, probably upgrading the current Q&A feature (which is not as intelligent as one would expect).
