---
title: "First time with Tailwind CSS: showing off my books!"
date: 2022-06-21
permalink: /posts/2022/06/my-books-tailwind.md/
tags:
  - tailwind
  - angular
  - typescript
  - books
---

I'm back for another post, this time about my new chapter in my journey towards learning Full-Stack web development!

In the previous months I started using Angular and Typescript for creating some small web apps and dashboard, but I always found CSS management cumbersome. I could spend hours tweaking font-size and align-items parameters and hard-coding variables, and this wasn't a lot of fun.

That's until I discovered Tailwind, which is heavily recommended by the frontend community! I decided to set up a toy project to learn it, and... Wow! It was so simple, yet so effective!

## 📊 The Dashboard

I deployed [a live demo on Netlify](https://my-personal-library.netlify.app/), while if you are interested in the code, the public repository is [here](https://github.com/mutt0-ds/my-books-tailwind).

![demo](https://raw.githubusercontent.com/mutt0-ds/my-books-tailwind/main/src/assets/demo.gif)

![book](https://github.com/mutt0-ds/my-books-tailwind/blob/main/src/assets/selected-book.png?raw=true)

## 📚 The Dataset: My Books

For my experiment, I wanted to create something unique, not clones of existing websites or basic pages. Since I'm already monitoring the books I'm reading on a Notion Database, I exported the data from the past two years and used it as a small dataset.
I would have liked to include my detailed notes, but since I write them only for personal use they often are in an embarrassing hybrid of Italo-English which will take too long for a complete translation.
For now, I just sticked with Rating (1-5 ⭐), Brief Recap (a couple of lines
I write for quickly presenting the book), Category, Author, Title and Date.

![DB](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/notion-db-books.png)

## 📦 Angular + tilt.js

The project has been created using the [Angular CLI](https://angular.io/cli), and I kept it really simple: there are 3 components.

1. The header, where the user can filter the category of the books
2. The sidebar, for selecting the books
3. The book component, showing the Book Card.

The most complex part, because I somehow managed to overcomplicate things, was to read and clean the data from the Notion export. It was just a small CSV, but as I said my notes were a bit messy so I cleaned them directly after the import.

I also wanted to have fun with a nice little library called [vanilla-tilt.js](https://github.com/micku7zu/vanilla-tilt.js), which gives that modern tilting effect to the Book Card.

## 🌬 But why Tailwind?

I started with the header and I immediately loved the easiness of Tailwind:

```html
<div
  class="sticky top-0 left-0 h-12 md:h-16 w-screen bg-gray-200 shadow-lg z-10"
>
  <div class="max-w-xl flex flex-row">
    <h1
      class="flex items-center mx-5 md:text-xl text-sm text-blue-500 font-extrabold"
    >
      Davide's Library
    </h1>
  </div>
</div>
```

If you aren't used to Tailwind's unique paradigm, this may look messy. But in three lines the header was ready. Every class represented a CSS properties: for example I wanted the header to be sticky at the top, so I gave it the 'sticky', 'top: 0', 'left: 0' CSS properties using Tailwind classes. It's very intuitive.

I also didn't waste time with shadows setting: I applied the beautiful 'shadow-lg' class and everything was ready.

If you were wondering, 'bg-gray-200' and 'text-blue-500' are properties for defining the colors of the background and the text, using a default palette by Tailwind, which I could configure in the settings.

In the first hour I was a bit scared to create a monster with several lines of classes in my code, but in the end I found so useful to have HTML and CSS together in a single file. Everything is more intuitive, and I didn't even have to tweak many Tailwind settings, except for a couple of animations I wanted to use. The default ones are already enough for such a simple site.

It's better for readability (in the long run!), way quicker than classic CSS and perfectly integrated with VS Code's Intellisense. Tailwind is a great tool and I can see why so many developers are recommending it.

## 📱 Mobile Responsive you say?

I quickly deployed the dashboard using the [Netlify CLI](https://www.netlify.com/blog/2019/09/23/first-steps-using-netlify-and-angular/) and, excited, I sent it via Whatsapp to a friend.

## Conclusions

TODO
