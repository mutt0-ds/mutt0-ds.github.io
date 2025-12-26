---
title: SQL Antipatterns
author: Bill Karwin
image: https://pragprog.com/titles/bksqla/sql-antipatterns/bksqla.jpg
badges:
- "💼 Work"
- "💻 IT"
score: "⭐️⭐️⭐️⭐️⭐️"
finished: '2024-11-26'
summary: "Shooting yourself in the foot with SQL is easy. Think before making certain decisions"
showInHome: false
---

Recommended by [the Ludic blog](https://ludic.mataroa.blog/blog/i-am-out-of-data-hell/), great book on mistakes to avoid with SQL (started from dynamic column values). I should have read it years ago. Excellent, highly recommended. Many insights on what not to do in SQL, plenty of useful gems. It helped me a lot: every DBA should read it.

I love the bullet structure, with a story, a saying, an antipattern, and a pattern to follow, plus appendices. It is fairly DB-agnostic, but mentions commands from various tools.

## Notes

## 1. Logical Database Design Antipatterns

### Jaywalking

> Store each value in its own column and row.
Using lists inside a string to avoid creating a many-to-many is OK only if you never need to access those values; otherwise it is a nightmare for indexing.

Instead, create a bridge table to connect them.

### Naive Trees

> A hierarchy consists of entries and relationships.
Model both of these to suit your work.
Example: a blog with many nested comments. How do you find the parent and display the whole thread while scaling well? The default choice is an adjacent list with a parent key, self-joining. But it scales poorly for the most common case: reconstructing the entire thread. Be careful with nested trees. A path approach is often the least painful even if not optimal, or nodes. Recursive queries are the best if your database supports them.

### ID Required

> Conventions are good only if they are helpful.
Common case: everyone uses id as the primary key by convention, but who says you must? Better to use an id with a meaningful name like bug_id or technician_id and enforce the key on that column. It might even be a composite key (bug_id, technician_id), making a generic id column useless. If you have a framework like Prisma that expects an id, keep it. But be smart and deliberate with keys. The id convention can hide the real meaning of keys.

### Keyless Entry

> Make your database mistake-proof with constraints.
The antipattern is assuming input data maintains referential integrity, when in fact anything can happen: orphan rows, duplicates, and so on. Foreign keys are important because they block bad data at insert time. The tradeoff is you cannot remove or update a parent row without addressing the children, which often discourages their use. You see this antipattern when you find orphaned rows and automated checks for inconsistencies. The solution is to view foreign keys as ways to keep dirty data out in the first place, not as limitations. You can also assign cascading updates/deletes for efficiency.

### Entity-Attribute-Value

> Use metadata for metadata.
Avoid a generic attribute table. It seems clever for a flexible schema, but it is not. Those name-value tables let you put anything in. You cannot enforce required attributes, you cannot use proper data types if everything is a string, and you end up doing outer joins to fetch everything. Extensibility hurts usability. Use NoSQL if you truly need flexibility, or add a type column to identify the object type and allow many null columns. That is fine. If you need rigidity, use Single Table Inheritance. If you cannot change it, handle it in the frontend.

### Polymorphic Associations

> In every table relationship, there is one referencing table
and one referenced table
These occur when a row in one table relates to exactly one row in one of several other tables. For example, a comment belongs to either a bug or a feature request. How do you enforce that? The antipattern is adding issue_type, mixing metadata with data. Then you do a Select * where issue_type = "Bugs". The problem is it allows associations you do not want (like a comment without a valid parent). Solutions are either a bridge table (sometimes overkill) or using COALESCE with multiple joins to find the first non-null match.

### Multicolumn Attributes

> Store each value with the same meaning in a single column.
Example: phone numbers. You might have many variants (assistant, emergency, office). Where do you put them? Same for tags. Similar to Jaywalking.

Remember that changing the structure means adding a new column, copying the old data to the new one, setting the new one as main, then dropping the old one. Solution: create a separate table for the field if there are many relationships.

### Metadata Tribbles

> Don’t let data spawn metadata.
Performance worsens as data volume grows. Indexes help. The "tribbles" example is tables like Bugs_2009 and Bugs_2008, which create integrity, query, and synchronization problems. If you need a table per case X or a column per year, be concerned. This is only useful for archival.

Use horizontal partitioning, vertical partitioning (as needed), or sharding instead.

## 2. Physical Database Design Antipatterns

### Rounding Errors

> Do not use FLOAT if you can avoid it.
Do not use FLOAT unless you are doing scientific calculations. Use NUMERIC/DECIMAL so you control precision and scale. Classic rounding issues otherwise.

### 31 Flavors

> Use metadata when validating against a fixed set of values.
Use data when validating against a fluid set of values.
Example: Mr, Mrs, Ms. You think they are fixed, but languages and conventions change. Immutable sets tend to mutate. Do not hardcode allowed values at creation time or with CHECK constraints if they will evolve, because maintenance becomes hard. Use ENUM only if you are certain the set is immutable. Better solution: a lookup table with the allowed values, like BugStatus.

### Phantom Files

> Resources outside the database are not managed by the database.
Files such as images are not part of the DB, so they do not follow DELETEs, backups, ROLLBACKs, and so on. You can use a BLOB field if you must, or manage external storage carefully (for example, today you might use S3).

### Index Shotgun

> Know your data, know your queries, and MENTOR your indexes.
Indexes are the secret weapon for the most important DB concept: performance. How not to use them?

Do not add them randomly. Do not fill a table with indexes you will never use. Most engines create one for the primary key already. Prefer small, stable data types, not nvarchar(100) if you can avoid it. For composite indexes, the order matters; queries must use the leading columns. If you apply functions to the leftmost column, that index will not be used (same for LIKE '%...'). Use EXPLAIN and profilers to see how queries run. Rebuild or reorganize indexes periodically if your engine needs it.

## 3. Query Antipatterns

### Fear of the Unknown

> Use null to signify a missing value for any data type.
Many dislike NULL because it behaves differently, but you just need to remember it is not a string or False; it is a specific marker meaning "missing." Know the behavior, use IS NULL in queries, and leverage COALESCE. There is nothing wrong with NULL when the data can logically be missing. Be careful when comparing.

### Ambiguous Groups

> Follow the Single-Value Rule to avoid ambiguous query results.
A common mistake: doing GROUP BY with an aggregate (for example, max(date) by product_id) and then including other columns. The GROUP BY column must be the unique key for that aggregation (Single-Value Rule). Solutions: join back to fetch the remaining values (slower), or use an aggregate such as MAX or string aggregation on those columns.

### Random Selection

> Some queries cannot be optimized; take a different approach.
How to generate random data, e.g., show a random ad or create fake data. Do not use ORDER BY RAND() on large sets because it cannot use indexes. Use database-specific features (SQL Server TABLESAMPLE, etc.), or workarounds with numeric ranges, CEIL, and RAND on indexed columns.

### Poor Man’s Search Engine

> You don’t have to use SQL to solve every problem.
Implementing full-text search in plain SQL is hard. LIKE is slow. Either use external search engines or the built-in features of your DB. MySQL has FULLTEXT INDEX, SQL Server has full-text search, PostgreSQL has TSVECTOR with GIN.

### Spaghetti Query

> Although SQL makes it seem possible to solve a complex problem in a
single line of code, don’t be tempted to build a house of cards.
Because complex queries are hard, developers tend to put everything into one giant statement. That often complicates things. Watch out for Cartesian products. If you forget a join between two tables, their rows multiply, and sums will explode. Using DISTINCT is a band-aid that hides the problem and slows the query. Prefer subqueries, temp tables, or CTEs that solve the problem step by step.

### Implicit Columns

> Take all you want, but eat all you take.
Sometimes, to reduce typing, developers use wildcards like * or DEFAULT. This creates problems if the schema changes and the script still assumes DEFAULTs or a dropped column. You fetch everything and miss omissions or column order changes in the application. It also hurts performance, readability, and scalability. Use explicit column lists unless you are doing a quick ad-hoc query. You will need explicit names anyway when you use the results.

## 4. Application Development Antipatterns

### Readable Passwords

> If you can read passwords, so can a hacker.
Do not store passwords in clear text and do not email them to users. Hash passwords (SHA-256 or better) and add a randomly generated salt to avoid reverse lookups from common password lists. You cannot read the password back, but you can send a reset link or a short-lived token. In general, do not roll your own auth.

### SQL Injection

> Let users input values, but never let users input code.
Classic SQL injection. Do not concatenate user strings into SQL. Use parameters or sanitize input. Always review any user-controlled input that touches a query (sorting, selecting, filtering) whether via a form or a URL. Modern frameworks help.

### Pseudokey Neat-Freak

> Use pseudokeys as unique row identifiers; they’re not row numbers.
Do not try to fill gaps if some auto-incremented IDs are missing because rows were deleted. Sequences keep incrementing and patching gaps creates needless risk. If you need to roll back deleted rows, you will collide with new IDs. It is usually just deleted rows or errors. Pseudokeys only need to be unique, not sequential. Communicate this clearly to users who worry about gaps.

### See No Evil

> Troubleshooting code is already hard enough.
Don’t hinder yourself by doing it blind.
Handle query errors explicitly instead of guessing or masking failures. The database can fail, a query can be wrong, or connectivity can drop. Handle errors at the application level and surface enough context to troubleshoot.

### Diplomatic Immunity

> Use software development best practices, including documentation, testing, and source control, for your database as well as your application.
Self-explanatory.

### Magic Beans

> Decouple your models from your tables.
This one is more architectural. Decouple database tables from pure domain objects. An object has a table, it is not the table. Give the object its own functions and behavior to interact with the DB, and query through that interface. This avoids tangling objects and tables and keeps the two layers decoupled.