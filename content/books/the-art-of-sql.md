---
title: The Art of SQL
author: Stephane Faroult
image: https://m.media-amazon.com/images/I/91csCxKJvxL._AC_UF1000,1000_QL80_.jpg
badges:
- "💻 IT"
score: "⭐⭐"
finished: '2023-08-10'
summary: Performance depends, first and foremost, on a sound database design,and second, on a clear strategy and well-designed programs
showInHome: false
---

Book for advanced Python with many important concepts for writing queries, with an interesting military theme. I'll give it a chance. Not saying I'll finish it, but it seemed interesting. Next up will be Fundamentals of Data Engineering.

I'm pasting a dump from my work notes. Reading it there was tough; I lost track halfway through and stopped taking meticulous notes. The original idea was to turn this into a post. I didn't learn much, it was a heavy read, but the author is skilled and explains clearly. I am keeping a few takeaways that will be useful, especially for building efficient queries. Pushed through to the end.


## Notes

Performance depends, first and foremost, on a sound database design,and second, on a clear strategy and well-designed programs

## 1. Laying Plans

- Let's start by saying that Modeling is the projection of business requirements. Having a clear and structured model is the key to a reliable database, keeping in mind that it is still an approximation of reality and no size fits all. We just want to avoid unmanageable queries.
- Normalization is a logical process for data modeling, to be strictly followed when laying down the schema of a DB and minimizing inconsistency: 3 steps
1. Ensure Atomicity -> use IDs instead of descriptions/names to identify rows. You have to make sure that searching for, say, the customer, returns all the rows without worrying about misspelling or slow "like" statements
2. Check Dependence on the Whole Key -> keep columns to a limit: e.g. if the same car models share the same information about car details, move them to another table that can be joined through the car model key. Don't keep redundant data in the main table for performance reasons
3. Check Attribute Independence -> separate the independent attributes, for example country code details, which can be stored in another table connected through a non primary key to the row. This further minimizes data redundancy.
- Pay attention with nulls: a red flag is when the majority of the columns contain null values, and if two columns can't both be not null at the same time. Also, avoid using this kind of statement where color not in ('BLUE', 'BLACK', null) because the engine doesn't know what NULL is so there may be bugs (check with MSSQL though). In general, avoid nulls.
- Tuning is about getting the best possible performance now. When we develop, we must have a different mindset and not think "let's code it, and then have a specialist tune it later in production." Focus on not making a bad model, which is the main cause of poor performance.
- Having different sources can be a performance killer, in addition to making the system more complex and difficult to maintain. Try to insert some rows locally and then through a DB Link. Centralizing data should be a key priority. The nearer you are to your data, the faster you can get at it!

## 2. Waging War

The key topic of this chapter is that SQL is a declarative language, so keep it separate from the procedural nature of business specifications.

- When running long and complex processes, identifying when a query is used can be difficult. Leave comments in the code to explain where the code is used to help identify and track down issues. Make the statements identifiable.
- A database connection is fundamentally a heavy, high-resource operation. Don't do as in the example where for each line it was opening a connection. Try to insert data in chunks to maximize speed. However, this doesn't scale well for updates; better use one set-based statement to outperform them all.
- Stand back from your problem and possibly tackle the challenge with a fresh mind. Sometimes a different angle can dramatically fix a problem, such as a performance issue optimized with a UNION.
- Maximize each visit to the database by asking for all the columns you will need in one single statement, even if you are not using them all immediately. If you have to retrieve different values (e.g. max and min date) don't use two statements.
- Using the DB native kernel and functions provided by the DBMS is generally faster than building abstraction layers on top of it (e.g. PL/SQL is slower than a SQL function).
- Avoid counting rows if not necessary (classic select count(*) into counter from table_name where <certain_condition> if (counter > 0) then ...). It is more performant to use native tools like @@ROWCOUNT or SQL%ROWCOUNT or MERGE when inserting.
- There are several ways to achieve procedural logic in a DB application. Even if it is conceptually better to leave it at application level, leaving some logic in SQL can be faster. Loops don't exist in SQL as it works on sets, and if conditions are the WHERE clauses. For else-like cases you can use CASE.
- Successive updates to a single table are acceptable only if they affect different rows. Otherwise, combine the updates to use the full power of indexes and avoid unnecessary visits.
- Avoid lookup functions when you can use joins. Readability can decrease, but the optimizer can't examine the functions and performance is worse.

## 3. Tactical Dispositions

Chapter about indexes and how they can be used to optimize read operations

- Indexes are vital and will speed up read operations, but use them cautiously: they increase space and processing costs (sometimes more than the data itself), and will impact performance on update, insert, and delete operations.
- Also avoid triggers if not necessary. The performance decrease of one trigger is comparable to adding two indexes (Oracle).
- They are not a panacea. To justify the use of an index, it must provide benefit (including indexing foreign keys, that some systems do automatically but which can cause locks and redundancy). The most efficient index is a unique one, with one row = one index value.
- If you apply a function to an indexed column (formatting, truncating a date, anything) the query will work but you will lose the advantages of the index.
- System-generated incremental keys are an easy way to assign IDs, but can be a bottleneck in case of concurrent inserts, as there is one centralized generator assigning values to everyone. Reverse Keys or Hash Indexes were introduced to alleviate the load, but they have limitations.

