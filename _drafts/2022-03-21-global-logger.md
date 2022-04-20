---
title: "My Personal Airflow - How I'm monitoring my scripts with Python, Appsmith and SQL Server"
date: 2022-03-21
permalink: /posts/2022/03/personal-airflow.md/
tags:
  - python
  - sql-server
  - experiments
  - appsmith
  - javascript
---

Here's the story of how I created my first full-stack project, using Python and SQL Server in backend and Appsmith to provide a GUI for my daily activities

## 😟 The Problem

There are some scripts I'm using that are particularly painful to monitor. The typical structure is the following:

1. Load data (from a file or manual input)
2. Send a request to internal DB / very specific API
3. Compare the data received with the input and if something is wrong, notify the me or a colleague

They must operate locally on specific machines, can't be containerized, there are severe API limitations in some cases.

> **❔** I know that there are some amazing automation libraries like [Airflow](https://airflow.apache.org/) and [Luigi](https://github.com/spotify/luigi), but I chose to not use them because I needed something simpler and more customizable. I also wanted to test myself and build a whole project to be used in my day-to-day work.

I also needed a custom dashboard (inspired by [Airflow's one](https://airflow.apache.org/docs/apache-airflow/stable/ui.html), to be used by my colleagues for monitoring the scripts assigned to their departments, open tickets, and do other unique actions.

So, here's the story about I created my own Logger. I have a lot to learn yet, but hey, its a start #TODO: migliora intro

### My Proposal

In my mind, my logger would consist of three parts

1. Backend: a module to be imported by all the scripts that connect to the Database and stores logging data and results. Since the majority of them is in Python, that's the language I'm going to use.
2. Database: a SQL Server Express instance we have already set up for other tasks in our local server.
3. Frontend: I'm definitely not an expert here; I needed something quick to spin up, hostable on the server, as easiest as possible to customize, capable to connect with our APIs. [Appsmith](https://www.appsmith.com/) was the right choice and I had a lot of fun with it.

## 🐌 Backend: Python module with decorator

My starting point was the previously existing library, which was already imported by all the scripts for handling exceptions and crashes. Every script had this kind of template in its `main.py` file:

##### Old Alert Library

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

##### The JobLogger class

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

Appsmith is an amazing open source framework to build internal tools with low-code, easy to spin up and pretty fun to work with. I'm also studying Angular, but right now I needed something very quick to set up, with access control and unable to cause me too many headaches until I'll be more skilled with TypeScript and Javascript (which is used in Appsmith widgets, but they are just a few lines).

Appsmith is _ridicously easy_ to set up (just run [this docker-compose.yml](https://docs.appsmith.com/setup/docker#docker-compose-configuration)), and I was able to connect my DB and the Slack API in a few minutes.

A very cool feature is that the entire Dashboard, including widgets, JS Objects and connections, can be exported as a simple JSON file and imported in another Appsmith instance. I discovered it when I restarted the docker image, losing all my progress with the test I was creating, and struggled for hours with docker commands before realizing that I should just download the JSON and store it as a backup. You can also connect it to a Github repo with SSL.

So, here's the final result: the "Dettagli" (Details) button contains additional informations and a modal for opening a ticket. I connected a Sendgrid test account to the App and quickly invited my colleague to share the fun!

SCREENSHOTS DELLA DASHBOARD

## Conclusions

As a junior Software Engineer, I still have a lot to learn about building apps, but my JobLogger project was a good starting point for me. I'm using it on a daily basis and it's helping my colleagues with monitoring our activities, which is amazing considering that I wasn't thinking about putting it on (internal) production!

I'm very satisfied about the outcome of the project and I'm already working for additional features, such as opening tickets about a specific task and visualizing the scheduled jobs for the day...

This was a fun and educative experience, thanks for having read my story. See you for the next project!
