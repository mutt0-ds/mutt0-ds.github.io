---
title: "Ontologies: yet another data platform"
date: 2026-09-30
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/ontology_primer/title.webp
draft: false
author: "Davide Muttoni"
tags:
  - ai
  - ontology
  - data-engineering
  - palantir
  - fabric
  - knowledge-graph
---

I've been working on **ontologies** for a large part of this year and, wow, it's such a complex topic, and so full of buzzwords, that I'm writing this post to put some order in my thoughts.

[Palantir](https://www.youtube.com/watch?v=KipDBa4bTl8) is clearly the company that made them famous, together with the other big consultancy groups that are pushing ontologies as an easy way to feed context to LLMs, automate your entire business, be 100x more proactive and, you know, the whole dream. History keeps repeating: before, it was data warehouses. Then, data lakes. Then, [lakehouses](https://www.databricks.com/blog/what-is-data-lakehouse). Now, ontologies.

You know that [I like simplicity](https://mutto.fyi/posts/2025/03/first-pitch/). So, what's an ontology?

In its bare-bones meaning, it's a representation of your business that holds more than data: it holds **relationships**. Sort of a **second brain** (which I've already mentioned [several](https://mutto.fyi/posts/2026/09/second-brain-in-ai-era/) [times](https://mutto.fyi/posts/2023/02/obsidian-productivity-second-brain/)). Or, for the Power BI experts out there, a collection of [your semantic models](https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-understand).

The idea is that once your data is neatly organized, interconnected and explained, AI agents and human analysts can work on it together and create value. And by value I mean more than dashboards: entire systems and applications.

![Basic ontology example](/images/ontology_primer/airline-ontology.png)

_Basic ontology example. Credits: Palantir_

## But there is so much more...

The vendors sprinkled a lot on top of that idea: pipelines, catalogs, permissions, dashboards, AI agents. So an ontology is really the **data ecosystem of your business**, a knowledge base plus all the tools to work with it. Both [Microsoft Fabric](https://www.microsoft.com/en-us/microsoft-fabric) and [Palantir Foundry](https://www.palantir.com/platforms/foundry/) aim to be the "AWS" for your data, which makes sense: this all-in-one model has already proved effective (see Databricks, for example).

The dream you get sold is: **install the software, dump all your data in, and everything gets organized** into an ontology with a catalog, links, and all the bells and whistles. The pitch got much stronger in the AI era, because AI now simplifies A LOT of the work that used to make these complex models impractical to build. For the rest, there are [FDEs (Forward Deployed Engineers)](https://en.wikipedia.org/wiki/Forward_deployed_engineer), conveniently offered by the vendors to help you onboard and manage the platform.

On paper, this is something I find exciting. **Most business issues are data issues**, and having your business organized in an ontology may unlock interesting possibilies, like advanced reporting, autonomous AI analysts, even full applications and data flows.

![Representation of an ontology](/images/ontology_primer/ontology-system.png)

_Representation of an ontology. Credits: Palantir_


## Yet another data platform?

Here are my two cents, based on my personal experience.
While building ontologies (not in big companies, where I know the scale is different), **I noticed that nothing has changed in the basics**. I still needed the equivalent of a data warehouse to store the tables behind the objects, and pipelines to move data, execute functions and update schemas. On top of that came the UI tools for dashboards and reports, plus policies and observability.

![Ontology in Palantir](/images/ontology_primer/ontology.png)

_Ontology in Palantir. Looks suspiciously familiar... Credits: Orzen_

![Basic Power BI semantic model](/images/ontology_primer/power-bi.png)

_Basic Power BI Semantic model_

So yes, **it's yet another data platform, better marketed**.

## So, what's my view?

As I said, I like simplicity.
In short, ontologies are nothing terribly new, but still worth a look, depending on your use case. Some useful resources are [here](https://www.palantir.com/docs/foundry/ontology/overview/) and [there](https://www.youtube.com/watch?v=S_i5l4mpj1I).

What really changed is the AI side of it. AI navigates a graph more efficiently than a collection of hundreds of tables, for the same reason [graph memory works so well for agents](https://mutto.fyi/posts/2026/05/long-term-memory/). And with modern [tools](https://www.linkedin.com/posts/juansequeda_databricks-announced-genie-ontology-they-share-7472704286846545920-Jf8B/), building an ontology is much easier than it used to be.

This will likely disrupt data platforms for small businesses. They usually have fewer than 100 tables, and they can really benefit from a neater graph structure, sort of a business-wide Obsidian vault.

![An Obsidian vault](/images/obsidian/obsidian_graph.png)

_An obsidian vault_

Big companies with complex data systems are a different story, and I'm curious to see how the ontology will work out there. 
It works for Palantir because they partner with massive clients and their FDEs do the heavy lifting during onboarding. 
But these **companies also have plenty of sparse data** that nobody knows how to use yet. There, data lakes and simple storage are the right choice, and I don't see why you'd need a neatly structured ontology... yet. That's probably why Foundry has grown into a complete data platform, with services for exactly those cases. Ontologies can become extremely complicated.

Overall, **keep an eye on ontologies**. I wouldn't be surprised to see more tools offering ontologies for small businesses, a plug-and-play Fabric for example. Or maybe Obsidian will launch its corporate side gig...
