---
title: The Phoenix Project
author: Gene Kim
image: https://m.media-amazon.com/images/I/914-sUgELZL._AC_UF1000,1000_QL80_.jpg
badges:
- "💼 Work"
- "💻 IT"
score: "⭐⭐⭐⭐⭐"
finished: '2023-06-04'
summary: "Speed up deploys, collect feedback quickly, use those insights to improve. DevOps foundation: CI/CD! 🌟"
showInHome: false
---

Recommended on Reddit as a DevOps book, it is told as a story so I expected it to be enjoyable. 

Feedback: fantastic book, especially because it was written 10 years ago when DevOps did not have today's tools, and the style is compelling. It pulled me along chapter by chapter as the protagonist fixed the chaos he was in. I noticed that Dev would be us, Ops not only the business but the BSA itself. It taught me how a VP thinks and the political battles they face. I related a lot; Brent reminded me of a colleague; the Phoenix project going off the rails, CI/CD principles... The ending is a bit forced, with every problem solved, he becomes COO right away, the CEO turns very friendly and Sarah gets fired, but oh well. Maybe one day something similar will happen to me and this will serve as a guide.

The key was that it made me identify with it, it introduced technical concepts very gradually and simply, almost like a philosophical book. Here are the key points, which are not as critical now with DevOps everywhere, but some hit me hard with "aha" moments.

## Notes

- Teams do not communicate, which causes errors and stepping on toes -> create a transparent, visible task kanban
- Brent was always the bottleneck; one experiment was -> a task force of people similar to him to learn, and to let him focus on essential projects
- An IT company is like a factory -> WIP projects slow everything down and do not deliver the product: we need to speed up production deploys as much as possible (lean)
- (Aha moment here) The first thing Bill asked for was an overview of who does what and which projects each person is on, to see how to organize resources. 
- The security transformation is interesting, from obstructionist to perfectly integrated. I liked how they restarted from the key stakeholders and their needs
- Two questions: what is a bad day for you? What is a good day for you? If you had a magic wand what would you do?
- There are 4 types of work: primary work (Phoenix), internal work (monitoring system), changes (bug fixes), and unplanned work, such as fixing outages and issues. The last category was ruining everything, and it has priority because it blocks everything else. Not only that, it must be avoided with preventive measures
- Work on one WIP at a time with maximum focus, not lots of chaotic stuff
- TOC -> Theory of Constraints (Brent). You must constantly figure out what the bottleneck is and remove it to optimize flow. In the book they pause internal projects that the business pushes for a couple of weeks to free up Brent
- Note: they work a bit too much at night; that would not be sustainable for me

Eric the mentor's Three Ways, the book's core:
  1. The First Way: Continuously find and implement ways to improve delivery.
  2. The Second Way: Get fast feedback and work from strong failure signals to ever-weaker failure signals to get advance warning of quality issues.
  3. The Third Way: Use the efficiencies gained in the First Way and the safety enforced by the Second Way to introduce rapid experiments that help create qualitative gains.

> Speed up deploys, collect feedback quickly, use that insight to fix things. CI/CD! 🌟