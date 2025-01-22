---
title: "How I created my first Course with Datacamp"
date: 2025-01-22
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/datacamp_fabric/datacamp_course.jfif
draft: false
author: "Mutt0-ds"
tags:
  - fabric
  - power-bi
  - writing
  - course
  - datacamp
---

I never imagined I’d say, “I’m a teacher”...
It feels pretty wild, but here I am!

I just published [an online course](https://app.datacamp.com/learn/courses/plan-and-implement-a-data-analytics-environment-with-microsoft-fabric) covering advanced [Microsoft Fabric](https://www.microsoft.com/en-us/microsoft-fabric) topics like security, deployment, admin settings, and version control.

This project kept me busy for months, and I’m really proud of how it turned out. Fabric is way more complex than Power BI. It's a compelte Data Platform with several services, and there’s not much deep content out there for those who want to learn about the technical side. With [my experience in a large organization](https://mutt0-ds.github.io/posts/2024/10/my-talk-about-data-culture/), I was excited to share what I know.

I’m confident this course will help a lot of people, which is why I decided to partner with [Datacamp](https://datacamp.com/).

## Why Datacamp?

I learned to program through an online course, so I know just how powerful interactive platforms can be in changing lives. But with Microsoft Fabric, it’s not just about running simple code. You need a whole sandbox environment with permissions, settings, and data sources. At first, I thought that would be impossible to replicate at scale, but Datacamp figured it out.

They give you **a Fabric account** to manage and build exercises directly within the sandbox. This hands-on approach sets Datacamp apart from other platforms. They also have sandboxes for other tools, like AWS.

<div style="max-width: 2267px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 38.5918%;"><iframe src="//iframely.net/gqY9fsv" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

On top of that, their library of courses is extensive (I even checked out some on [AWS](https://www.datacamp.com/category/aws?page=1) and [dbt](https://app.datacamp.com/learn/courses/introduction-to-dbt), and they’re great). The focus on interactivity, the supportive team, and the creative freedom they gave me to design my course made the experience really enjoyable.

## The Outline

The course is broken into four chapters: Security, Configuration (Admin Portal), Version Control, and Deployment.

The hardest part was structuring it all. **“Plan and Implement a Data Analytics Environment with Microsoft Fabric”** isn’t exactly a catchy topic, so I spent a lot of time figuring out how to make it engaging. I spent the first month brainstorming lessons and exercises, then worked with my Datacamp contact to make sure everything made sense for the audience. The result was the "outline", a document with a description for each item of the course, the list you see in the [Datacamp portal](https://app.datacamp.com/learn/courses/plan-and-implement-a-data-analytics-environment-with-microsoft-fabric).

Finding the right balance was tricky. Exercises that are too easy aren’t helpful, but ones that are too hard can be discouraging. I also had to make sure the material was practical and understandable, which was challenging given how technical Fabric can be.

By the end of that phase, the outline was pretty solid, and we made just a few tweaks as we went.

## Chapter by Chapter

Once the outline was in place, I moved on to creating the slides and exercises. Each chapter had to start with a compelling story. After all, the students are already committing to a very technical course, so I wanted to keep them hooked.

One day, I had an idea to swap the order of the chapters and make security the first topic. I imagined a scenario where you join a company called Fashionbric (a little play on fashion) and are thrown into a security nightmare. That’s how the course kicks off — with an urgent security issue that the student needs to solve.

<div style="max-width: 1466px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 50.3273%;"><iframe src="//iframely.net/JS13pih" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

<div style="max-width: 1476px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 49.1057%;"><iframe src="//iframely.net/OK9CwmQ" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

_tough day at work..._

From there, the course takes the student through a series of challenges: fixing security flaws, optimizing deployment, and learning to use Fabric’s tools more effectively. By the end, they’ll know how to secure Fabric, manage costs, use version control (even in Power BI!), and deploy safely using CI/CD pipelines.

<div style="max-width: 1595px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 49.3604%;"><iframe src="//iframely.net/ayPfOsO" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## How I Built the Course

Datacamp has a tool called Teach, which lets you create both slides and interactive exercises. It’s easy to use with features like automatic saving, git branches, and drag-and-drop for exercises. It’s kind of like a web-based PowerPoint where you can create your slides and lessons in Markdown.

Once the slides were ready, we recorded the voiceover and synced it with the slides. Surprisingly, it only took two days to finish that part.

## The Good

Creating this course was such a rewarding experience. It feels great knowing that it will help others. I built the course I wish I’d had when I first started learning about Fabric.

My Datacamp counterpart was amazing, helping me choose the right exercises and ensuring everything was clear and engaging. The process was smooth with weekly check-ins and a lot of support. We used Asana to stay organized, which worked really well.

## The Bad

There are a couple of things to keep in mind: The Fabric sandbox is limited. It doesn’t have admin settings, so I couldn’t demonstrate some parts of the second chapter. There were also some limitations on interactivity, especially with version control for Power BI and creating Fabric items, which require a Pro license.

I had to get creative with some exercises to make them work within these limitations, but I understand why it’s not possible to replicate a real Fabric istance 100%.

Also, the Teach editor had a few bugs. It crashed a couple of times, and I spent more time than I’d like resizing images and formatting them. I chose to design the charts and images in Figma and uploading my designs, avoiding spending too much time with the tool.

## Conclusion

Overall, this was an amazing experience. It took a few months of hard work, but it was completely worth it. I am grateful to share my knowledge to the world, while learning in the process. It forced me to think about Fabric from a new angle and figure out how to make complex concepts easier to explain.

I’d definitely do it again.

Have questions about the course? Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/davide-muttoni-77b134194/) or send me an [email](mr0lnk6r1@relay.firefox.com). I’d love to hear from you!