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

This post has been sitting in my drafts for over 7 months.Why?

First, the project I created has been under discussion for production deployment at my company, so I need to keep certain details vague.<br>
Second, there was so much content to cover that I didn't know where to start. It's a lot to unpack, so I'm splitting this into at least two parts.

Today, I want to tackle a challenge that many developers face:

> How do you build a **complete** application from scratch?

And by complete, I mean **a full stack application with a database, a user-friendly frontend, and a backend that handles calculations, data movement, and security**.

While large companies typically have entire teams dedicated to these different components (frontend, QA, backend, DBA), I want to share my experience building a smaller-scale application. My goal is to help you understand what happens behind the scenes, all the moving pieces involved, and which areas you might want to focus on. As always, using simple and clear language, so, always remember I am oversimplifying a complex topic.

Here's how I built a prototype of a sales forecasting app for my company.

_Sneak Peek_:

<div style="max-width: 2266px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 48.0932%;"><iframe src="//iframely.net/fuw3M7i" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## Some context

I should mention upfront - **I'm not a full stack developer**.

My background is in Data Engineering and Data Science. While I'm comfortable with backend languages like Python and TypeScript, frontend development was my biggest challenge. The closest I'd come to frontend work was Power BI, which is an entirely different beast. I've already talked about my previous experiments [here (Tailwind)](https://mutt0-ds.github.io/posts/2022/06/my-books-tailwind/) and [here (Appsmith)](https://mutt0-ds.github.io/posts/2022/03/personal-airflow/).

The project began with a problem at work: we had a legacy forecasting tool built in Excel. Picture this: hundreds of columns spread across multiple sheets, all powered by VBA macros. The workflow was simple - users insert new sales, run calculations through VBA, and dump the results into a database.

_Something like this. Multiply its complexity by 100 (credits: Excel-Skills.com)_:

<div style="max-width: 960px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//iframely.net/7Trgacl" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

It worked, but had the classic pain points of legacy systems:

1. VBA debugging was a nightmare
2. Performance was poor. And this was used hundres of times a day!
3. The code was a tangled mess that nobody wanted to touch

I wondered: what would this tool look like if rebuilt with modern technologies? So I decided to explore current trending technologies, choosing ones known for their developer-friendly experience (the same ones you'll find in most beginner tutorials).

## The Project Scope

My modernized version needed to handle:

- **User input** for new sales data
- **KPI calculations** (like net revenue)
- **Settings management** for calculation settings (e.g., VAT rates)
- Excel export functionality (of course)
- What-if analysis through a pivot system

At its core, it's a forecasting system that lets users upload sales data, validates the input, and runs calculations. The tricky part was implementing a complex settings system that depends on multiple variables - think VAT rates by country or customer-specific discounts.

This is where the backend really earns its keep.

_Settings example. Pardon for the centering, I had to remove some parts_

<div style="max-width: 1848px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 41.8182%;"><iframe src="//iframely.net/2TCjhD3" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## Choosing the Tech Stack

This was overwhelming at first. The options seem endless, and you could spend weeks just comparing different tools. Let me break it down to the essentials. For a full stack application you need three main layers:

- 📦 **A database** for storing the data - the logical core of the application. Remember, most business applications ultimately help non-technical users interact with data.
- 🖼 **A frontend** to create the user interface, typically built with JavaScript, HTML, and CSS
- 🧮 **A backend** to handle calculations and database operations

I'll be honest: I picked the most beginner-friendly options available. My choices were heavily influenced by tutorials from [Fireship](https://fireship.io/courses/nextjs/) and [Code with Mosh](https://codewithmosh.com/p/ultimate-nextjs-series). I recommend them: great courses, easy to follow, they will guide you through the basics.

<div style="max-width: 4714px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 68.4317%;"><iframe src="//iframely.net/6FJOKN4" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## Data first

First, I studied the tool and collected the requirements (and that's another story).
Being a data engineer, I started where I was comfortable: **database design**. Before touching any frontend code, I mapped out my fact and dimension tables - Sales, Product, Customer, Settings, Calculations.

You might have some questions already.

- Why separate lines and calculations? The granularity is the same, 1 sale has 1 calculation, but while sales can be only edited by the users, that's not the same for calculations. If you change the VAT value for France in the Settings, all the calculations (like Net Revenue) related to French data are reprocessed. But Sales values are not impacted.
- Why start with data? A solid database design provides the foundation everything else builds upon. Too often, I've seen developers twist their database design to fit application logic. It should be the other way around - let your application flow from a clean, logical data model.

## Frontend Adventures: Tables and UI Components

Once I had my database skeleton, I fired up Next.js and tackled **my first frontend challenge: displaying data in tables**. Let me tell you - building interactive tables from scratch is painful, especially when you need features like filtering and sorting.

Luckily, I found [shadcn/ui](https://ui.shadcn.com/), a component library built on Radix UI and Tailwind CSS. It provides standardized UI elements that you can copy and paste in your code without reinventing the wheel.

What initially drew me to shadcn/ui was their table component, which integrates [TanStack Table V8](https://tanstack.com/table/latest), another great library designed for building tables. This gave me filtering, sorting, and pagination right out of the box.

Funny enough, I chose shadcn/ui just for the table component, but ended up using their entire ecosystem. Buttons, cards, popups - they were all just an import away. Modern frontend development has come a long way!

<div style="max-width: 1536px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 67.6563%;"><iframe src="//iframely.net/XASUIo4" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## My Lazy Tips for Frontend Development

- Don't reinvent the wheel - use established UI libraries
- Start simple - you can always add complexity later
- Focus on functionality first, polish second
- Leverage AI. Debugging cryptic Typescript errors is no fun. ChatGPT happily gave me an hand in many edge cases, saving me precious hours. I found it unusable for anything slightly more complex though, expecially when calculating the business logic. Still ,I estimate a 30% speedup on the most annoying cases.

## Forms and Data Validation

With my data display sorted, I tackled **forms** next. Forms are a key part for this kind of app. In the end, it's the user that enters the input, such as a new sale to create calculations from. Making sure the data is correct and usable is crucial, and it wasn't that simple.
Next.js forms, combined with Zod for validation, make it surprisingly straightforward to handle user input. You can easily enforce rules like email format validation or ensuring quantities are positive numbers.

<div style="max-width: 2258px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 28.1084%;"><iframe src="//iframely.net/1o5Danv" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

I'll dive deeper into forms and validation in part two of this series, where I'll also cover the specific tools I used and share more detailed tips from my experience.

_To be continued..._
