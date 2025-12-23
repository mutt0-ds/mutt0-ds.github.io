---
title: Fundamentals of Data Engineering
author: Joe Reis, Matt Housley
image: https://m.media-amazon.com/images/I/81+oMD7Lm7L.jpg
badges:
- "💻 IT"
- "💼 Work"
score: "⭐⭐⭐"
finished: '2023-10-11'
summary: Work with data across all its phases and determine both the best solution for your case and the stakeholders involved
showInHome: false
---

A more abstract book that analyzes how to build an architecture and the fundamentals of data engineering. It seems very interesting, recommended on LearnSQL. The focus is the data lifecycle, explored in all its phases with attention, with significant emphasis on stakeholders and approaches.

A comprehensive book, a bit too slow for me given my experience, but it provides an excellent overview of systems, especially newer ones like data lakes, mesh, and warehouses. A good read, more of a refresher for me.

# Notes

- Today, data is moving faster than ever and growing ever larger, but big data processing has become so accessible that it no longer merits a separate term; every company aims to solve its data problems, regardless of actual data size. Big data engineers are now simply data engineers (rise and fall of the big data buzzword)
- Foundation first before tackling AI and research
- Data maturity helps us leverage our data: without a solid baseline we can't use it, and it depends on many factors. Our simplified model has three stages: starting with data, scaling with data, and leading with data
- Starting with data: advice
  - Organizational willpower may wane if many visible successes don't occur with data. Getting quick wins will establish the importance of data within the organization. Keep in mind that quick wins will likely create technical debt
  - Get out and talk with people, be open-minded
  - At the same time don't build custom solutions unless you have a clear competitive advantage. Technical debt is to be avoided
- Scaling with data: advice
  - We have a stable platform; now we can build flows
  - DevOps and ML flow
  - Avoid overcomplicated solutions
- Leading with data, a mature platform
  - Create community and data culture
  - Automate import flows and new projects
  - Data governance, lineage
- 🔬 Tech Stack: SQL, Python, a JVM language for low-level work (Scala, Java), Bash or PowerShell
- Type A (abstraction: use off-the-shelf tools and make things simple) and Type B (create architecture to focus on a core competency of the company), and an introduction to all the roles (C-suite, data workers)

## The Data Phases

- Remember the different data phases: generation, storage, ingestion, transformation, serving
- ⭐ Generation phase: always ask these questions when assessing source systems: its essential characteristics, how the data is persisted (long run or deleted?), at what rate it is generated, if it is consistent or we need to check for errors, how often the errors occur, if there are duplicates or delays, its schema, if schema changes are communicated, how frequent the data reading process is, whether there are upstream data dependencies, and whether there are checks for late or missing data
- Storage: very delicate point, as the storage solution will impact our future strategy. We usually leverage several storage solutions, since each kind of DB works best in a specific environment. Questions to ask when choosing: is it compatible with our speed rates, could it be a bottleneck, do we understand how the tech works, will it anticipate future scale, will the vendor guarantee the SLA, do we capture metadata, is it pure (object storage) or does it support query patterns (cloud DWH), is it schemaless/hybrid/enforced, how are we tracking records and schemas and governance. Also remember the difference between hot and cold data (for compliance but not accessed)
- Ingestion: this is usually the bottleneck of the data architecture, while source systems, the biggest culprit, are not under our control or responsibility. Focus on making a reliable system by asking these questions: the use cases, what systems generate the data and when they are available, what the data destination is, how frequently we need to access the data and in which volume, what their format is, whether it is in good shape or we need to modify it. Plus differences between batch and streaming ingestion; usually batch is more efficient and simpler (and far more used unless you have a critical need for live data)
- Transformation: the stage where you transform the data before the next parts of the process. This is mostly related to changing types, removing errors, schema changes, and normalization. Consider costs and keep transformations as simple as possible
- Serving: you can use the data in different ways. Analytics, ML, and reverse ETL are the most popular. With analytics we talk about BI (which often requires further cleaning, and ideally a self-service approach), or operational/embedded analytics (for example, inventory live or customer dashboards). ML is straightforward here. Reverse ETL is the process of putting data back into source systems, long considered an antipattern, but often a necessity (for example, marketing using sales data and uploading forecasts back into the system)
- Security: the principle of least privilege is crucial, and also giving access only for the duration necessary to perform the work
- Definition:
Enterprise architecture is the design of systems to support change in the enterprise, achieved by flexible and reversible decisions reached through careful evaluation of trade-offs.
- Pillars of a good data architecture:
  1. Choose common components wisely.
  2. Plan for failure.
  3. Architect for scalability.
  4. Architecture is leadership.
  5. Always be architecting.
  6. Build loosely coupled systems. → See Bezos API Mandate where every team must communicate by API only
  7. Make reversible decisions → Bezos two-way door
  8. Prioritize security → Zero trust security etc.
  9. Embrace FinOps → DevOps with Finance involved
