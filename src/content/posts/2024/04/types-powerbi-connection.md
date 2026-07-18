---
title: "The 3 (+2) ways to Get Data in Power BI, simply explained"
date: 2024-04-01
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/power_bi_connections/pbi_connections_charts.png
draft: false
author: "Mutt0-ds"
tags:
  - power-bi
  - connection
  - fabric
  - dataset
  - semantic-model
  - directquery
---

There's quite a bit of confusion swirling around about how Power BI reports gather data. Where is the data actually stored? How frequently does it refresh? Depending on the mode you've selected, this question can be a bit tricky to tackle.

Let's simplify things a bit. In this article, I'll be focusing on Power BI Desktop. Imagine you've got a .pbix file on hand and don't quite have the time to sit through [10-minute technical video from Guy in a Cube](https://www.youtube.com/watch?v=-ip7mKUdwRg) that I usually link my users to.

First things first, open your file in Power BI Desktop and take a peek at the bottom-right corner.

<div style="max-width: 2303px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 69.4528%;"><iframe src="//iframely.net/ER7G3PL" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

1. If it's empty, you are in **Import Mode**
2. If it says "Live connected to _dataset name_" you are in **Live Connection** mode
3. If it says "Storage Mode: DirectQuery" you are in **DirectQuery** mode
4. If it says "Storage Mode: Mixed", you've got yourself a **Composite Model**

Let's say you are in a hurry and still can't spare a moment for tutorials. You just want to know where the data is and the absolute minimum to ensure you're not messing anything up. Say no more.

<div style="max-width: 2303px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 49.4528%;"><iframe src="//iframely.net/lwXu3yn" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## Import Mode

In Import Mode, all the data is in the .pbix file.
To be precise, it's stored in its _semantic model_, also known as the dataset, which acts as the memory of your report. Whenever you hit "Refresh," **all the data from the original data source gets copied** into the report. This typically results in a speedy query experience since the data needed for visualizations is readily available. Problem is when you have 20 million rows, refresh times take 30 minutes and the app crashes when you save it.

![Refresh button](https://nexacu.com.au/media/old-blog/2019-04-Power-BI-Data-Refresh-Button.png)

That's why I recommend Import Mode for getting started with local reports and you want to query your files (by experience, Excel). However, it doesn't scale well with larger datasets, and manual refreshes are necessary for obtaining the freshest data. It's suitable for small-scale projects but falls short when dealing with larger datasets.

## DirectQuery

[DirectQuery](https://learn.microsoft.com/it-it/power-bi/connect-data/desktop-use-directquery) is interesting.
The report's semantic model is just a connector to the original data source (in this case, a database), and every time you interact with your report sends a new query. This may take some seconds depending on the query complexity and the source's performances, but has the great advantage of returning live data.

I recommend DirectQuery if you really need live data and if your report isn't too complex, thereby avoiding significant delays and performance impacts on the original source. However, it doesn't scale well and comes with [notable limitations](https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-use-directquery#considerations-and-limitations).

## Live Connection Mode

Live Connection Mode might not be necessary for smaller-scale projects, but in my company, it's the standard practice, with hundreds of users accessing data simultaneously. The concept is straightforward yet ingenious: one report to serve them all.
Here's how it works: we import all the data into a report, then publish it in a shared Power BI workspace accessible to users. Daily (and hourly) ETL pipelines handle refreshing the "source" report automatically, overseen by data engineers.

With this setup, users can ["live connect"](https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-report-lifecycle-datasets) to the report and enjoy all the benefits of Import Mode—size, speed, and simplicity—without worrying about refreshing the semantic model, which resides elsewhere.

However, a significant drawback is the inability to modify the semantic model directly since it's located elsewhere. Thus, creating new tables and columns (excluding measures) in a live connected report isn't possible. All new changes must be made in the original report.

## Composite Model

The [Composite Model](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-composite-models) is when you mix together a Live Connection (which becomes a DirectQuery), and something else, either another DirectQuery or a local file in Import Mode.
I won't go too much into details here because it's a new feature, and still has big limitations in my opinion. I've mentioned its great potential in a past article, as it can be the Saint Graal for some people who aim to integrate an "official" report with their own local files, but mixing together connection can incredibly deteriorate the query performance, because the model will make several queries before joining the results with the rest of the data. Still, be very cautious with composite models and keep an eye for future updates.

The Composite Model blends a Live Connection (which essentially becomes a DirectQuery) with another DirectQuery or a local file in Import Mode. I won't delve too deeply into the specifics here because it's a relatively new feature with significant limitations, in my opinion. While I've highlighted its potential [in a previous article](https://mutt0-ds.github.io/posts/2023/03/what-power-bi-is-missing/), caution is warranted, as mixing connections can severely impact query performance. The model may execute several queries before joining the results with the rest of the data. Approach composite models with care and keep an eye out for future updates.

## Ah, and there is more!

For the sake of completeness, I have to mention a fifth way to read data in Power BI: **Direct Lake**. This approach combines the speed of Import mode with the live queries of DirectQuery by utilizing well-optimized tables in a Data Lake, offering the best of both worlds. However, it's only available in the Power BI Premium P-level and Microsoft Fabric, and it requires advanced data engineering to set up the Data Lake. If you're intrigued by this solution, you'll need to dive into the [Microsoft documentation](https://learn.microsoft.com/en-us/power-bi/enterprise/directlake-overview) and seek out more detailed resources than my post.

![Direct lake diagram](https://learn.microsoft.com/en-en/power-bi/enterprise/media/directlake-overview/directlake-diagram.png)

I hope you found this straightforward information helpful. Sometimes, with technical topics like Power BI, it's easy to get lost in complex jargon and intricate details.
