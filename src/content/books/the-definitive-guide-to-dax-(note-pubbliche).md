---
title: The Definitive Guide to DAX
author: Marco Russo, Alberto Ferrari
image: https://m.media-amazon.com/images/P/1509306978.01._SCLZZZZZZZ_SX500_.jpg
badges:
- "💻 IT"
score: "⭐️⭐️⭐️⭐️⭐️"
finished: '2022-08-28'
summary: Power BI and DAX are complex; you need to know them in detail to use them well
showInHome: false
---

Fascinating book, though the reading is long and very technical. The authors explore the whole world behind DAX and almost every chapter left me with essential concepts. Chapter 4, with filter/row context, and 5 with CALCULATE are key to understanding how the language actually works, but I really understood them only on the second pass, after finishing the book and going back as the authors suggest. Learning how to use variables, which in my previous experience were often overlooked and used only when strictly necessary, can make the difference for readable code.

I would add that tools such as DAX Studio and Tabular Editor become very important; I started exploring them in the final chapters.

All the examples are well made and useful both to understand the concept in practice and for a future case where I might have a similar problem and can compare strategies. For this second case, there are entire chapters marked with 🔄 to review later so as not to forget them. Strongly recommended!

I already wrote a blog post based on these notes, so the polished version is this one: https://mutt0-ds.github.io/posts/2022/03/personal-airflow/

## Notes

## 1 ✨ What is DAX?

Basic chapter that introduces the concept of Data Analysis Expressions; not much to add.

Interesting section comparing how Excel, Power BI, SQL, and MDX users approach DAX. I relate to the SQL perspective. Seeing FILTER as comparable to the WHERE clause immediately clarified things for me.

## 2 🔄 Introducing DAX

Very important chapter to get started, with some of the most used functions and the difference between a calculated column and a measure.
It introduces the different data types, without particular surprises (Int, Decimals, Currency, Datetime, Booleans, String, Binary), with the Variant type specific to DAX. It is like Python's Union, meaning it can return different data types.

It introduces the different operators: arithmetic (+ - * /), comparison (<, >, =, <>, >=, <=), and logical (&&, ||, IN, NOT). There are also the functions AND(Condition1, Condition2) and OR.

Tables can be constructed with {}, using () when there are multiple columns. E.g. Colors = {"Red", "White", "Blue"}. Animals = {("Dog", "Woof"), ("Cat", "Meow")}

### Calculated columns

Written as 'Table Name'[Column Name], it is a new column added to the data model and you can use it like the others by default, regardless of context. In Import Mode, they are processed during DB refresh and then stored in memory, so they use RAM. If you have a complex formula, avoid splitting it into several intermediate columns as if it were Excel, to optimize the model.

Use them when:

- The column result will be in a slicer, matrix, pivot, or FILTER condition
- You have an expression strictly related to the row, such as Price * Quantity, that does not rely on aggregation
- You need to categorize text or numbers, for example defining ranges High, Medium, Low or 0-18, 18-25, 25+

### Measures

Not directly associated with a table, written as [Measure Name]. You use measures when you do not want to compute values for each row, but aggregate them, and remember they are computed based on the context. The example used is great: if you create a column Sales[GrossMarginPct] = Sales[GrossMargin] / Sales[SalesAmount], you will see that the total % is over 100%. It does not reason over the set, but row by row. If our 10 products each have a 50% margin, the total will be 50 * 10 -> 500%. A measure GrossMarginPct := SUM(Sales[GrossMargin]) / SUM(Sales[SalesAmount]) instead lets you aggregate correctly. Use when:

- The value depends on context and user selection
- Values are in aggregated form

### Variables

Written at the start of a formula like VAR TotalSales = SUM(Sales[SalesAmount]) ... RETURN result, they are immutable and computed at the beginning of the calculation. They are temporary values that exist only inside the measure you are writing, and are very useful to break down a complex formula into easier pieces (with meaningful names), and to avoid repetition.

### Basic functions

Important note: many of them have a corresponding iterator version, so if you want row-by-row evaluation inside a measure you have two paths.

- Base: SUM, AVERAGE, COUNT, COUNTBLANK, COUNTROWS, DISTINCTCOUNT, DISTINCTCOUNTNOBLANK 
- Logical: AND, OR, IF, IFERROR, NOT, TRUE, SWITCH 
- Information (check equality/shape): ISBLANK, ISERROR, ISLOGICAL, ISNONTEXT, ISNUMBER, ISTEXT
- Math: ABS, EXP, FACT, LN, LOG, LOG10, MOD, PI, POWER, QUOTIENT, SIGN, SQRT, RANDOM, RANDBETWEEN, ROUND, EVEN, ODD, and many others rarely used
- Text: CONCATENATE, CONCATENATEX, EXACT, FIND, FIXED, FORMAT, LEFT, LEN, LOWER, MID, REPLACE, REPT, RIGHT, SEARCH, SUBSTITUTE, TRIM, UPPER, VALUE
- Conversion: CURRENCY, INT, DATE, TIME, VALUE, DATEVALUE, FORMAT. You often use the latter to format dates, similar to datetime.strptime(), and it is the inverse of DATEVALUE
- Date & Time: DATE, DATEVALUE, DAY, EDATE, EOMONTH, HOUR, MINUTE, MONTH, NOW, SECOND, TIME, TIMEVALUE, TODAY, WEEKDAY, WEEKNUM, YEAR, YEARFRAC
- Relational: RELATED and RELATEDTABLE. We will see later how powerful they are; they navigate relationships to fetch values from related columns.

