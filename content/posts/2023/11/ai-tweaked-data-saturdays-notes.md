---
title: "My AI-tweaked Data Saturdays 23 Notes"
date: 2023-11-19
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/data_saturdays/cover.jpg
draft: false
author: "Mutt0-ds"
tags:
  - data-saturdays
  - t-sql
  - azure
  - database
  - sql-server
  - power-bi
---
Last Saturday I had the privilege of attending [Data Saturdays #37 at Parma](https://datasaturdays.com/2023-11-18-datasaturday0037/), an event series focused on Microsoft data platform technologies. Covering AI, Database, Business Intelligence, and Cloud, the event promised insights from top experts in Italy (and beyond).

Of course, I wrote down (almost) everything I heard.
This blog post is actually a dump of my notes, which I tried to partially automated with a mix of OCR + ChatGPT, which struggled in understanding most of the complex contexts... My disorganized note management didn't help, poor GPT.

So, my key points are slightly "tweaked" using AI and then carefully checked and simplified by me. I hope they serve as a useful resource for those interested in the topics discussed at the event. Kudos to everyone involved in making this event a success (organizers, speakers, sponsors), and I look forward to future editions that continue to push the boundaries of knowledge-sharing in the data and technology domain.

Special thanks to Ema for the support.

## ☁ SQL Server PaaS by Gianluca Hotz

<div style="max-width: 1834px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 137.6963%;"><iframe src="//iframely.net/WeqRYGZ" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

#### Three Solutions

- SQL Server On-Premises: Classic solution.
- IaaS (Infrastructure as a Service): Utilizes a purchased VM for MSSQL. Eliminates the need for VM maintenance.
- PaaS (Platform as a Service): Azure offers three PaaS options for SQL Server. RDS (Relational Data Service) available for MySQL, PostgreSQL, MariaDB.

#### Three PaaS Database Running Options in Azure

- DB Single: Requires manual management of the instance, including network and security.
- [Elastic Pool](https://learn.microsoft.com/it-it/azure/azure-sql/database/elastic-pool-overview?view=azuresql): A shared resource pool for multiple databases. Scales dynamically with an auto-scale feature.
- [Managed Instance](https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview?view=azuresql): Entire SQL Server instance with PaaS advantages.

#### Purchase Models, Tiers, Options

1. DTU (Database Transaction Unit):
Estimates operations using a combination of CPU and storage.
Simple and linear, though may be phased out in the future.
Tiers include Free, Standard, Premium.
2. vCores:
Renting computing power.
Tiers include General Purpose, Business Critical, [Hyperscale](https://learn.microsoft.com/it-it/azure/azure-sql/database/service-tier-hyperscale?view=azuresql) (more on it later).

You can also choose between

- Provisioned: Adheres to a traditional model with a fixed set of resources.
- Serverless: Payment based on the minimum core and actual usage. Allows for automation, e.g., turning off during inactive periods.

#### Hyperscale

Utilizes a cluster-based model with modularized SQL, resembling AWS [Aurora](https://aws.amazon.com/it/rds/aurora/). Complexity in design but offers benefits like distribution and quorum-based operations. However, this is a new solution.

#### SQL Managed Instance Details

- Entire SQL Server instance with PaaS advantages.
- Azure manages hardware and all what's under the hood.
- Convenient, duplicated, and region-secured backups. This is already a game changer.
- High availability through ready clones, with consideration for potential connection disruption during a switch.

#### The AWS offer

- Different offerings from Azure, but fundamental features are similar.
- Azure holds exclusivity on SQL Server; AWS updates may have a delayed rollout.

#### Fleet Manager - New Azure Feature

- Thumb's rule: one DB per tenant.
- Fleet Manager assists in scaling numerous databases (in the order of thousands).
- Databases can be categorized into tiers for balanced priority and power.
- Kind of a pool of pools

## 📐 T-SQL performance tips & tricks by Sergio Govoni

<div style="max-width: 1757px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 133.8797%;"><iframe src="//iframely.net/xlNErkd" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

#### 1. [Sargable Predicates](https://www.sqlshack.com/how-to-use-sargable-expressions-in-t-sql-queries-performance-advantages-and-examples/)

- Learn to read [Execution Plans](https://www.sqlshack.com/execution-plans-in-sql-server/); Index Seek good, Index Scan worse.
- SARG (Search ARGument) - Always aim to use an index to optimize query performance.
- Identify indexed columns and avoid operations on the predicates that hinder index usage. Example: If there's an index on the date column, refrain from using functions like WHERE YEAR(date) = 2023 to prevent losing the index. This also works for ORDER BY not only where
- Pay attention to handling nulls correctly (example to check: stored procedure ignoring NULLs in where, fixed with EXISTS + INTERSECT). NULL is a placeholder for something that may arrive, not a value!

#### 2. Query Mode Execution

- Again: carefully analyze the Execution Plan.
- Prioritize BATCH over ROW mode (Estimated Execution Mode); reason by cluster of column value rather than each row.
- Utilize a nonclustered columnstore index (empty) for faster queries. Check if the Execution Mode updated accordingly!
- In Azure SQL and from SQL Server 2019, the engine employs batch mode where possible without creating the column index.Better because for transactional databases, it's better to avoid indexes. Check compatibility levels and enable the feature accordingly.
- There also POC Indexes for PARTITION BY queries

#### 3. Join Order

- The [Query Optimizer](https://learn.microsoft.com/it-it/troubleshoot/sql/database-engine/performance/troubleshoot-optimizer-timeout-performance) (very complex) aims for the easiest path to make joins but might be incorrect.
- Pay attention to join order; joins are evaluated based on the ON statement, if you want to join something inner first and then a left outer later, the ON of the left outer should be AFTER the first. Use parentheses for readability.

#### 4. Tempdb

- Tempdb is the public toilet of SQL Server, receiving a lot of activity. Serves as a shared space for temporary data.
- Place Tempdb on a fast machine due to high traffic.
- Create an index with a name to cache Tempdb and avoid creating new indexes for each query if they have anonymous indexes.

## 🧯 SQL Server On Fire by Gabriele Franco

<div style="max-width: 1814px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 133.8624%;"><iframe src="//iframely.net/yBY9cdc" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

#### Tools Used

[Query Store](https://learn.microsoft.com/it-it/sql/relational-databases/performance/monitoring-performance-by-using-the-query-store?view=sql-server-ver16) - The black box of SQL Server, storing query stats and history. (note: read about Hint Query Store)
[Extended Events (XE)](https://learn.microsoft.com/en-us/sql/relational-databases/extended-events/quick-start-extended-events-in-sql-server?view=sql-server-ver16) - Monitors 3000 types of events for detailed insights.

#### Scenario: SQL Server at 100% CPU

- Ran a stress test on the database to induce slowdown.
- Analyzed Query Store to identify queries causing high resource consumption.
- Utilized the estimated plan and adjusted the execution plan with an index to resolve the issue.
- Demonstrated the comparison of queries within the Query Store tool.

#### Scenario: Memory Pressure Test

- Executed a test under memory pressure with a poorly optimized table.
- The query estimated 62 GB of memory, causing a bottleneck in the database.
- Root cause: Inefficient use of the nvarchar(4000) type, leading to overestimated data size for millions of rows.
- Remember the importance of defining the right data types!
- Fun fact: SELECT TOP 100 is memory-optimized; TOP 101 is not.

#### Checking Active Sessions

- Used sys.sp_whoisactive to identify resource-consuming sessions.
- Addressed the issue of [RESOURCE_SEMAPHORE](https://www.sqlskills.com/help/waits/resource_semaphore/), indicating exhausted resources.
- Explored [sys.query_store_plan](https://learn.microsoft.com/it-it/sql/relational-databases/system-catalog-views/sys-query-store-plan-transact-sql?view=sql-server-ver16) for detailed information on query stats and resources.

#### Using Extended Events (XE)

- Referenced the [dm_xe_sessions](https://learn.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/-sys-dm-xe-sessions-transact-sql) table to observe and analyze extended events sessions.
- Demonstrated downloading in XDL format for deadlocks (note: see more about that)

## 🔓 Unlocking the Power of AI-Driven Analytics: Mastering Generative AI in Power BI by Leon Gordon

<div style="max-width: 1834px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 134.5549%;"><iframe src="//iframely.net/tsk3cev" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

#### The scenario

- Deploying AI solutions to Production (PRD) is a challenging endeavor.
- High failure rates are observed in many AI projects.
- Case Study: PepsiCo's AI Application for Cheetos Quality Check: AI used to identify irregularities in Cheetos for quality assurance

#### AI Facts

- AI is a permanent and essential part of technology landscapes.
- Effectively leveraging AI is crucial for project success.
- Governance and security play a significant role in AI deployment.

#### Demo 1: ChatGPT Data Investigator with Marvel Movies Dataset

- ChatGPT plugin showcased for uploading dirty data and cleaning up and transforming them into a schema suitable for Power BI. Basic visualization available.
- Despite being a demo tool, it could be seen as a foundational step for future developments.

#### Demo 2: Data Flow with HTTP Call to OpenAI

- Tested a data flow with an HTTP call to OpenAI for applying a column description using ChatGPT.
- There are potential cost implications in a Production environment but it's interesting to leverage HTTP calls using M PowerQuery language.

## ✖ Power BI "X Files" - 5 things they "forgot" to tell you! by Nikola Ilic

- Very technical session for Power BI advanced users, a real showcase of hidden gems for optimizing queries and calculation

#### DAX Fusion

- Horizontal Fusion: Combines calculations with different filters for improved performance. Enabled after September 2022.
- Vertical Fusion:Classic fusion using filter context (measures).
- No action needed; enabled in newer versions for query optimization. I should read the [SQL explanation post](https://www.sqlbi.com/articles/introducing-horizontal-fusion-in-dax/).

#### Cache Me If You Can

- Power BI caches results to enhance performance. E.g. double-clicking the same slicer item results in a single query.
- Use [Performance Analyzer](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer) to copy the query and check results in [DAX Studio](https://daxstudio.org/).
- Avoid Beginner Mistake: For accurate testing, clean the cache before each new run.
- Note: Cache may not be utilized for large queries.

#### The Dark Art of Table Processing

- Leveraging columnar nature of [VertiPaq](https://www.sqlbi.com/tools/vertipaq-analyzer/) (the database under the hood) for optimized refresh can be very important.
- Refer to Phil Seamark's [blog post](https://dax.tips/2021/02/15/visualise-your-power-bi-refresh/) for insights into the refresh strategy.

#### Fold on Tight

- Query Folding: the ability to move computation in SQL query from M
- Beware: Appending, merging queries, or transforming data types may bypass folding, slowing down queries.
- Check native view query in Power Query; if absent, it's not folding. This is bad.

#### MDX Optimization

- Usually, [avoid turning off ISAVAILABLEMDX](https://data-mozart.com/hidden-little-gem-that-can-save-your-power-bi-life/) in [Tabular Editor 2](https://www.sqlbi.com/tools/tabular-editor/) or Excel users won't access the value.
- However, for unimportant columns, turning it off significantly reduces size.

## 👀 What to look out for when migrating your data to the cloud; is it REALLY the right choice? by Emanuele Meazzo

I didn't take notes here as I work with Ema and he will share with me the entire presentation, which was rich in interesting points about the question one should me when choosing to migrate to the Cloud. It's not that simple.

⭐ Will update with the whole presentation. Amazing performance that made me leave the room with more questions than answer.

## 🕘 Save The Date by Rudi Bruchez

<div style="max-width: 1853px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 134.715%;"><iframe src="//iframely.net/M6dlvZg" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

This session explores the nuances of different date and time types in SQL Server, highlighting the strengths and challenges of each and emphasizing best practices for handling date-related operations.
Suggested article: [The Ultimate Guide to Datetime datatypes](https://karaszi.com/the-ultimate-guide-to-the-datetime-datatypes)

#### Four Main Types:

- DATETIME
- DATE
- DATETIME2
- Smalldatetime (less commonly used)

#### Datetime is a mess

- Starts at 1753 because it's essentially an int.
- Rounds milliseconds in a peculiar way, leading to rounding discrepancies.
- No time zone information (UTC can be used).
- ISO 8601 attempts to standardize datetime but can be messy due to updates over the years.
- Language-sensitive, with the format dependent on the language set in SQL Management Studio.

#### Formatting

- CONVERT with numeric IDs to choose the desired format.
- CAST automatically converts to the user language format (faster).
- FORMAT (a .NET function) is external and slower.

#### Date: better, but not perfect

- Starts from year 1 but still has rounding errors.
- Various interesting manipulations with types and casting can be performed.

#### Removing Time

Challenge: [non-existing dates in the past](https://stackoverflow.com/questions/3310569/what-is-the-significance-of-1-1-1753-in-sql-server) before the adoption of the modern calendar; triggers can be used to address this and prevent inserts on those days.

#### Datetime2

- Ideal solution; should be used more.
- Ranges from 1 to 9999, follows the Gregorian calendar.
- Precision can be chosen, and there are no tricks with casting ints.
