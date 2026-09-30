---
title: "Reinventing a Full Stack Web App: here's how"
date: 2024-11-13
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/web_app/cover.png
draft: false
author: "Davide Muttoni"
tags:
  - web-app
  - next.js
  - tailwind
  - frontend
  - prisma
  - fullstack
  - postgresql
---

## 🧠 Breaking Down Full Stack Development

This post has been sitting in my drafts for over 7 months for two reasons:

First, since the project I created is being considered for production deployment at my company, I need to keep certain details vague. <br>
Second, **there's so much content to cover** that finding a starting point was challenging. To make it more digestible, I'm splitting this into at least two parts.

Today, I want to tackle a fundamental challenge that many developers face:

> How do you build a 🌟**complete**🌟 application from scratch?

And by complete, I mean **a full stack application with a database, user-friendly frontend, and a backend that handles calculations, data movement, and security**.

While large companies typically have dedicated teams for different components (frontend, QA, backend, DBA), I'll share my experience building a smaller-scale application. My goal is to help you understand the behind-the-scenes workings, all the moving pieces involved, and which areas deserve your focus. As always, I'll use simple and clear language, though keep in mind I'm oversimplifying complex topics.

Here's how I built a prototype of a sales forecasting app for my company.

_Sneak Peek_:

![tool frontend](/images/web_app/tool_frontend.PNG)

## Some context

Let me be upfront - **I'm not a full stack developer**.

My background is in Data Engineering and Data Science. While I'm comfortable with backend languages like Python and TypeScript, frontend development was my biggest challenge. My closest experience with frontend work was Power BI, which is an entirely different beast. I've already talked about my previous experiments [here (Tailwind)](https://mutto.fyi/posts/2022/06/my-books-tailwind/) and [here (Appsmith)](https://mutto.fyi/posts/2022/03/personal-airflow/).

The project emerged from a workplace challenge:**we had a legacy forecasting tool built in Excel**. Classic corporate story.

Imagine hundreds of columns spread across multiple sheets, powered by VBA macros. The workflow was straightforward - users input new sales, run VBA calculations, and export results to a database.

_Something like this. Multiply its complexity by 100 (credits: Excel-Skills.com)_:

![cashflow forecast actual sample 3](/images/web_app/cashflow_forecast_actual_sample_3.jpg)

It worked, but it suffered from classic legacy system issues:

1. VBA debugging was a nightmare
2. Performance was poor. And this was used hundres of times a day!
3. The code was so complex that nobody wanted to touch it

I wondered: _what if we rebuilt this tool using modern technologies_? This led me to explore current trending technologies, focusing on those known for their developer-friendly experience (the same ones you'll find in most beginner tutorials).

## The Project Scope

My modernized version needed to handle:

- **User input** for new sales data
- **KPI calculations** (like net revenue)
- **Settings management** for calculation parameters (e.g., VAT rates)
- Excel export functionality (of course)
- What-if analysis through a pivot system

At its core, it's a forecasting system that lets users upload sales data, validates the input, and runs calculations. The tricky part was implementing a complex settings system that depends on multiple variables - think VAT rates by country or customer-specific discounts.

This is where the backend proves its worth.

_Settings example. Pardon for the weird centering, I had to remove some parts_

![related settings](/images/web_app/related_settings.PNG)

## Choosing the Tech Stack

This was overwhelming at first. The options seem endless. Let me break it down to the essentials. For a full stack application you need three main layers:

- 📦 **A database** for storing the data - the logical core of the application. Remember, most business applications in the end are just wrappers around the database to help non-technical users interact with data.
- 🖼 **A frontend** to create the user interface, typically built with JavaScript, HTML, and CSS
- 🧮 **A backend** to handle calculations and database operations

Simply said: I picked the most beginner-friendly options available. My choices were heavily influenced by tutorials from [Fireship](https://fireship.io/courses/nextjs/) and [Code with Mosh](https://codewithmosh.com/p/ultimate-nextjs-series) - both excellent resources for beginners.

![Architecture](/images/web_app/Architecture.png)

## Data first

First, I studied the tool and collected the requirements (and that's another story).
Being a data engineer, I started where I was comfortable: **database design**. Before touching any frontend code, I mapped out my fact and dimension tables - Sales, Product, Customer, Settings, and Calculations.

You might wonder about some design choices:

- Why separate lines and calculations? While they share a one-to-one relationship, they serve different purposes. Sales data is user-edited, while calculations automatically update based on setting changes (like VAT rates).
- Why start with data? A solid database design provides the foundation for everything else. Too often, developers adapt their database to fit application logic. Instead, let your application flow from a clean, logical data model.

## Frontend Adventures: Tables and UI Components

With the database structure in place, I launched into Next.js and faced **my first frontend challenge**: displaying data in tables. Let me tell you - building interactive tables from scratch is challenging, especially when you need features like filtering and sorting.

Luckily, I found [shadcn/ui](https://ui.shadcn.com/), a component library built on Radix UI and Tailwind CSS. It provides standardized UI elements that you can copy and paste in your code without reinventing the wheel.

I initially chose shadcn/ui for their table component, which integrates [TanStack Table V8](https://tanstack.com/table/latest), another great library designed for building tables. This provided built-in filtering, sorting, and pagination. I ended up using their entire component ecosystem - buttons, cards, popups, and more, all just an import away. Modern frontend development has come a long way!

![dashboard dark](/images/web_app/dashboard-dark.png)

## My Lazy Tips for Frontend Development

- Don't reinvent the wheel - use established UI libraries
- Start simple - you can always add complexity later
- Focus on core features before polishing
- Use AI wisely. While ChatGPT helped debug cryptic Typescript errors (saving roughly 30% of my time) and excels with boilerplates, it struggled with complex business logic

## Forms and Data Validation

With my data display sorted, I tackled **forms** next. Forms are a key part for this kind of app. In the end, it's the user that enters the input, such as a new sale to create calculations from. Making sure the data is correct and usable is crucial, and it wasn't that simple.

Next.js forms, combined with [Zod](https://zod.dev) for validation, make it surprisingly straightforward to handle user input. You can easily enforce rules like email format validation or ensuring quantities are positive numbers.

![settings](/images/web_app/settings.PNG)

I'll talk about forms and validation in part two of this series, where I'll also cover the specific tools I used and share more detailed tips from my experience.

_To be continued..._