## 3 ⚠ Using basic table functions

### FILTER

Introduces how to use FILTER and the concept of EVALUATE, which you will use in DAX Studio. For FILTER with multiple conditions, putting the most selective first optimizes the query on large tables.

### ALL*

Also introduces the ALL* functions, which are very powerful: ALL, ALLEXCEPT, ALLCROSSFILTERED, ALLNOBLANKROW, ALLSELECTED. ALL ignores any active filter in the report and is useful when computing ratios and % of total, because the user might have filtered something. It returns a list of unique values, requires a table or list of columns, and cannot be an expression; if you use it with more than one column it shows all combinations present in the data. ALLEXCEPT can be used like "take everything from that table except those columns". ALLSELECTED is covered in chapter 14; use with caution.

### VALUES, DISTINCT, BLANK

Similar to ALL, VALUES and DISTINCT also return a list of unique values, but they are different. VALUES returns the distinct values that are visible given the current filters, and DISTINCT does the same, but they behave differently with invalid relationships. The example in the book is very clear: if, for example, a product is missing from the table, Sales will have some BLANK values. DISTINCT gets confused when computing average amount per product, whereas VALUES handles it correctly in the division. My rule of thumb: prefer VALUES, as it is used throughout the book.

Short note on HASONEVALUE, which is a shortcut for IF(COUNTROWS(VALUES([column])) = 1, VALUES([column]), ...) and has a second argument to return a message if there is more than one value.

## 4 ⚠ Understanding Evaluation Context

There are two completely different contexts: filter context, which filters data, and row context, which iterates tables. A context is the environment in which the expression is evaluated.

### Filter Context

Any formula is interpreted based on the cell, which in turn exists based on the filters and the columns we have included. So TotalSales = SUM(Sales[Amount]) will be 30M if shown in a card with no filters, maybe 1M if only Australia is selected, or 30k in a table split by brand, but it is always the same measure. What matters is the context of the cell executing it, which is the filter context.

### Row Context

The example uses a calculated column, which works row by row and is computed during data refresh, such as Sales[Gross Margin] = Sales[Quantity] * (Sales[Net Price] - Sales[Unit Cost]). How does DAX know which row it is iterating? By using the row context, which is essentially a cursor.
If you write Gross Margin as a measure, you lose the row context of the calculated column, so you need an iterator with X; Gross Margin := SUMX(Sales, Sales[Quantity] * (Sales[Net Price] - Sales[Unit Cost])) works because it uses the SUMX iterator, which maintains context. Instead, Gross Margin := Sales[Quantity] * (Sales[Net Price] - Sales[Unit Cost]) is invalid.

### Other notes

It continues with many interesting examples about the difficulty of understanding the two contexts, especially in filters.

When functions iterate in two different contexts, there is the EARLIER function to consider the outer layer. It is somewhat tricky; the example in the book shows how the switch works. It corresponds in some way to Python's super(). The book itself suggests using variables instead.

Remember that row context iterates a single table, it does not filter, and therefore it cannot use relationships without RELATED/RELATEDTABLE. A filter context, instead, uses relationships automatically and behaves differently depending on direction (single or both, see chapter 15).

Very interesting example with SUMMARIZE when computing average customer age without counting duplicates: the code shows how to include a different column.

## 5 ⚠ Understanding CALCULATE and CALCULATETABLE

CALCULATE is the most powerful and important function in DAX and the one with more facets to discover. CALCULATETABLE is similar but returns a table. Their complexity comes from the fact that they are the only ones that create new filters, and therefore modify the filter context from chapter 4. The authors recommend re-reading the chapter carefully.

The formula is CALCULATE(Expression, Condition1, ... ConditionN), accepting any expression as the required first parameter, and then n filters. For filters, which are tables/lists of values, you can use an expression 'Product'[Brand] = "Contoso" which is equivalent to FILTER(ALL('Product'[Brand]), 'Product'[Brand] = "Contoso"). For readability, prefer the compact version.

In short, CALCULATE:

- Makes a copy of the existing filter context
- Evaluates each filter in its args and, for each condition, produces a list of valid values for the specified column (in the example, it will be {"Contoso"}). It is equivalent to a FILTER ALL (remember)
- If two or more filters target the same column, they are merged with an AND
- Uses the new condition to replace existing filters or adds it to the context if none exist
- If there is a row context, applies a Context Transition by turning it into a filter context and removing the existing one
- When finished, applies the new filter context to the model, and once computed it returns to the original context. It is not a permanent change

Very important: because CALCULATE uses a FILTER(ALL) behind the scenes, if you want to avoid removing all filters you must use the extended form of the condition, and use VALUES if you want to preserve current filters from other tables, for example. The chapter shows an interesting case with a ratio where the Sales table is filtered, while the Date table must keep its filters.

