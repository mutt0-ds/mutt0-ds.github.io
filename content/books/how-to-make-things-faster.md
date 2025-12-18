---
title: How to Make Things Faster
author: Cary Millsap
image: https://learning.oreilly.com/library/cover/9781098147051/250w/
badges:
- "💻 IT"
- "📢 Communication"
score: "⭐️⭐️⭐️⭐️⭐️"
finished: '2025-09-16'
summary: "Optimization is often more political than technical"
showInHome: false
---
Recommended [here](https://www.reddit.com/r/ExperiencedDevs/comments/1ly5wat/books_not_on_software_engineering_that_you_found/). Great. Great. Great. It's one of those books that surprises you, exceeding expectations in an incredible way. Instead of boring me with Oracle technical details (which are briefly touched on) Cary talks about how to communicate, understand the problem, and optimize it. A must-have treatise for all consultants, a work of art in problem solving. Much appreciated. It's also well written, with many instructive stories, a tight pace, and simplified technical passages for a very pleasant read.

## Notes

- 🔑 Optimization is more a political problem than a technical one. And it's curious that optimization books are mostly technical. This one won't be. In fact, he knew the technical solutions and they were always the same (some parameter to set or a query to optimize); that wasn't what made him good.
- His consulting process was 1. Listen, 2. Stay calm, 3. Convince them you have the solution, 4. Treat it.
- 🔑 There is no shame in saying "I don't know, but I can help you find out".
- 🔑 Technical people rarely bother visiting users. You need to put yourself in their shoes and learn to talk with your users.
- The best case is when the user already has a list of grievances, problems to solve, with priorities attached. You don't waste time doing it yourself; the more you discuss it, the more time you waste.
- Trace, trace, trace. Trace and monitor everything to identify errors.
- R Method. R stands for response time.
  - List the symptoms for which the business is asking for help
  - Sort the list by priority
  - For each symptom: observe it, find the cause, treat the cause
- The symptom must be reproducible: for a slowness problem it's easy, run the program and trace it.
- 🔑 Quantity * price (tomatoes example). For a program quantity * resources. Either reduce one (call something fewer times) or the other (reduce how much time/resources it consumes) and you solve the problem. Remember there are two paths you can take.
- 🔑 Filter Early. Many problems come from a query that fetches everything and filters later. No. Filter first and then fetch the results.
- To optimize even better, ask how the program is actually used, by whom, and when. Maybe you can remove the program altogether.
- 🔑 Tow-Millsap law: No human ever wants to see more than ten rows. Ask if it can be aggregated above those ten rows.
- Look at the entire user experience to evaluate the system, not just isolated internal metrics.
- Skew: there is always some skew between parts; metrics like the average don't tell the full story.
- 🔑 Always investigate the part of the trace with the most skew, or the one that is most "odd" compared to the average. This is why you want a lot of granularity in your trace.
- Great story of him in a bathroom in Detroit seeing reams of paper thrown away; he asked why and optimized a report that was printing exponentially. Be curious and ask questions.
- The profile is useful because it quickly answers your most important questions
  1. How long? How long did the program take to run
  2. Why? Why did it take so long? Remember, quantity or resources
  3. What if? You can predict what will happen once you fix one part
  4. What else? After the fix, a profile can monitor that you actually resolved the symptoms
- Shorten your feedback loop. If you have doubts, ask and get quick feedback instead of wasting time.
- The best way to improve your forecasts is by forecasting, in practice.
- To remove latency a program does different things in parallel while waiting for others, like chopping vegetables while the water boils.
- Percentile specification is very useful in a contract: the average matters little if one out of ten runs takes an extra hour. You want the number of executions above the threshold (top 1% percentile) to be low.
- Testing to destruction: understand what will make your idea fail; if you can't, find smart people who will. Don't spend a year only on the easy things; tackle the hard ones with courage.
- Work in short, fast iterations and keep your feedback loop.
- Another political trick (there is an entire chapter on it, which I appreciated): the Jeweler's Method. Let someone see and try on a solution (a demo), then tell them that if they want it, they need to pay or convince someone to help. It is much stronger than vague promises.
- 🔑 Getting people to do the right thing is almost always the hardest part of a project.
- Often there are factors you can't control for your success. Don't be scared of that. Keep the serenity to accept what you can't change, and change what you can. Don't. Quit.