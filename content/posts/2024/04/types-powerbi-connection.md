---
title: "The 3 (+1) ways to Get Data in Power BI, simply explained"
date: 2024-04-02
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/power_bi_connections\pbi_connections_charts.jpg
draft: false
author: "Mutt0-ds"
tags:
  - power-bi
  - connection
  - fabric
  - dataset
  - semantic-model
---

I see a lot of confusion regarding how a Power BI reports gets data. Where is actually the data? How often is refreshed? Depending on which mode you have chosen, this question will be tricky to answer.
Let's keep things simple, I will be focusing on Power BI Desktop in this article: let's say that you got a .pbix file and don't have time to watch the [10-minute technical video from Guy in a Cube](https://www.youtube.com/watch?v=-ip7mKUdwRg) I usually link my users to.

Open your file in Power BI Desktop and check the bottom-right corner.

![power_bi_desktop]

1. If it's empty, you are in **Import Mode**
2. If it says "Live connected to _dataset name_" you are in **Live Connection** mode
3. If it says "Storage Mode: DirectQuery" you are in **DirectQuery** mode
4. If it says "Storage Mode: Mixed", you have a **Composite Model**

Let's say you are in a hurry and still don't have time to watch tutorials, you want to know where is the data and the bare minimum to know if you are screwing up something. Say no more.

![pbi_connections_chart]

## Import Mode

All the data is in the .pbix file.
To be precise, it is stored in its "semantic model", also called dataset, the memory of your report. Every time you click "Refresh", all the data in the original data source are copied again in the report. This results in a very fast query experience, if you create a visual, the data used is already there. Problem is when you have 20 million rows, refresh times take 30 minutes and the app crashes when you save it.

![https://nexacu.com.au/media/old-blog/2019-04-Power-BI-Data-Refresh-Button.png]

That's why I recommend Import Mode if you are getting started with a local report and you want to query your files (by experiences, Excels). This solution doesn't scale well with bigger data sizes, and has the limit that you need to manually refresh the report and wait for the results if you are looking for the fresher results. Good for small-scale projects, not for larger scale.

## DirectQuery

DirectQuery sounds very promising. The report's semantic model is just a connector to the original data source (in this case, a database), and every time you interact with your report sends a new query. This may take some seconds depending on the query complexity and the source's performances, but has the great advantage of returning live data.

I recommend DirectQuery if you need live data, or your report is simple enough that there won't be big delays and performance impact in the original source. It doesn't scale well and has some notable limitations.

## Live Connection Mode

If you are not working at large scale, you won't probably need this solution, but in my company this is the de-facto standard, with hundreds of users reading data at the same time. The concept is simple, and genial: one report to serve them all.
Let's import all the data in a report.
Then, we publish the report in a shared Power BI workspace, available to users. Daily (and hourly) ETL pipelines are in charge of refreshing the "source" report without the need of manual effort, supervised by data engineers.

If this source is available, one can "live connect" to it in the report and gain all the benefits of Import Mode (size, speed, simplicity), without having to worry about the semantic model's refreshes, which is somewhere else.

The big drawback is that you can't change the semantic model since it's not there, thus the creation of new tables and columns (but not measures) in a live connected report is unavailable. All the new changes must be done on the original report.

## Composite Model

The Composite Model is when you mix together a Live Connection (which becomes a DirectQuery), and something else, either another DirectQuery or a local file in Import Mode.
I won't go too much into details here because it's a new feature, and still has big limitations in my opinion. I've mentioned its great potential in a past article, as it can be the Saint Graal for some people who aim to integrate an "official" report with their own local files, but mixing together connection can incredibly deteriorate the query performance, because the model will make several queries before joining the results with the rest of the data. Still, be very cautious with composite models and keep an eye for future updates.