- Brownfield (replace legacy systems) vs Greenfield: in both cases be cautious and assess a strategy that slowly brings in the new feature, cleaning up progressively
- Data Mart (DWH for analytics, further step) vs Data Warehouse vs Data Lake
- Also mentions the data lakehouse as a likely future direction
- Talking about the modern stack: key concepts are self-service, agile data management, and clear pricing/open source
- Story: the Lambda (batch and stream to be joined together) and Kappa (one giant stream, expensive at scale) architectures were introduced for managing large real-time streaming data. The current solution is Dataflow, viewing all data as events and aggregating them in big batches. Spark and Flink are examples. There are other specifications, for example IoT aggregators for grouping signals from IoT devices
- Data Mesh: a new idea for addressing the divide between operational and analytical data by introducing one federated layer

## Choosing Technologies

- We strongly advise against choosing technology before getting your architecture right. Architecture first, technology second. Do not chase shiny objects. Tools are the how, architecture is the what
- Criteria
  - Team size and capabilities → small team, don't try a complex solution from big shops
  - Speed to market → perfect is the enemy of good. Deliver value early and often
  - Interoperability → it needs to interact with existing systems (ODBC, JDBC, REST)
  - Cost optimization and business value → TCO, TOCO to calculate
  - Immutable versus transitory technologies → use a two-year time horizon to reevaluate your technology choices. Lindy effect: the longer a technology has been established, the longer it will be used. Remember Hive
  - Location (cloud, on prem, hybrid cloud, multicloud) → useful details on how cloud providers store data to avoid bottlenecks. Right now you need to keep one eye on the present while planning for unknowns
  - Build versus buy → invest in building and customizing when doing so will provide a competitive advantage. Otherwise, stand on the shoulders of giants and use what is already available. Prefer OSS and COSS
  - Monolith versus modular → monolith can become a trap. Decide based on flexibility and interoperability
  - Serverless versus servers → usually serverless makes sense unless usage is so high that servers are more efficient. Decide based on workload, cost, and limitations
  - Optimization, performance, and the benchmark wars → don't trust vendor benchmarks blindly since each case is different

## Data Generation in Source Systems

- OLTP vs OLAP, standard distinctions. Also CDC (Change Data Capture) to detect changes in DBs, as well as database logs
- Pay attention to the different times: when the event is generated, when it is ingested, when it is processed...
- Typical sources can be:
  - Databases (relational, NoSQL, graph)
  - APIs (REST, GraphQL, webhooks for events, RPC for distributing)
  - Data sharing (for example, a public object storage system)
  - Third-party data sources (CRM, typically via DB or API)
  - Message queues (real-time events, Kafka)
- Data engineers tend to treat source systems as "someone else's problem." Do this at your peril. Establish communication with all system owners, especially when there are application changes

## Storage

- Let's explore the components of the chapter
- Starting from HDD and SSD, technology has advanced a lot. HDDs physically read and copy binary data, while SSDs use flash cells. Very important concepts: latency and transfer speed
- Lots of useful info about caching, SAN, NAS, and files
- On object storage cloud systems like S3 there is not really a directory. If you list something and the bucket has millions of files, it will take a while even if the directory appears small. It just assigns a key that looks like a directory to us, mapped to an object
- Redis is a very powerful key-value store if you can tolerate small data loss
- Hadoop may look dead, but it has evolved into more powerful storage systems for big data

