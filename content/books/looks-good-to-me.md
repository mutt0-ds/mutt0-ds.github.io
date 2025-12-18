---
title: Looks Good to Me
author: Adrienne Braganza
image: https://images.manning.com/360/480/resize/book/0/faee912-c3e7-4842-ae02-e076c16ce2f6/Braganza-HI.png
badges:
- "💻 IT"
score: "⭐⭐⭐"
finished: '2025-05-03'
summary: "You are not your code. A code review is meant to achieve shared code quality for everyone's benefit"
showInHome: false
---

Book on code reviews, useful since I will be doing many. Recommended on Reddit in a thread on this year's technical books. Nothing groundbreaking; it goes into detail and is a good introduction from zero, but many of the typical pain points are addressed by solid CI/CD, which we fortunately have. A few communication tips and process suggestions for a good experience. The author is good; it is well written and simple.

## Notes

- What is a code review? It is a process developers use to inspect each other's code, confirming it meets a set of standards.
- Pros: they confirm standards, act as a record, a document of the rules and checks to follow. Also, the team learns by discussing code.
- The MR title is the elevator pitch of your proposal. It should explain clearly and simply what it does and give the reviewer context. The better you do it, the easier the experience. Use conventional commit prefixes.
- Nice to have: leave a way for the reviewer to reproduce the problem so they can verify that you fixed it.
- Leave your ego out of the review. Ignore titles, relationships, and more. Examine the code impartially.
- Anticipate the questions the reviewer may ask by adding descriptions.
- YOU ARE NOT YOUR CODE. A CODE REVIEW IS IMPARTIAL AND FOR THE COMMON GOOD
- Focus on automation: reduce the low-hanging fruit. Automation cuts a large part of the time and feedback you might get from the reviewer.
  - Linter: use an automated one
  - Same for the formatter
- The team's goal is to balance maintainable, secure, readable code with smooth development, avoiding blocks or minor updates. It is a speed-quality tradeoff.
- Nitpicks should be labeled; they are nice-to-haves to consider later. They should not block you.
- Developers are much more susceptible to change when a robot yells at them rather than another human. It takes out any subjectivity and frees up human cycles, which allows us to focus on what matters.
- CODEOWNERS is useful to notify code owners when you touch something specific.
- Be clear when you leave a comment that requires the recipient to do something; it must be actionable.
- Comment types:
  - needs change: small changes resolvable in a single commit, block the PR.
  - needs rework: large changes or refactoring, often require discussion, block the PR.
  - align: valid changes but not aligned with team standards, block the PR.
  - levelup: useful but not urgent suggestions, do not block the PR.
  - nitpick: subjective comments irrelevant to the code, avoidable and non-blocking.
- For feedback: Triple-R. Request (what to do), Rationale (why), Result (what you expect).
- Do not use "you" (too aggressive); prefer "we".
- Bad: "Use a Boden mug for my latte", good: "Could you use a Boden mug for my latte?"
- If you find good code, say it. Compliments help.
- You need a document with processes, especially the emergency one (when you can skip the review; it should be exceptional). Emergency Playbook is very interesting.
- Typical problems: bottleneck of a single senior who can approve -> Delegate. Minor ones can be approved by someone else, or include others to discuss together.
- By automating the small things and stating the request clearly, a review can move relatively quickly. Better to keep them small; otherwise they are hard to manage.
- Pair programming is good, but it cannot replace code reviews.
- Overall, the takeaway is: no code review means no audit trail.
- AI is here to stay and can help. You can see assistants in code reviews like CodeRabbit, but for now you need context and expert supervision to understand the nuances.