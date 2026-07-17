---
title: "My surreal experience with COBOL"
date: 2022-09-05
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/meme_cobol.jpg
draft: false
author: "Mutt0-ds"
tags:
  - cobol
  - learning
  - ibm
  - finance
---

I was feeling curious... So, I decided to challenge myself and try to learn a bit more about ***CO**mmon **B**usiness-**O**riented **L**anguage* aka [COBOL](https://en.wikipedia.org/wiki/COBOL), invented in 1959 by IBM. It’s not the most popular among programmers, being extremely old and with huge limitations compared to today’s modern languages... Yet, as we will see, it’s still alive, hidden in huge legacy codebases in the form of spaghetti code and difficult to get rid of without  an entire system redesign.

Especially in the banking sector, this is a delicate topic because 3 trillion $ depend on COBOL code (95% of ATMs and 80% of all in-person credit card transaction are using it, [Reuters says](http://fingfx.thomsonreuters.com/gfx/rngs/USA-BANKS-COBOL/010040KH18J/)), and few programmers want to mess up with something so critically important that’s still working reliably.

I also recommend [this brief introduction in 100 seconds](https://www.youtube.com/watch?v=7d7-etf-wNI) if you are looking for a quick recap.

Managing legacy code of half a century ago is not my dream, but maybe, I thought, there's something to learn from it! That's why I'm here, sharing notes and personal thoughts about my overall experience with [IBM's COBOL course for VS Code](https://www.ibm.com/blogs/ibm-training/free-course-announcing-learning-cobol-programming-with-vscode/) and this detailed tutorial by Derek Banas that saved me several times.

<iframe width="560" height="315" src="https://www.youtube.com/embed/TBs7HXI76yU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## COBOL's essentials
The first impression isn't great, since it's such verbose language... Let's compare a“Hello World" in Python, JS, and COBOL:

```
# 🐍 Python
print('Hello World')

# 👩‍💻 Javascript
console.log('Hello World')

# 😯 COBOL
000001 IDENTIFICATION DIVISION.
000002 PROGRAM-ID.     HELLOWORLD.
000003 ENVIRONMENT DIVISION.
000004 CONFIGURATION SECTION.
000005 DATA DIVISION.
000006 PROCEDURE DIVISION.
000007
000008     DISPLAY 'HELLO WORLD.'.
000009     STOP RUN.
```

The line numbers and the indentation are peculiar because back in the day the code was written on physical punch cards!
Also, all the variables are global and have to be defined at the beginning of the code, in the WORKING-STORAGE SECTION. Since module imports are cumbersome, there's a tendency of writing programs in monolithic blocks with so many declarations that finding unique names becomes a big issue.

~~In addition, [before 2002, COBOL didn’t support comments](https://stackoverflow.com/a/17616222). Imagine working on a codebase of 50 years ago, with millions of dollars depending on it, thousands of variables, and no way to understand who, why and how someone made that choice in the 60s.~~ (UPDATE: [that's wrong, the presence of comments is mentioned in older textbooks](https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook106.pdf))

Despite its flaws, COBOL remains an easy language to learn and read, since it targets non-technical people by using English statements similar to SQL. It’s extremely stable and precise, thus its longevity. 

## How to setup a COBOL environment
At first, I laughed hard at Visual Studio Code displaying the punch card lines on the screen, but then the difficulties began when installing the compiler.

Luckily the Derek Banas video and [this blog post](https://www.it-cooking.com/projects/how-to-install-gnucobol-for-cygwin/) contain a step-by-step installation guide. I’ll leave you to them if you are really willing to follow my path, I want to keep the post lightweight. It was quite a complex process, luckily everything was well documented.

In short, I had to install on my Windows machine:
- [cygwin](https://www.cygwin.com/), a sort of Linux distro on Windows
- [GNUCOBOL](https://gnucobol.sourceforge.io/), the compiler
- **ALL** the libraries listed in [the tutorial](https://www.it-cooking.com/projects/how-to-install-gnucobol-for-cygwin/)

Then I ran the `.configure` script and waited for the completion (around 20 minutes). After that, I pasted the Hello World code of the previous paragraph into a hello.cob file and typed on cygwin `cobc -x hello.cob && ./hello` to compile the code in a .exe and execute it.

## What I did
I mostly messed around with COBOL’s basic commands, created some tables, an interactive menu, performed calculations and logical operations. 

You can find a folder with my experiments [here](https://github.com/mutt0-ds/cobol-experiments), most of them are taken from the Derek Banas tutorial. 

After having coded a bit, I tackled [IBM’s course](https://www.ibm.com/blogs/ibm-training/free-course-announcing-learning-cobol-programming-with-vscode/), which is not very long (16 hours, in theory, it took me way less to finish it because I already knew the basics) and adds some details about the different parts of a COBOL program, the differences between some versions and some simple patterns. 

## My takeaways
- With COBOL, creating long spaghetti code is extremely easy and often unavoidable. It’s not an OOP, all the variables are global, loops and functions are extremely verbose, and importing other modules is not so easy.
- It’s also very clear and stable, and a non-technical person can easily read the code and figure out what it does.
- I can see why COBOL has been the standard for ATMs all over the world: it’s very powerful for making calculations, building reports and simple interactive menus to display on the terminal as an ATM does. 
- There are several sections, for example for defining the data, the environment, the variables and then the process.
- The most annoying detail for me is that you have to define in advance (in the WORKING-STORAGE SECTION) the type and the size of the global variables you are going to use. If, for example, a string is longer than the N characters you’ve assigned to its variable, well screw you, it will be truncated. If it’s shorter, then COBOL will add a bunch of spaces before it.
- Also, arrays start at 1. So weird!
- I read that [COBOL programmers are well paid because there’s a scarcity of them](https://www.hackerrank.com/blog/the-inevitable-return-of-cobol/), but be aware: learning the language is simple, what companies are looking for is someone willing to maintain such a cumbersome legacy codebase, with the ability to understand its complexities.
- The stability and the rigidity of the language are evident, I can see why it’s so difficult to replace without adding bugs, especially on mathematical operations.

## What have I learned?
Studying COBOL has certainly opened my eyes to how much technology has evolved during the years, but at the same time, I am fascinated by how this 63-year-old creature has kept many similarities to today’s stacks, for example with IF and SWITCH statements, tables, and functions. The basics are always the same. 

I don’t recommend IBM’s course, verbose and not very intuitive (unless you want the certification?), while Derek’s tutorial helped in getting my hands dirty and with the setup.

It's easy to make fun of COBOL and its archaic limits, but let’s not forget the people that were writing my same codes on punch cards, without IDEs, Stack Overflow, the Internet… And this code written in such an ancient context is still up today, working incessantly, giving your money when you use the ATM. Jokes apart, I would be proud of it.

![COBOL meme](https://i.imgflip.com/43g61a.jpg)