### Ingestion

- Push vs pull vs polling (check for updates and then read)
- Different types of ingestion such as batch with time-based data or size-based data
- ETL vs ELT
- TTL: Time To Live, how long the streaming service can store the data. Could be a few seconds (risk of losing data) or days (but it will occupy space)
- Dead-letter queue for messages that can't be ingested (too big, expired, or error)
- Ways to ingest data: direct DB (for example, ODBC) or CDC (Change Data Capture, fast but can be expensive), API (trending), message queues (Kafka), object storage (data lake connector), EDI (older way to handle data movement, could be a script on the server), DB export manual, SSH, webhooks, shell, CSV, web interface where you manually download the data, AWS Snowball-like for big file sharing, web scraping

### Queries

- DDL and DML (SELECT INSERT UPDATE DELETE COPY MERGE)
  - The four critical parts of a data warehouse can be described as follows:
    - Subject-oriented → the data warehouse focuses on a specific subject area, such as sales or marketing
    - Integrated → data from disparate sources is consolidated and normalized
    - Nonvolatile → data remains unchanged after it is stored in a data warehouse
    - Time-variant → varying time ranges can be queried
- Inmon vs Kimball, two schemas for DWH. Inmon normalizes heavily
- Facts vs dimensions. Dimensions are entities (for example, the calendar or the master product), while facts are events like transactions and orders
- SQL vs Spark: use what is simpler. For Spark you often need more procedural steps; for SQL some tasks might be awkward in Spark
- Suggestions for Spark
  1. Filter early and often.
  2. Rely heavily on the core Spark API, and learn to understand the Spark-native way of doing things. Try to rely on well-maintained public libraries if the native Spark API doesn't support your use case. Good Spark code is substantially declarative.
  3. Be careful with UDFs.
  4. Consider intermixing SQL.
- Insert, upsert, delete, truncate: differences are clear
- Data wrangling takes messy, malformed data and turns it into useful, clean data. This is generally a batch transformation process.
- Introducing MapReduce, the concept behind Spark and Hadoop: it redistributes the computation (for example, a count) to all nodes, then retrieves the results for the final step. This parallelizes and speeds up the process a lot
- Views vs materialized views → the first are computed each time a query runs, while MVs update only when changes happen. Also federated views, which are links to other DBs

## Serving Data

- Trust. The fanciest, most sophisticated data architecture and serving layer are irrelevant if end users don't believe the data is a reliable representation of their business
- Hiring. When creating a data product, it helps to think of the "jobs to be done." A user "hires" a product for a "job to be done." This means you need to know what the user wants, their motivation for "hiring" your product
- Business analytics → suggestions for actions to take (for example, new investments), operational analytics → actions to take now (for example, alerting), embedded analytics → dashboards for users to assist in their tasks
- Reverse ETL and other stakeholders

## Security & Privacy

- Always be cautious; the weakest link is often the human
- Many companies have security policies hundreds of pages long that nobody reads, and annual reviews that people quickly forget, just to check a box for a security audit
- The principle of least privilege means that a person or system should be given only the privileges and data they need to complete the task at hand and nothing more
- Always back up your data
- Example security policy, very useful (for updates and best practices)
- Pay attention to network access. Make sure not to expose IPs to the world

## The Future

> Some question whether increasingly simple tools and practices will lead to the disappearance of data engineers. This thinking is shallow, lazy, and shortsighted. As organizations leverage data in new ways, new foundations, systems, and workflows will be needed to address these needs. Data engineers sit at the center of designing, architecting, building, and maintaining these systems. If tooling becomes easier to use, data engineers will move up the value chain to focus on higher-level work. The data engineering lifecycle isn't going away anytime soon

Continue to explore and learn. The world will evolve and you need to stay current with new trends, technologies, and opportunities.