## 4. Maneuvering

Examining complex queries and how they can be decomposed into smaller, simpler components.

- Behind the SQL query there is the optimizer. The optimizer examines the available indexes, the physical layout of data, how much memory is available, processors, and so on, and decides the strategy. Its task is to go from what to how.
- Do most of the work in the relational layer and leave the rest to the optimizer.
- There are five main factors to consider when dealing with SQL:
1. The size of the tables we are querying
2. The criteria required to define the result set (see Filtering)
3. The size of the result set
4. The number of tables to be processed (pay attention to views on top of tables, hiding complexity)
5. The number of concurrent users
- Filtering: prioritize WHERE clauses that cut out as much data as possible first, to optimize the query. The sooner we get rid of unnecessary data the less we have to process later.
- Pay attention to DISTINCT, which can hide overlooked joins and is difficult to debug if you are missing data. Only add it when you are sure you are gathering all the data. Use IN or EXISTS instead (test which is faster).
- Notable example of a subquery joining two correlated subqueries (and (os.ordid, os.statusdate) = (select ordid, max(statusdate) from orderstatus group by ordid)). If we used o.ordid the optimizer wouldn't have the freedom to choose whether to scan both tables, so ideally you should use identifiers from one table to give more independence (and, if correct, speed it up).
- Avoid indexes if the query returns a lot of data (there is no specific rule anymore, just keep this in mind).

## 5. Terrain

Just as a general may discuss tactics with the engineering corps, so the architect of an application can study with the database administrators how best to structure data at the physical level. Choosing your terrain (storage, table arrangement, etc.) can make the difference.

- Reads and writes don't live in harmony: readers want data clustered; concurrent writers want data scattered. A tradeoff may be required based on the circumstances.
- Clustering the primary key (which should never be updated) can be extremely effective in case of range selects, but other operations will suffer (most notably INSERTs). Use it by testing and knowing how the table will be queried.
- Different kinds of partitions:
1. Round Robin (just equally distributed in chunks) doesn't provide any particular benefit
2. Data Partitioning provides performance increases because there is logic related to the data (we often query data in the same month, for example, so it makes sense to partition by that) 
- Different kinds of Data Partitioning:
1. Hash: key-value mapping, very fast if partitioning by categorical data, useless for ranges, it doesn't consider the distribution of the values
2. Range: 

## Miscellaneous (lost track)

1. Use NOT EXISTS for looking for rows in one table where there is no matching data in another
2. DB links are obviously slow; do operations locally to avoid latency. No joins across them
3. Nested trees are messy and I don't see where I would use them
4. To get case-insensitive behavior, the easiest way is to store first and last names in uppercase and then apply upper() to the search and not vice versa, so you can use indexes
5. Watch out for LIKE with lpad and variable length, it can take a long time because the engine doesn't know when it has finished. Better to use upper and lower bounds
6. If you have dynamic inputs that could be null (e.g. a movie DB) you need dynamic queries. But watch for injection, use parameters
7. Don't trust unit tests. With or without an index it may seem the same because it's fast, but one does 5k queries per second and the other 25. Think about that too. In his example, a noticeable problem is something at 10000 requests per second anyway; it depends, but it's not my case right now
8. You can do little about locks, but limit large updates if you know there are reads at the same time, and of course optimize the updates (e.g. truncate instead of delete if clearing the table, roll back ASAP, limit loops, use stored procedures)
9. Because truncate bypasses so much of the work that delete performs, you should use caution. The use of truncate may impact your backups, and it may also have other side effects, such as the invalidation of some indexes. Any use of truncate should always be discussed with your DBAs
10. "Unconventional" designs such as attribute/attribute value columns are often used to simplify schema construction, but the queries are a mess. Don't use them unless you have a solid reason. Self joins are terribly slow
11. Pivot tables can be used for pivoting and performing advanced tricks such as multiplying values
12. Be warned: "creative SQL" is often a euphemism for ugly SQL. For example, adding values in the same column to avoid fixing the schema (as I have seen in Synapse)
13. Aggregating by range (bands) requires building an artificial sort key to display results in the desired order (like we do in Power BI, we need a new key)
14. When selecting a value such as the address from two places where it could be null, instead of using COALESCE which is dangerous (we may retrieve the address id from one side and the address country from another), I should use a CASE statement or a hidden sort key (UNION + LIMIT 1) to avoid confusion
15. End users often have a surprisingly high level of tolerance for poor performance; or perhaps it would be more appropriate to say that their perception of slowness differs widely from that of someone who has a better understanding of what happens behind the scenes.