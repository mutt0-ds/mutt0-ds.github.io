---
title: "Simplicity speaks louder than Complexity"
date: 2025-03-08
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: images/first_pitch/title.png
draft: false
author: "Mutt0-ds"
tags:
  - data-culture
  - slides
  - presentation
  - communication
  - architecture
---
A few days ago, I had my first technical presentation at my new company.
I joined InvestSuite 3 months ago and it was finally time to present the product I’m working on, StoryTeller, to a very important customer.

I was nervous.

I’ve given many presentations in the past (to hundreds of people, even at a conference) so this wasn’t entirely new to me. But I’m shy by nature, and presenting doesn’t come easily to me. This time, it felt different because the stakes were higher: it was about selling our product.

On top of that, explaining StoryTeller is tricky, even to a technical audience. It’s a financial reporting product with a lot of technical, mathematical and financial nuances. You could spend hours discussing it. I’ve been working on it for two months, and there are still parts of its logic I need to review with my PM because they’re not clear to me yet!

So, how did I fight my nervousness and explain a complex project without confusing the audience?

### Some context

I'm going to be honest: there is no silver bullet for this, so don't expect this article to offer you a quick fix to your presentation anxiety.

Our product has an API that you can query to generate personalized portfolio reports. The codebase is intricate, with lots of technical aspects and tricky mathematical and financial concepts to fully understand.

What I did was put myself in the customer’s shoes. I thought about my time in my past experience when I needed to implement an API. Which happened several times, as I was focusing on Data Engineering tasks.

*Did I need to know every intricacy of the customer’s product?*
*Did I need to understand its business value or the formulas behind it?*
- Nope. I just needed to know the structure in the simplest way possible, how to interact with it, and what common errors I might encounter.

Of course, we are talking about prototyping and the first steps of a project. Especially for complex products, the more we proceed with the implementation, the more research and documentation was part of my tasks.

So that's how I structured my explanation, in 3 points:

### 1. The Structure

Ideally, this is one slide. I personally hate architecture diagrams unless I already know a bit about the product. Otherwise, they’re often just a flex to show how complex and intricate the product is... Which is usually true, and I get that developers want to show how hard their job is. But if it’s my first time interacting with the product, complexity doesn’t amaze me. It worries and confuses me.

So, I summarized StoryTeller in 4 boxes and 3 arrows. That’s it. You call the API, retrieve the data, call another API (Optional), retrieve the data (Optional).

[add simple chart]

### 2. How to Interact With It

It’s an API, so the important parts are response times, flexibility, how to query it, and so on. In my explanation, I briefly introduced what will happen when you interact with the system.

Which data to send, what to expect in return, waiting times, how to read logs... Very practical, but not too deep section.

### 3. Common Errors

The majority of stress is coming from invalid inputs. You need to provide specific data to StoryTeller, otherwise the API will not validate it...

And it's not always easy, as I learned when mocking sample data to use for the demo.

Last Friday I was melting because I literally had to put myself in the same place as of a potential customer. The timeseries data I was sending to the API kept giving errors, but because I was forgetting the starting date! Oof, 3 hours lost, because I didn't read my own documentation!

Stories like that can really frustrate an API user, and I made sure to explain the key points to follow. I literally had to put myself in the potential customer shoes, and pointing out the common (but not easy to spot) mistakes was the key priority.

Thanks to this simple structure, I delivered a straightforward introduction, which was very appreciated by the audience! The rest of the time was spent answering to multiple questions about technical details, which I found a great sign. This approach sparked curiosity and interest, and being easy to follow, we managed to dive deep towards the end, when everyone had already understood the base concepts. I wish all calls were like this.