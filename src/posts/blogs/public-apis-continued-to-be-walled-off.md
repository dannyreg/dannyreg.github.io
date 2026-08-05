---
title: 'Public APIs Continued To Be Walled Off'
date: '2026-08-05'
category: api
summary: 'Yahoo, Strava, and Reddit keep gating their APIs, and hobbyists get bulldozed along with the people they are actually trying to stop.'
---

Back in 2024, I created my first real side project, FFAwards.app, a tool to generate awards for your fantasy football league. It was an incredible feeling to finally get a side project live in production. And truthfully, I really didn't care too much about making any money from it; I just wanted to create a fun tool that people would find useful and helpful.

Initially the project started off with Yahoo Fantasy, and I got a lot of great feedback to add more features and more fantasy leagues. So naturally the project grew to support Sleeper and ESPN. This year I spent a good amount of time doing a full rewrite of the UI, and I'm quite happy with it.

Now, Yahoo Fantasy is the main platform I use for the league with my close friends. But this year Yahoo decided to make a major change to their developer API. Instead of simply registering a developer account and registering your app, you must now request access to the API (a similar move to what Reddit did back in 2023).

This wouldn't be a problem, if not for the fact that Yahoo can take weeks or even months to respond back. And even if you get the initial email, there's back and forth that needs to happen that can take another weeks or months. So now, because of this, my app along with other developer apps don't work at all with Yahoo Fantasy, since they have now revoked access to existing apps.

And even IF they give you permission, you must sign a DocuSign with their new terms and conditions. It contains the normal stuff you would expect: don’t abuse their API, don’t store session tokens, etc. But according to one developer, the contract also stipulates that any AI output that leverages Yahoo Fantasy information is subsequently *owned by Yahoo*. The contract also stipulates they can audit you and your tech at any time.

For hobbyists like myself trying to make fun apps to share, this is a crushing blow. I really can’t justify signing a contract that lets a billion-dollar company audit my tech and claim ownership of my AI output, especially for a side project that makes zero dollars!

## Why has all this changed?

Yahoo isn't the only company to do this, this has  happened with Strava this year and Reddit in 2023.

Before AI, using these developer tools came with a gentleman's agreement kind of trust. They knew for a fact a human would go in and register and make these accounts. But nowadays, I'm sure these platforms are getting absolutely slammed by AI crawlers and exponentially more vibe-coded apps that just hammer their APIs with no regard for caching or rate limiting. They can't rely on the inherent "good nature" of API consumers anymore, so they have to gate access.

And it goes beyond the API abuse. It's also a resource drain on their compute. It's gatekeeping their data from LLMs simply reading it for free. And it's a way to stop people from using their API to build the very AI tools they'd rather build and monetize themselves.

But that’s the danger with building your house on someone else’s land. While these decisions from Yahoo make sense against companies and apps trying to monetize their data, hobbyists like me just trying to make fun and helpful tools get bulldozed along with the people they’re actually trying to stop.
