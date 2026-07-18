---
title: System Design Interview
author: Alex Xu
image: https://m.media-amazon.com/images/I/615KGTRs1OL._UF1000,1000_QL80_.jpg
badges:
- "💻 IT"
score: "⭐⭐⭐"
finished: '2025-11-14'
summary: Analyze patterns and think carefully to answer system design questions. Start with the simple case then expand
showInHome: false
---

Recommended by someone from Nearform, alongside Designing Data-Intensive Applications. I follow Alex Xu's channel and he is very good; I should read it to tackle more complex architectures. People say it is very interesting and fun, judging from the comments. Also recommended here.

Not exactly fun, but useful. Each chapter tackles a system design question, from building a key-value store to a load balancer, and requires careful thinking about how many users to support, how to scale it, and how to create a plan in a few simple steps. I would reread it before a technical interview, and I did learn a few things about structuring these kinds of projects, and I found it interesting. The gist is to start simple, clarify the requirements, and know the patterns. With those, the questions are more or less always the same.

## Notes

I am mostly leaving chapter summaries so I can remember the table of contents. I mostly knew these topics already, except encryption, hash tables, and some advanced topics like media streaming and load balancers. Very interesting but I did not take many notes.

- Chapter unique ID generator: multi-master replication, UUID, ticket server, and Twitter snowflake-like unique ID generator. We settle on snowflake as it supports all our use cases and is scalable in a distributed environment.
- Chapter crawler: scalability, politeness, extensibility, and robustness. Then, we proposed a design and discussed key components. Building a scalable web crawler is not a trivial task because the web is enormously large and full of traps.
- Chapter notification system: push notification, SMS message, and email. We adopted message queues to decouple system components. Besides the high-level design, we dug deep into more components and optimizations. •Reliability: We proposed a robust retry mechanism to minimize the failure rate. •Security: AppKey/appSecret pair is used to ensure only verified clients can send notifications. •Tracking and monitoring: These are implemented at every stage of a notification
- Chapter chat system architecture: supports both 1-to-1 chat and small group chat. WebSocket is used for real-time communication between the client and server (but not all the rest, not needed for login etc). The chat system contains the following components: chat servers for real-time messaging, presence servers for managing online presence, push notification servers for sending push notifications, key-value stores for chat history persistence and API servers for other functionalities.
- Chapter search: •Trie data structure •Data gathering service •Query service •Scale the storage •Trie operations
- Chapter Google Drive. The combination of strong consistency, low network bandwidth and fast sync make the design interesting. Our design contains two flows: manage file metadata and file sync. Notification service is another important component of the system. It uses long polling to keep clients up to date with file changes.