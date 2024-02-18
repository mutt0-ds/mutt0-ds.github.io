---
title: "TODO: my journey with Full Stack Development: creating a web app from scractches"
date: 2024-02-24
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/obsidian/obsidian.jpg
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

## 🧠 Introduction to Second Brains & Brain Dumping

I've been quite silent in the past months, but there was quite a big reason for doing so: I was studying, a lot.
This time I decided to dive again into fullstack web development, but instead of my past, smaller experiments of one page, I wanted to build a functional web app including Database, ORM, Authentication and Excel integration.

I already worked on smaller projects, but this "secret misssion" was going to be inspired by a legacy tool for Forecasting, I had the chance to study.

I asked myself: how this tool could be if created with modern technologies? I chose the hot picks that are currently trending for their developer experience (thus are suggested for most of the beginner tutorials) and re-created the tool myself.

This post will give my perspective through this journey: I will start with a general overview of the project, diving in the technical aspects in part 2.

## The scope

The tool I want to create, inspired by an existing system, should have the following features:

- Accepting user input for new sales
- Calculating financial results based on it
- Show and edit settings related to the calculations (e.g. VAT)
- Exporting to Excel
- Simulating outputs with a pivoting system

A classic forecasting system, which mostly consists on letting the user upload rows for the sales, checking that there are no mistakes, then running calculations.
The tricky part is that there was a complex setting system depending on multiple variables, e.g. the VAT for the country or the Customer discount based on the Customer.
Overall, the flow was simple

## The choice of the tool

Being honest here: I picked the simplest options available. A modern stack, beginner-friendly, recommended in the two main tutorials I followed in the past by Fireship (TODO) and Code with Mosh.

If you are new to this worls, for a minimal Full Stack web app you basically need 3 things

1. A database where to store data. My app is just a cool UX for interacting with it, in the end.
2. A framework for the front end, to display the results to the user
3. A framework for the back end, e.g. to run calculations and put data in the DB. It's essential that end user doesn't have access to this part, otherwise they can do wehatever they want to the DB

The rest is just cosmetic/developer-friendly help.
For example, I used Prisma as an ORM, the middleware between DB and Back end that makes the queries, and Shadcn.ui + Tailwind CSS for the frontend, instead of writing hundreds of CSS lines I used the standard classes for the objects.

## My first steps

I jumpstarted with a data-engineer approach: data first. Before building everything, we need to reason on the Database perspective. Remember, the web app is just a cool wrapper around it. So I created some fact and dimension tables, Sales, Product, Customer, Settings, Calculations...

TODO: too technical?
Ok, I know you have two questions.
Why settings? Settings can be related to a country, a customer, a product: In order to associate them to a Sales line, a big JOIN statement needs to be made to find all the occurrences. Theri grnaularity is different.
Why calculations? Because, for calculating values such as Gross and Net Revenue, multiple intermediate steps needs to be calculated, e.g. subtracting discounts or tacticals. A different table, 1:1 with the sales, improves efficiency and makes the model simpler.

Once the skeleton was ready, I run Next.js and started building the basic pages. At first, my first task was to display the data in a table.

## Shadcn

I'll tell you: building tables is a real pain, especially when you want to add basic features likes filtering and ordering. The code becomes rapidly messy.
Luckily I stumbled upon Shadcn.ui, which is a component library built on top of Radix UI and Tailwind CSS. It basically gives a template that can be used for quickly styling the elements of the page and make sure they are standardized, just like Bootstrap did with "vanilla" CSS.
What's cool about Shadcn is that they have a fabolous Table compoonent that used the super-advanced Tanstack V8 lIbrary, which has filtering, ordering, pagination and all the advanced features I needeed. SO, I chose that frontend library only for one component, But I ended up using many of them becasue they were so easy! Just importing them, and voila: buttons, cards, popups, immediately available.

Compared to the past, Front End tools have become more and more powerful: the difference is astonishing.

## So, now?

So, my beautiful table was ready, the data
