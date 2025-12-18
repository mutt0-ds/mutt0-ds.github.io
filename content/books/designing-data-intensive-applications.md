---
title: Designing data-intensive applications
author: Martin Kleppmann
image: https://dataintensive.net/images/book-cover.png
badges:
- "📊 IT"
score: "⭐️⭐️"
finished: '2021-04-11'
summary: Databases have many potential problems to explore, understand, and anticipate. Especially distributed ones
showInHome: false
---

A bit too complex for my taste; it took me a long time to read and I often got lost. It is long and technical, but it still turned out to be a valuable source of information on databases and their issues. Here is a summary of the contents, which is fairly long.

I read it too early in my data engineering journey. I will read it again and update my score!

Helpful notes: https://newsletter.techworld-with-milan.com/p/what-i-learned-from-the-book-designing

## Database Structures

- It starts by exploring various models, from document-based to tree-based to relational, and on to NoSQL
- Storage: to retrieve query results quickly you use indexes and hash maps, plus structures like B-Tree, LSM tree, or SSTable
- Difference between OLAP and OLTP: OLAP is for analysts, with few writes and huge reads, while OLTP is transactional with many writes. A data warehouse is usually a secondary DB for analysts' queries
- Encoding: several formats are covered, such as JSON and XML (which have ambiguities with some numbers and limitations, but are simple). Thrift and Protocol Buffers are more advanced
## Replication, partitioning & co: techniques for databases

- Replication: duplicate data to avoid loss; there are 3 main approaches.
- Leader-based: there is a leader node that then propagates to followers (synchronously, meaning waiting for everything to be OK, which is rare, or asynchronously). If it fails, a new one is elected. Many issues arise, like lag, node failures, nodes getting out of sync, consensus, etc.
- Multi-leader replication: for example, across different geographic areas you can have multiple leaders for logistical reasons. This creates problems because they are almost independent, so various conflicts can arise
- Leaderless replication: write to multiple nodes and read from multiple nodes as long as a quorum is available. It runs continuous checks to keep nodes consistent
- Partitioning/Sharding: a way of splitting data to handle many nodes and scale. If load grows, add partitions. The hard part is continually managing partitions, mapping key-value to partitions or other indexes to speed up operations
- Transactions: ACID (and how Atomicity, Consistency, Isolation, and Durability can be very vague). It explains how to guarantee them, and it is often complicated; sometimes it is not worth it or not feasible
- Distributed systems (cloud computing): much more prone to issues. For example, clocks must be synchronized, the network must be stable, data can be corrupted, consensus is needed for consistency, with messages you often assume linearization by adding temporal order, and much more
## Batch & Stream processing

- Batch is periodic, stream is continuous. Simple.
- Covers MapReduce and how it speeds up and manages batch jobs by splitting work into small pieces across multiple machines.
- Stream processing is more complex because there must be a continuous flow. It talks about Kafka and its challenges, such as retaining a history of data
## The future

- A short, interesting finale on future challenges: auto-auditing, data integration across different DB systems, and ethics and privacy for data