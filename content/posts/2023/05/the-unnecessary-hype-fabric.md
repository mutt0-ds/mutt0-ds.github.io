---
title: "The unnecessary hype strategy behind Microosft Fabric"
date: 2023-05-29
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/fabric/fabric_title.jpg
draft: false
author: "Mutt0-ds"
tags:
  - microsoft
  - build
  - fabric
  - azure-synapse
  - power-bi
  - copilot
---
If you are into Data Engineering in Microsoft Azure Cloud Environment, you probaly heard about **Microsoft Fabric** being announced last week at the yearly event [Microsoft Build](https://news.microsoft.com/build-2023/). My two cents: it’s a very big deal for us engineers, working with data every day.

In short, Microsoft introduced a huge, unified data platform that merges lots of tools together, starting from a common Data Lake where data can stored ([**OneLake**](https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview)), and a suite of new tools that are integrated in the “fabric” of Fabric. Some of them are evolutions of existing systems, like **Synapse Data Engineering** (Azure Synapse) or **Data Factory** ([Azure Data Factory](https://azure.microsoft.com/en-us/products/data-factory)) for ETL and Data Processing. Others, like my beloved [**Power BI**](https://powerbi.microsoft.com/en-us/), have kept the same features but they will be integrated in the platform in the future. Others, like [**Data Activator**](https://blog.fabric.microsoft.com/en-us/blog/driving-actions-from-your-data-with-data-activator/)(no-code triggers), are brand new.

{{< youtube X_c7gLfJz_Q >}}

![fabric](https://cdn.thenewstack.io/media/2023/05/6f6c803f-microsoft-fabric-scaled-e1684822392207.jpg)

Let me be clear: the idea of unifying all these data-related services in charge of processing, storing and using data is a game changer, if Fabric will respect the promises. In my job, handling data in the correct way is the crucial part, and I’m already using Synapse, Data Factory, Data Lake, Data Warehouse and Power BI as separate Azure Services so I doubt that much in my workflow will change: everything will be more interconnected and, hopefully, more productive, with support for the new AI technologies and unlocked integrations.

![changes](https://res.cloudinary.com/endjin/image/upload/f_auto/q_80/assets/images/blog/2023/05/microsoft-fabric-scope-and-artefacts.gif)

What I didn’t like is **Microsoft hype-oriented strategy**. There was total secret about Fabric, and then in a couple of days it’s everywhere, still in Beta, with so much new infrormation that everyone out there still has to proceed what’s going to change and what’s exactly we will have to adapt. New spending plans, beta features, articles describing the “magic unlocked” by these tools, an explosion of [contents](https://www.youtube.com/watch?v=6QusOchmSXQ) and [curiosity](https://www.youtube.com/watch?v=tu2M_K3pb0E) has been suddenly evoked.

![tweet](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/static/images/fabric/tweet_fabric.jpg)

While I understand the rushed period the Big Tech are encountering, with [the AI Race](https://time.com/6255952/ai-impact-chatgpt-microsoft-google/) dominating the minds of business users (and investors), in this case the update is on a technical side.

Let’s take the other “bomb”, the protagonist of Microsoft Build 2023. I'm talking about [**365 Copilot**](https://www.microsoft.com/en-us/microsoft-365/blog/2023/03/16/introducing-microsoft-365-copilot-a-whole-new-way-to-work/), a sort of ChatGPT assistant that can be integrated with Office Tools for generating presentations, Word documents and analysis, has been anticipated several months before, with lots of buzz from the press. There is mistery about how it will work at the end, but Microsoft is sharing as many updates as possible about the tool. With 365 Copilot and [Azure AI Studio](https://www.youtube.com/watch?v=DaIYrlMOj7I) alone, which makes possible to build our own GPT models with in-house data, Microsoft would have already win everything for this year. The AI Race, at the moment of writing, is on its hands.

![trend](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/static/images/fabric/google_trends_fabric.png)

That’s why I don’t like this choice of dropping another huge announcement with no anticipation. Was it only for the joy of scaring the competitors? Microsoft Fabric, all cool and shiny, _the joy of every Data Engineer and Data Analyst_, still leaves my biggest question remains unanswered.

> How will Fabric coexist with the existing suite (Synapse, Data Lake, Power BI)?
> For how much they will be supported and updated? How the migration will work, eventually?

[Microsoft Docs](https://learn.microsoft.com/en-us/fabric/) only says ‘_Migration paths will soon be made available to help transition teams that are ready to switch services_’, but this is dangerous territory for rushed decisions. And I’m not even worrying about vendor lock-in (yet).

I think that Microsoft is killing it this year, and the AI announcements were already enough for the press and the business users. Such a relevant change in the Data Platform is extremely welcomed, but I would have preferred a slowly rolled introduction, to leave us the time to digest the news and get ready to test the new features. Now I’m left with 7 services I want to try, almost zero documentation available yet, and the worry that the existing tools will be impacted by the update in the short term.
> I feel confused.

I admit that it’s fun and nice to read about all the shiny updates incoming, but rushed announcements and hype don’t sound well for data processing platforms, where security, performance and reliability are what matters.
While cautious, I'm hopeful and curious for the exciting future of the Microsoft Azure platform, which will furtherly enhance the amazing results we are capable to achieve with our data.
