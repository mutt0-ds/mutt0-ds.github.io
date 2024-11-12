---
title: "TODO: my journey with Full Stack Development: creating a web app from scractches"
date: 2024-11-13
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/web_app/cover.png
draft: true
author: "Mutt0-ds"
tags:
  - webapp
  - next.js
  - tailwind
  - frontend
  - prisma
  - fullstack
---

## 🧠 Breaking Down Full Stack Development

This post has been sitting in my drafts for over 7 months. Why?
First, the project I created has been under discussion for production deployment at my company, so I need to keep certain details vague. Second, there was so much content to cover that I didn't know where to start. It's a lot to unpack, so I'm splitting this into at least two parts.

Today, I want to tackle a challenge that many developers face:
how do you build a complete program from scratch?

And by complete, I mean a full stack application with a database, a user-friendly frontend, and a backend that handles calculations, data movement, and security.

While large companies typically have entire teams dedicated to these different components (frontend, QA, backend, DBA), I want to share my experience building a smaller-scale application. My goal is to help you understand what happens behind the scenes, all the moving pieces involved, and which areas you might want to focus on. As always, using simple and clear language, so, always remember I am oversimplifying a complex topic.

Here's how I built my prototype during my free time.

## Some context

I should mention upfront - I'm not a full stack developer.

My background is in Data Engineering and Data Science. While I'm comfortable with backend languages like Python and TypeScript, frontend development was my biggest challenge. The closest I'd come to frontend work was Power BI, which is an entirely different beast.

The project started with a problem at work: we had a legacy forecasting tool built in Excel. Picture this: hundreds of columns spread across multiple sheets, all powered by VBA macros. The workflow was simple - add numbers, run calculations through VBA, and dump the results into a database.

It worked, but had the classic pain points of legacy systems:

1. VBA debugging was a nightmare
2. Performance was poor
3. The code was a tangled mess that nobody wanted to touch

I wondered: what would this tool look like if rebuilt with modern technologies? So I decided to explore current trending technologies, choosing ones known for their developer-friendly experience (the same ones you'll find in most beginner tutorials).

## The Project Scope

My modernized version needed to handle:

- User input for new sales data
- KPI calculations (like net revenue)
- Configuration management for calculation settings (e.g., VAT rates)
- Excel export functionality (of course)
- What-if analysis through a pivot system

At its core, it's a forecasting system that lets users upload sales data, validates the input, and runs calculations. The tricky part was implementing a complex settings system that depends on multiple variables - think VAT rates by country or customer-specific discounts. This is where the backend really earns its keep.

## Choosing the Tech Stack

This was overwhelming at first. The options seem endless, and you could spend weeks just comparing different tools. Let me break it down to the essentials. You need three main layers:

1. A database for data storage - the logical core of your application. Remember, most business applications ultimately help non-technical users interact with data.
2. A frontend framework to create the user interface, typically built with JavaScript, HTML, and CSS
3. A backend framework to handle calculations and database operations

I'll be honest: I picked the most beginner-friendly options available. My choices were heavily influenced by tutorials from Fireship and Code with Mosh (TODO: full credit).

## Data first

First, I studied the tool and collected the requirements (and that's another story).
Being a data engineer, I started where I was comfortable: database design. Before touching any frontend code, I mapped out my fact and dimension tables - Sales, Product, Customer, Settings, Calculations.

You might wonder about those last two tables. Why separate settings and calculations? Settings can vary by country, customer, or product, requiring complex JOIN operations to associate them with sales data. The granularity is different. As for calculations, values like gross and net revenue require multiple intermediate steps (subtracting discounts, applying tactics, etc.). Having a separate 1:1 table with sales improves both efficiency and model clarity.

Why start with data? A solid database design provides the foundation everything else builds upon. Too often, I've seen developers twist their database design to fit application logic. It should be the other way around - let your application flow from a clean, logical data model.

Ok, I know you have two questions.
Why settings? Settings can be related to a country, a customer, a product: In order to associate them to a Sales line, a big JOIN statement needs to be made to find all the occurrences. Theri grnaularity is different.
Why calculations? Because, for calculating values such as Gross and Net Revenue, multiple intermediate steps needs to be calculated, e.g. subtracting discounts or tacticals. A different table, 1:1 with the sales, improves efficiency and makes the model simpler.

## Frontend Adventures: Tables and UI Components

Once I had my database skeleton, I fired up Next.js and tackled my first frontend challenge: displaying data in tables. Let me tell you - building interactive tables from scratch is painful, especially when you need features like filtering and sorting.

Luckily, I found shadcn/ui, a component library built on Radix UI and Tailwind CSS. It provides standardized UI elements that you can copy and paste in your code without reinventing the wheel.

What initially drew me to shadcn/ui was their table component, which integrates TanStack Table V8, another great library designed for building tables. This gave me filtering, sorting, and pagination right out of the box.

Funny enough, I chose shadcn/ui just for the table component, but ended up using their entire ecosystem. Buttons, cards, popups - they were all just an import away. Modern frontend development has come a long way!

## My Lazy Tips for Frontend Development

- Don't reinvent the wheel - use established UI libraries
- Start simple - you can always add complexity later
- Focus on functionality first, polish second
- TODO add

## Forms and Data Validation

With my data display sorted, I tackled forms next. Next.js forms, combined with Zod for validation, make it surprisingly straightforward to handle user input. You can easily enforce rules like email format validation or ensuring quantities are positive numbers.

I'll dive deeper into forms and validation in part two of this series, where I'll also cover the specific tools I used and share more detailed tips from my experience.

To be continued...
