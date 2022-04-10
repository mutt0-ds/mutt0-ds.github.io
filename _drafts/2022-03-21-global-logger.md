---
title: "How I built my personal Airflow with Python, Appsmith and SQL Server"
date: 2022-03-21
permalink: /posts/2022/03/personal-airflow.md/
tags:
  - python
  - sql-server
  - experiments
  - appsmith
---

Here's the story of how I created my first full-stack project, starting as a side project for learning Appsmith in front-end, but in the end it's operative /Todo: CHECKA

## 😟 The Problem

There are some tasks at my workplace that are particularly painful to monitor. Many of them follows this sort of flow:

1. Load data (from a file or manual input)
2. Send a request to a local DB / very specific API
3. Compare the data received with the input and if something is wrong, notify the user

They must operate locally on specific machines, can't be containerized, there are severe API limitations in some cases #TODO SPIEGA PROBLEMA E AGGIUNGI CHE C'era gia un modulo per Slack

I looked forward to libraries for automatize this process, like Airflow and Luigi (TODO: add links), but, mostly because I'm still at the beginning of my learning process, I found them cumbersome to use and too powerful for the simple task I want to solve.

(Callout)

> I just want a log of the executed scripts, stored as a table in our SQL Server, ready to be queried in the future with a GUI.

Then, it would be cool for some colleagues to be able to

So, here's the story about I created my own 'Airflow'. I have a lot to learn yet, but blabla that's for the future me

### My Proposal

1. Rework the previous alert module as a logger that connects to my database and registers every execution
2. In case of error, register the error in the database and then send the alert
3. Provide a simple GUI for my colleagues to validate potential warnings

## 🐌 Back-End: Python module with decorator

My starting point was the previously existing library, which was already imported by all the scripts for handling exceptions and crashes. Every script had this kind of template in its `main.py` file:

### Old Alert Library

```python
import alert_library

def main():
  ... # the script does its magic here

if __name__=='__main__':
  try:
    main()
  except Exception as e:
    alert_library.send_error(e) # the module handles all the error cases and sends a report
```

### The JobLogger class

From there, I rewrited the alert_library module into a so-called `job_logger`, here's its pseudo-code

```python
from dataclasses import dataclass
from sqlalchemy.conn # TODO: gestire import
from logger_functions import get_job_data
from datetime import datetime

@dataclass
class Joblogger
  job_id: int

  def __post_init__(self):
    # the data is already mapped in the DB; if the job_id doesn't exist there's an error
    data = get_job_data(self.job_id, self._connect_to_db())
    self.job_name = data.get('job_name')
    self.h_begin = datetime.now()
    self.sql_engine = self._connect_to_db()
    #self.other_useful_info = ...


  def _connect_to_db():
    # function that creates a sqlalchemy engine for communicating with the JobLogger DB
    return connection

  def begin_job():
  # there'a logging instance to be added to the DB (modulo logging)

  def end_job()

  def handle_error(e: Exception)
  ...old alert library
```

Now all the scripts have this structure:

```python
from job_logger import JobLogger

def main():
  ... # the script does its magic here

if __name__=='__main__':
  logger = JobLogger()
  try:
    logger.begin_job(job_id = 3)
    main()
    logger.finish_job()
  except Exception as e:
    alert_library.handle_error(e) # the module handles all the error cases and sends a report

```

Mhhh... a bit ugly, verbose and difficult to update for my tastes... Let's make a decorator so I don't have to paste so many lines of codes into every script!

### The JobLogger Decorator

```python
from job_logger import monitor_job

@monitor_job(job_id = 3)
def main():
  ... # the script does its magic here

if __name__=='__main__':
  main()

```

I loved this solution because it's both elegant and eventually if a colleague is reading the code of the script he won't get confused by the logger logics, and he can easily debug the code by commenting out just the decorator line. Can't be simpler than that!

## 📦 Data Layer : SQL Server Database

I'm definitely not an expert in this topic, we simply have an existing istance of SQL Server and I created a new Database since I was familiar with it. There aren't SO many scripts running every hour so the amount of data is easily manageable, even SQLlite could have worked well. The cool part is that I've already written a module for interacting with our database, handling all the permissions etc... (the scripts are runned by different machines with different owners). I won't explore the DB logic here, but the JobLogger database has just a few tables:

1. User Table
2. Department Table
3. Job Table, with all the details about the task, name, path, pc that should run it, scheduling details, if it needs validation etc... Key is the job_id, which is an autoincremntal number, that's why it's so important to specify it in the decorator
4. Log History Table, which is the most important part: the history of all the runned activites, including logs, warnings, starting time, ending time

Every time an activity executes the monitor_job blabla

TODO: metti screenshot esempio tabella

## 📊 Frontend : Appsmith

I decided to use Appsmith, which is an amazing open source framework to build internal tools with low-code, easy to spin up and pretty fun to work with. I'm currently studying Angular, but at the moment I needed something very quick to set up and unable to cause me too many headaches until I'll be more skilled with TypeScript and Javascript (which is used in Appsmith widgets, but they are just a few lines).

Appsmith is ridicously easy to set up (just run this docker-compose.yml), and I connected my DB and the Slack API in a few minutes. Since this is an internal tool I didn't need to create an host, blabla serve?

A very cool feature is that the entire Dashboard, with queries and connections, can be exported as a simple JSON file and re-created in another Appsmith account. I discovered it when I re-built the docker image, losing all my progress with the test dashboard, and struggled for hours with docker commands before realizing that I can just download that JSON and store it as a backup.

SCREENSHOTS DELLA DASHBOARD

## Conclusions

As a junior Software Engineer, I still have a lot to learn with building apps, but I consider Appsmith a good starting point for setting up a nice, simple GUI. Monitoring all those minor activities has been rather painful, and now with my personal logger app I'm able to keep an eye on them and collaborate with my colleagues.
