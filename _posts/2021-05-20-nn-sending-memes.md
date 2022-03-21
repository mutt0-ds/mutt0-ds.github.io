---
title: "Using a Neural Network for sending memes to my girlfriend"
date: 2021-05-20
permalink: /posts/2021/05/nn-sending-memes.md/
tags:
  - machine-learning
  - experiments
---

# Using a Neural Network for sending memes to my girlfriend

Well, my GF's tastes in memes are simple: she loves wholesome memes and, most importantly, **she loves animals**.

That's why I created a fun little project that:

1. Surfs the subreddit [r/wholesomemes](https://www.reddit.com/r/wholesomememes/)
2. Downloads a few of the hottest memes in the contents folder
3. Initializes a ResNet50 model that recognizes images containing any animal
4. Sends them via mail to my GF (positively welcomed)

### Final email (3 memes by default)

![finalmail](https://github.com/mutt0-ds/memes-selector/blob/main/media/result.png)

### Reddit

I'm using the praw library for downloading the memes, it requires a Reddit Bot enabled.
Use [this guide](https://yojji.io/blog/how-to-make-a-reddit-bot) for creating one, it's a quick process.

### ResNet50

ResNet50 ([more info here](https://keras.io/api/applications/resnet/)) is an Image Recognition model that outputs a probability score (which I'm ignoring at the moment) and one of the 1000 labels available. The labels are mapped in the imagenet_class_index, and the first 397 are about animals (mostly cats and dogs).
So, if the model's predicted label is in that sublist, we can classify the meme as "containing animals".

![example](https://github.com/mutt0-ds/memes-selector/blob/main/media/example.png)

### Email

I'm using smtplib for sending the email, so it just requires the email and password of the sender and the email of the receiver.

### Code

Source code [here](https://github.com/mutt0-ds/memes-selector)
