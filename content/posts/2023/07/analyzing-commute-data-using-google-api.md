---
title: "Analyzing My Commute Data to Find the Best Time to Go to Work"
date: 2023-07-07
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/commute_data/commute_title.jpg
draft: false
author: "Mutt0-ds"
tags:
  - gcp
  - traffic
  - commute
  - python
  - google-distance-matrix
  - google-maps
  - data-analysis
---
When my commute buddy and I find ourselves stuck in traffic during our car journeys, we often daydream about finding the ideal route and **the optimal time** to leave the office in order to avoid these uncomfortable situations. Now, thanks to the power of technology and the inspiration I drew from [a fantastic article by @hishamsajid113](https://medium.com/@hishamsajid113/using-google-distance-matrix-api-to-reduce-commute-time-b17a0b9b0fbe), I am finally able to back up my theories about the best departure times from home and simulate with real data!

Fortunately, I have the flexibility to adjust my work hours within a predefined availability window. This allows us to save precious time and undoubtedly benefit our mental well-being by avoiding stressful experiences on the road.

## Gathering the Data

When using [Google Maps](https://www.google.com/maps/) to check the estimated time of arrival, there is a query sent to the [**Google Distance Matrix API**](https://developers.google.com/maps/documentation/distance-matrix/overview) behind the scenes. This API provides the predicted arrival time based on complex algorithms that consider average traffic conditions in the area and data collected from other vehicles, satellites and devices. In my experience, this information is usually quite reliable, except for unforeseen incidents such as car accidents or roadworks. To access the API, you need to sign up for the Google Cloud Platform ([tutorial](https://www.youtube.com/watch?v=cIGCh8J9AfA)), and its free plan is generous enough for my small experiment, which involves fewer than 1000 API calls.

<div style="max-width: 4126px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 59.5113%;"><iframe src="//iframely.net/OJQiZpH" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

In my fabulous script, I generated a sequence of 5-minute intervals representing different departure times from home in the morning (6AM - 10AM) and from the office in the evening (4PM - 8PM). I then made multiple API calls using the coordinates of my home and workplace as parameters for each time segment in the simulation. I analyzed the traffic predictions provided by Google Maps for each departure time to understand the expected conditions I would encounter.

You can find [the code on Github](https://github.com/mutt0-ds/commute-analysis), but please note that you will need an API key for the Google Distance Matrix API and the coordinates of your home and office if you want to use it for your own analysis.

## Key Findings

The results of my analysis were mostly in line with my empirical experiences, but it feels satisfying to have concrete numbers to work with. Here are my charts and takeaways from the analysis:

## Morning Commute

<div style="max-width: 2561px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 46.8135%;"><iframe src="//iframely.net/rzXtwOl" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

- It's important to remember that these results are influenced by the current summer period, during which schools are closed and traffic is less intense, particularly in the morning hours. I will update the results in a few months to capture any changes.
- Even when leaving at 6:45 AM, **we still encounter heavy traffic** as we reach the office area around 7:30 AM, where congestion is concentrated. Leaving home earlier doesn't provide significant time-saving advantages.
- Friday (when many people work from home) and Thursday are the best days in terms of commute time.
- Departing at 8 AM (our current standard hour) is a good compromise and better than I initially thought.

## Evening Commute

<div style="max-width: 2561px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 46.8135%;"><iframe src="//iframely.net/OYrcVkj" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

- Leaving at 5:30 PM, as I sometimes did when in a hurry, falls right in the worst traffic period. What a great idea!
- After the peak at 5:30 PM, commute times gradually decrease. The later you leave, the better, but the impact is not substantial. From 6:30 PM onwards, it becomes more manageable.
- In the evening, Friday becomes the worst day to commute before 5 PM (as more people are heading out for the weekend, especially in July). Monday is relatively calmer, which is good news.
- **Wednesday consistently proves to be the worst day for commuting** in both morning and evening data. So when my commuting buddy claims that Wednesday is a cursed day, we now have some scientific data to back up that statement.

Bonus: adding Saturday and Sunday to see the impact traffic has compared to "normal" working days. It adds from 20 to 30 minutes to the total time!

<div style="max-width: 2561px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 46.8135%;"><iframe src="//iframely.net/DpOHXfk" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## Conclusions

Let's face it, nobody enjoys being stuck in traffic. I am grateful to have the opportunity to work from home and, on the other commuting days, to have flexible hours that allow me to avoid the worst traffic moments when heading to the office. Thanks to the data provided by Google Maps, I now have a general framework of the best and worst time frames for my travels, keeping in mind that accidents and roadworks can always disrupt plans at the last minute. And most importantly, I can confirm that Wednesday is indeed the worst day for my particular commuting situation.