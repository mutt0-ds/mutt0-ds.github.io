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

Here's the story of how I created my first full-stack project for monitoring my daily activities, using Python and SQL Server in backend and Appsmith for the GUI.

## 😟 The Problem

There are scripts I'm using that are particularly tedious to monitor. The typical structure is the following:

1. Load data (from a file or manual input)
2. Send a request to internal DB / very specific API
3. Compare the data received with the input and if something is wrong, notify me or a colleague.

They must operate locally on specific machines, can't be containerized, there are severe API limitations in some cases.

> **❔** I know that there are some amazing automation libraries like [Airflow](https://airflow.apache.org/) and [Luigi](https://github.com/spotify/luigi), but I chose to not use them because I needed something simpler and more customizable. I also wanted to test myself and build a whole project to be used in my day-to-day work.

I also needed a custom dashboard (inspired by [Airflow's one](https://airflow.apache.org/docs/apache-airflow/stable/ui.html), to be used by my colleagues for monitoring the scripts assigned to their departments, opening tickets, and doing other unique actions.

So, here's the backstory regarding how I created my own Logger. I have a lot to learn and process yet, but hey, it's a start.

### My Proposal

In my mind, my logger would consist of three parts

1. **Backend**: a module to be imported by all the scripts that connect to the Database and store logging data and results. Since the majority of them are in Python, that's the language I'm going to use.
2. **Database**: a SQL Server Express instance we have already set up for other tasks in our local server.
3. **Frontend**: I'm a newbie here; I needed something quick to spin up, hostable on the server, as easiest as possible to customize, capable to connect with our APIs. [Appsmith](https://www.appsmith.com/) was the right choice and I had a lot of fun with it.

## 🐌 Backend: Python module with decorator

My starting point was a previously existing library, which was already imported by all the scripts for handling exceptions and crashes. Every script contains this kind of template in its `main.py` file:

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

From there, I rewrited the alert_library module into a so-called `job_logger`, here's its pseudo-code:

```python
... import helper_functions, db_functions, logging, etc...

@dataclass
class Joblogger
  job_id: int
  status: str = 'Pending'

  def __post_init__(self):
    # looking for further data about the job in the db...
    data = db_functions.get_job_data(self.job_id)
    self.job_name = data.get('job_name')
    #self.other_useful_info = ...

  def begin_job():
    to_upload = {'job_id' : self._job_id,
                'h_begin': datetime.now(),
                'status': self.status,
                #other_useful_info...}
    self.row_id = db_functions._insert_on_db(to_upload)

  def finish_job():
    self.status = 'Done'
    to_upload = {
                'status': self.status,
                'h_end': datetime.now(),
                'message': 'OK',
                'needs_validation': helper_functions.check_validation(...)
                #other_useful_info...}
      db_functions._update_on_db(self.row_id, to_upload)

  def handle_error(e: Exception)
    self.status = "ERROR"
    to_upload = {self.status,
                'traceback': traceback.format_exc(limit=2, chain=False)
                #other_useful_info...}
    db_functions._update_on_db(self.row_id, to_upload)
    # + old alert library for sending alerts
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

Mhhh... slightly unkempt, verbose, and inconvenient to update for my tastes... Let's fashion a decorator so I don't have to paste so many lines of code into every script!

### The JobLogger Decorator

```python
from job_logger import monitor_job

@monitor_job(job_id = 3)
def main():
  ... # the script does its magic here

if __name__=='__main__':
  main()

```

I admired this solution not only because it's elegant, but eventually **if a colleague reads the code of the script, he won't get confused by the logger logic**, and hence one can easily debug the code by commenting on just the decorator line. Simple, isn't it?

## 📦 Data Layer : SQL Server Database

Not an area I have much expertise in, albeit we simply have an existing instance of a SQL Server upon which I created a new Database as per my convenience. There aren’t a lot of scripts running every hour thus making the amount of data manageable to the point it could be handled even by SQLlite. The fascinating part is that I have already written a module for interacting with this specific database, administering all the permissions, etc.. (the scripts are run by distinct machines by separate owners). I won’t explore the DB logic upheld here, although the JobLogger database has a few tables:

1. _User Table_
2. _Department Table_
3. _Job Table_, with all the details referencing the task, name, path, pc that should run it, scheduling details, and if it needs validation, etc... The Key is the job_id, which is an auto incremental number, and therefore it's significant to specify it in the Python decorator
4. _Log History Table_, which is the most important part: the history of all the run activities, including logs, warnings, comments, starting and ending times. Every execution of the `monitor_job` function creates a new row on the table.

## 📊 Frontend : Appsmith

[**Appsmith**](https://www.appsmith.com/) is an efficient open-source framework to build internal tools with lesser code, easy to spin up, and a charm to work with. I'm also studying Angular, but right now time is of the essence and a quick set-up is needed, with access control and unable to cause nuisance until I pick up further skillsets with TypeScript and Javascript (which are utilized in Appsmith widgets, yet there are a few lines).

Appsmith is _ridicously easy_ to set up (just run [this docker-compose.yml](https://docs.appsmith.com/setup/docker#docker-compose-configuration)), and I was able to connect my DB and the Slack API within a few minutes.

A noteworthy feature that remains is **the entire Dashboard, including widgets, JS Objects, and connections that can be exported as a simple JSON file** and imported into another instance of Appsmith. I struck on this discovery when I restarted the docker image, losing all my progress with the test I was creating and struggled hours with the docker commands, until realizing I should download the JSON and store it as a backup. You can also piece it together with a Github repo having SSL.

Here’s **the final result**: the "_Dettagli_" (Details) button contains additional information and a modal for opening a ticket. I connected a Sendgrid account to the App and quickly invited my colleague to share the fun!

![Dashboard](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/dashboard.jpg)

## Conclusions

As a junior Software Engineer, I have long ways to have comprehensive app-building knowledge, but **my JobLogger project acts as an enlightening first step**. I employ it on a daily basis since it’s assisting my colleagues by monitoring our activities, which is excellent considering that I wasn’t even thinking about putting it on (internal) production!

My satisfaction with this outcome of the project is high, as I am already working on embedding more features such as opening tickets for a particular task, and visualizing the scheduled jobs requisite on any day.

Fun and educative experience indeed, thanks for reading my experience! See you on the next project!
