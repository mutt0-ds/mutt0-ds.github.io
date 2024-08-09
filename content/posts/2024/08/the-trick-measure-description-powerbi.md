---
title: "The Pro Trick for Measure Descriptions in Power BI"
date: 2024-08-09
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/power_bi_description/title.jpg
draft: false
author: "Mutt0-ds"
tags:
  - power-bi
  - description
  - c-sharp
  - tabular-editor
  - dax
---

# "How does this MEASURE/COLUMN work?"

This is one of the most frequent requests I was receiving. And it's easy to see why.

In complex Power BI models, users often struggle to understand the meaning of specific measures or columns. This is especially true for ambiguous names like `AMSLast12m` or columns with deep business logic such as `NetAmount`. How is it calculated? With VAT? Without it? Help!

Traditionally, there were limited options: ask a colleague, guess the logic, search documentation, or simply try your luck and add it blindly to the report. None of these are ideal solutions, particularly for those new to report creation.

Fortunately, Power BI offers a simple solution to this problem: **descriptions**.

<div style="max-width: 587px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 61.7587%;"><iframe src="//iframely.net/eaZhZoY" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

Descriptions appear when hovering with the mouse the item’s name: they provide valuable information to report creators. It’s simple, clear and intuitive.
However, manually writing their definitions for hundreds of items is time-consuming and often overlooked. That’s why we found a way to automate it!

# Our automated solution

We use a [Tabular Editor](https://www.sqlbi.com/tools/tabular-editor/) script in C# to automatically copy the DAX code into the Description field for all measures and calculated columns. The code is usually sufficient to provide the necessary context. For more complex cases, we include in the code detailed comments and ticket IDs to provide full context.

Here's an example of one of our "simple" measures and a more complex one:

<div style="max-width: 742px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 16.0194%;"><iframe src="//iframely.net/ONxNJrf" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

<div style="max-width: 740px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 40.5186%;"><iframe src="//iframely.net/cqhDZ2O" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

As you can see, in the second example I've also included the ticket ID for future reference.

# How to run the script

Download Tabular Editor and connect it to Power BI. You can follow this tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/qbIlSVHhXs4?si=vLwfcjrdTiriiAYp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Before saving your model, run the script below that copies the DAX code into the descriptions for all measures and calculated columns.

```csharp
%% This copies the DAX code in Calculated Columns descriptions %%
foreach (var m in Model.AllColumns)
  { if (m.Type.ToString() == "Calculated") {
    var y = m as CalculatedColumn;
    y.Description = y.Expression.ToString();
    }
  }

%% This copies the DAX code in Measures descriptions %%
foreach (var m in Model.AllMeasures) {
    m.Description = m.Expression;
  }
```

(Alternative solution for pro users only)

With the new TMDL format for Power BI datasets, it's possible to copy the description before the definition in the raw files.
This process can potentially be implemented in a DevOps pipeline to run automatically before each upload!

<div style="max-width: 1903px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 35.8764%;"><iframe src="//iframely.net/AEoeJtS" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## The advantages

The immediate takeaway is that describing the models is now simple, quick and scalable.
It saves precious dev time in avoiding writing and maintaining hundreds of descriptions.
It saves time for users and report creators that can rapidly find an answer to the majority of their questions.

It enhances transparency and trust in the data: now everyone have a general understanding of how the report is working.

And my favorite part: the learning opportunity it provides.
Users can read the DAX code, spot inconsistencies, and gradually learn how the language works.

Some advanced users have even started including working DAX code in their requests! We are creating monsters...

## But AI will solve thi- Well, no

You may be thinking: this boring task can be delegated to AI! Indeed, Microsoft offers a solution called ["Use Copilot to Create Measure Description."](<[“Use Copilot to Create Measure Description”](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-measure-copilot-descriptions)>)

<div style="max-width: 1439px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 52.2936%;"><iframe src="//iframely.net/JJZGhsO" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

However, it has some notable drawbacks:

1. It requires an advanced plan. You need a [F64 or P1 capacity with Copilot enabled](https://azure.microsoft.com/en-us/pricing/details/microsoft-fabric/), costing at least $8,000 per month
2. As it happens with most AI demos, it works well with simple formulas like "Orders," but struggles with complex ones. It lacks the full context of your Power BI report and often resolves to vague answers or hallucinations
3. It's not easily scalable. You have to click for each formula, wait, check for hallucinations and confirm

## But AI will solve thi- Well, if you really want to

If you really want to use AI, I recommend [this amazing post by Darren Gosbell](https://darren.gosbell.com/2023/02/automatically-generating-measure-descriptions-for-power-bi-and-analysis-services-with-chatgpt-and-tabular-editor/) for automatically generating measure descriptions with OpenAI:

<div style="max-width: 708px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 57.1186%;"><iframe src="//iframely.net/Z7O7vWF" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

He presents an excellent tradeoff, with the Description containing both code and AI explanations. But it has its own challenges:

1. It can be slow, taking several minutes depending on your model size and API plan
2. You need advanced C# skills to customize the code. For example, I tried to limit the API calls to describe only measures that have changed. Then, exception handling… It required a long time as I’m not familiar with the language. Tabular Editor is not made for complex programming
3. AI can still make mistakes or give vague answers, like Copilot
4. You still need to manually check all the measures afterwards to spot hallucinations.

These issues led us to stick with our simpler, code-based method. It's consistent, scalable, and accurate without the added complexity of AI.
As we say: "Code never lies"

## Conclusions

This method of automatically copying DAX code into descriptions offers a simple, efficient way to improve your Power BI models. It provides transparency, saves time, and helps users understand the data they're working with.

I hope you find this approach helpful! Are you using other scripts to enhance your models? Let me know.