### Filtering with complex conditions

There is an example with a slicer that tries to filter a CALCULATE, but since the compact form uses ALL it gets ignored. You need to wrap the filter condition in KEEPFILTERS.

### Context Transition

> CALCULATE invalidates any row context. It automatically adds as filter arguments all the columns that are currently being iterated in any row context—filtering their actual value in the row being iterated

In short, CALCULATE uses the row context as a filter in the filter context, because by itself row context is not an iterator. This is a transition.

Great example to review context. The formula Sum Num Of Sales := SUMX(Sales, COUNTROWS(Sales)) surprisingly returns COUNTROWS squared; the number of Contoso rows is 37,000, for example, and SUMX iterates 37,000 times, so it will return 37,000 * 37,000 because it is reasoning in row context.

Another example: Sales Amount := SUMX(Sales, CALCULATE(SUM(Sales[Quantity]))). The point is that CALCULATE is creating filters row by row because it follows the row context in SUMX, so it will do Tot = CALCULATE(SUM(Sales[Quantity]), Sales[Product] = "A") + CALCULATE(SUM(Sales[Quantity]), Sales[Product] = "B") ... etc.

- Context transition (CT) is costly. Use CALCULATE sparingly, because in iterations it will apply the filter for each row
- CT does not filter only one row, as you might think. The new transitioned filter filters all rows with the same value. So if in the example above we have Sales[Product] = "A", there might be multiple results depending on the input data
- CT uses columns not present in the formula
- CT creates a filter context starting from a row context
- CT occurs when there is a row context (so in iterators and calculated columns). Note that measures implicitly have a CALCULATE too
- CT transforms all row contexts, without exceptions and without a way to stop it
- CT invalidates any existing row context, once the transition is applied

Unfortunately, CT does not filter just one row but reasons on unique values, so we can get tricky errors in tables without unique values. Using this tactic is not only wrong, but also very slow because it must iterate over millions of rows.

Using a measure is also wrong, because

> Whenever you read a measure call in DAX, you should always read it as if CALCULATE were there

Every measure hides a CALCULATE that wraps its expression.

### CALCULATE modifiers (see also chapter 14)

- USERELATIONSHIP, used in edge cases, for example if you have an Order Date and a Delivery Date you might have two relationships with the Date table, one active by default and one inactive. Adding USERELATIONSHIP(Key1, Key2) inside CALCULATE tells it to use the inactive one for this calculation
- CROSSFILTER, similar but more powerful: it can disable a relationship between tables and change its direction; it has a third parameter (NONE, ONEWAY, BOTH). Personally, never used
- KEEPFILTERS: instead of VALUES, another way to keep current filters is KEEPFILTERS, e.g. Audio Sales KeepFilters := CALCULATE([Sales Amount], KEEPFILTERS('Product'[Category] = "Audio")). Instead of overwriting the filter context, it adds the condition with an AND, so cells included in the function show a number and the others are BLANK
- ALL: behaves differently when used inside CALCULATE. It becomes a sort of REMOVEFILTER and cancels the effect of KEEPFILTERS, so it can ignore additional filters added in the function. All modifiers are computed with higher priority than normal filters
- ALLSELECTED: similar to ALL, it also behaves differently in this case; see chapter 14 as it can be dangerous, so try to avoid it unless you know exactly what you are doing

## 6 ✨ Variables

They are important for code readability and performance, avoiding repetition. The one thing to remember is that they are constants: available only within the expression that contains them, computed at the beginning of evaluation, and immutable.

The order you create them matters; they must not reference VARs declared later.

Another point is the name, which must be unique with respect to table names, otherwise the DAX engine gets confused. Use long, meaningful names. DAX, for example, often prefixes internal names with two __

## 7 🔄 Working with iterators and with CALCULATE

Most iterators require a table and an expression that will be evaluated row by row for that table (see the classic SUMX). Specifically, they iterate all rows collecting the value, and then apply an operation, in this case a sum. The difference between iterators is therefore the final operation; the flow is always the same.

Know this: iterator cardinality is the number of rows scanned by the iterator. Avoid nesting several iterations and making cardinality grow exponentially; keep it low.

The chapter continues with interesting examples, such as how to compute the day with the largest Sales by nesting MAXX and SUMX, or showing the list of visible colors using CONCATENATEX and VALUES, how ALLSELECTED makes more sense with RANKX when the user is filtering, and how AVERAGEX should be replaced by DIVIDE when there are BLANKs because it handles them correctly.

## 8 🔄 Time Intelligence Calculations

Very interesting chapter, because dates in DAX are managed in a not always intuitive way.

A golden tip is to always have a Date table related to all others to operate on dates, in order to optimize performance, improve the experience, and simplify the structure.

By default Power BI creates a hidden date table for each column in the model of type Date or DateTime, so you can slice by year, quarter, month, day, etc. Unfortunately this means you have one table per column, creating overhead, and you cannot see or modify them. It is better to disable that feature and create a default Date table to reuse every time.