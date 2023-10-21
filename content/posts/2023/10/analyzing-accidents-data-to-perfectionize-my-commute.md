---
title: "Finding the Best Time to Go to Work: Now with Car Accidents Data & Power BI Dashboard!"
date: 2023-10-20
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/commute_data/commute_title_v2.jpg
draft: false
author: "Mutt0-ds"
tags:
  - power-bi
  - traffic
  - commute
  - python
  - google-maps
  - data-analysis
---
I want to express my gratitude for the positive feedbacks I received a few months ago when [I used Google Maps data to determine the best times for the daily commute](https://mutt0-ds.github.io/posts/2023/07/analyzing-commute-data-using-google-api/). TL;DR: Mondays are the best, while Wednesdays, and early Fridays are the trickiest times to hit the road.

However, the neatness of this analysis takes a hit when real-world unpredictabilities come into play. Things like heavy traffic, rain, road closures due to accidents, or just that one slow driver in front of you can disrupt even the best-planned routes. So, it's essential to view these explorations as "what if" games. They provide a general framework but can't fully account for the chaos of everyday life.

For a while, I contemplated adding weather data to show how rainy days significantly affect commute times, not to mention snowy days. The problem is, predicting tomorrow's weather is challenging, and my initial hypothesis was already on shaky ground. Empirical evidence reveals anyway that the worse the weather, the worse the commute.

Instead, I decided to explore something more intriguing: car accidents. These are the "[black swans](https://en.wikipedia.org/wiki/Black_swan_theory)" of road trip planning—unexpected events that can ruin your day and disrupt any carefully calculated commute. Unfortunately, we can't predict or prevent them, but by understanding when accidents are more likely, we can at least be more informed. In this analysis, I will focus on my coordinates in the Swiss area, but I'll provide the code on my Github so you can investigate car accident data yourself. The best part? No Google key is required this time.

## 📦 Gathering and Preparing the Data

The most challenging part, I assumed, would be acquiring the data. But to my surprise, the Swiss government offers an [interactive dashboard](https://map.geo.admin.ch/?topic=vu&lang=en&bgLayer=ch.swisstopo.pixelkarte-grau&layers=ch.astra.unfaelle-personenschaeden_alle%2Cch.swisstopo.swissnames3d&layers_timestamp=99990101%2C&E=2652000.00&N=1171625.00&zoom=2&catalogNodes=1318) and a [link](https://data.geo.admin.ch/ch.astra.unfaelle-personenschaeden_alle/) for exporting all the data ([direct download](https://data.geo.admin.ch/ch.astra.unfaelle-personenschaeden_alle/unfaelle-personenschaeden_alle/unfaelle-personenschaeden_alle_2056.csv.zip)). Within minutes, I had a decade's worth of Swiss car accident data downloaded, ready to crunch some numbers.

<div style="max-width: 2303px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 49.4528%;"><iframe src="//iframely.net/LXatZcs" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

The data proved to be relatively clean, featuring columns in French, Italian, German, and English, detailing accident types, road types, weekdays, and hours (though not exact dates for privacy). As a newcomer in this field, my major challenge was deciphering the creators' peculiar method of measuring latitudes and longitudes, which was based on the center on the country rather than as the standard, on the Earth's center of mass. Those Location_CHLV95 fields threw me off at first, but after [some exploration](https://en.wikipedia.org/wiki/EPSG_Geodetic_Parameter_Dataset), I managed to convert the coordinates from [EPSG:2056](https://epsg.io/2056) (the "Swiss" method) to the Standard World Geodetic System, using the [pyproj](https://pypi.org/project/pyproj/) library.

<div style="max-width: 811px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 34.7633%;"><iframe src="//iframely.net/WGcM92d" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

The last steps involved filtering the coordinates to focus only on my commute area, and I was ready to explore the results.

## 📊 A Peek with Power BI

Instead of relying solely on Python's [seaborn](https://seaborn.pydata.org/) for data visualization, I turned to a more potent tool I use in my daily job, Microsoft Power BI (I already wrote about it [here](https://mutt0-ds.github.io/tags/power-bi/)). My first task was to create a map of accidents, color-coded by severity, much like the one on the [Swiss website](https://map.geo.admin.ch/?topic=vu&lang=en&bgLayer=ch.swisstopo.pixelkarte-grau&layers=ch.astra.unfaelle-personenschaeden_alle%2Cch.swisstopo.swissnames3d&layers_timestamp=99990101%2C&E=2652000.00&N=1171625.00&zoom=2&catalogNodes=1318).

<div style="max-width: 1148px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75.5486%;"><iframe src="//iframely.net/f5TLmf2" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

Now, let's delve into the aggregated data (still filtered to my commute area). Surprisingly, the risk of accidents is lowest during the morning, gradually increasing to peak during the evening rush hour. Among the weekdays, Tuesday stands out slightly, though it's a minor fluctuation. As for Mondays, they consistently prove to be the least congested days during my commute. So if you're one of those who despise Mondays, here's a valid reason to find joy: it's the safest weekday!

<div style="max-width: 1218px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 65.8128%;"><iframe src="//iframely.net/C85NqI5" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

But my data spans over the past 11 years, and many changes have occurred on our roads during that time. If we consider only the post-COVID years, the trend appears more random. It seems that the data isn't sufficient for drawing precise conclusions. Mondays continue to show fewer accidents, though, offering some statistical redemption for the most loathed day of the week.

<div style="max-width: 1225px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 65.6219%;"><iframe src="//iframely.net/5AzUYTE" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

Speaking of recent years, let's conclude the analysis with an encouraging chart: the trend over the years. Since 2010, car accidents on both my commute route and the entire region have decreased by half. This indicates not only safer roads but also saved lives, a result of (my guess) a combination of stricter speed limits, advancements in automotive safety, and increased awareness of road safety issues. It's truly heartening news.

<div style="max-width: 1236px;"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 64.7573%;"><iframe src="//iframely.net/WI0fLpr" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

## 🤔 Final Thoughts

- My updated analysis reaffirms that Mondays are statistically better for commuting, and avoiding peak hours whenever possible is obviously a wise choice, both mentally and phisically speaking.
- Focusing on the most recent years, the risk of accidents appears random and challenging to predict on a day-to-day basis. However, accidents are notably more likely during the evening rush hour, around 6 PM (+100% risk increase).
- My assumption that people are sleepier in the morning, increasing the risk of accidents, doesn't hold up in this data.
- The gradual decrease in car accidents over the years is excellent news for all commuters.

With this update, I can better assess the safety of each day and make informed decisions, like avoiding working from home on Mondays. It was a rewarding experience delving into the Swiss dataset, and I hope that these findings will contribute to improving road safety and security in our country. Let's see if I can unearth more data to refine my analysis further!
