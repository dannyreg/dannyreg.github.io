---
title: 'Public APIs Continued To Be Walled Off'
date: '2026-08-05'
category: api
summary: 'Yahoo, Strava, and Reddit keep gating their APIs, and hobbyists get caught in the crossfire along with the people they are actually trying to stop.'
---

Back in 2024, I created my first real side project, FFAwards.app, a tool to generate awards for your fantasy football league. It was an incredible feeling to finally get a side project live in production. And truthfully, I really didn't care too much about making any money from it; I just wanted to create a fun tool that people would find useful and helpful.

Initially the project started off with Yahoo Fantasy, and I got a lot of great feedback to add more features and more fantasy leagues. So naturally the project grew to support Sleeper and ESPN. This year I spent a good amount of time doing a full rewrite of the UI, and I'm quite happy with it.

Yahoo Fantasy is the main platform I use for the league with my close friends. But this year, Yahoo decided to make a major change to their developer API. Instead of simply registering a developer account and registering your app, you must now request access to the API.

This wouldn't be a problem, if not for the fact that Yahoo can take weeks or even months to respond back. So now it's a bit of a waiting game until I hear back from them. In the meantime, my app along with other developer apps don't work at all with Yahoo Fantasy, since they have revoked API access to existing apps.

According to other developers, once you hear back and get approval, you must sign a DocuSign with their new terms and conditions. It contains the normal stuff you would expect: don't abuse their API, don't store session tokens, etc. But according to one developer, the contract also stipulates that any AI output that leverages Yahoo Fantasy information is subsequently *owned by Yahoo*. The contract also stipulates they can audit you and your tech at any time. For a side project that makes zero dollars, those aren't terms I can realistically sign.

## Why has all this changed?

Yahoo isn't the only company to do this — it happened with Strava this year, Reddit in 2023, and other API providers as well.

These developer tools came with a gentleman's agreement kind of trust. They knew for a fact a human would go in and register and make these accounts. But nowadays, I'm sure these platforms are getting absolutely slammed by more crawlers and scrapers for AI companies. They can't rely on the inherent "good nature" of API consumers anymore, so they have to gate access.

I think it makes sense why they gatekeep, they kinda have to. It's a resource drain on their compute, it's also gatekeeping their data from LLMs simply reading it for free, and it's also a way to stop people from using their API to build, say, an AI tool that uses their data when they'd rather build and monetize it themselves.

But that's the danger with building your house on someone else's land. While these decisions from Yahoo make sense against companies and apps trying to monetize their data, hobbyists like me just trying to make fun and helpful tools get caught in the crossfire along with the people they're actually trying to stop.
