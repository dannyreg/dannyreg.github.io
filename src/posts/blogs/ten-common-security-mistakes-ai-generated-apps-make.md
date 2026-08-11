---
title: 'Ten Common Security Mistakes AI-Generated Apps Make'
date: '2026-08-11'
category: ai
summary: 'These are the most common security mistakes I have seen AI-generated apps make.'
---

Shipping an app has never been easier. It's really cool to see that more people are getting into software development. Welcome!

However, more and more projects are being released without doing the most basics of security checks. I've always had a knack for security and breaking apps, so this interested me. I have been working with a few clients and noticed a similar pattern of mistakes that fully AI-generated apps make. So my goal here is to enumarate the most common ones I have seen. I even made a skill to help developers who are helping out other people making apps with AI coding agents.

I think education into not just how using AI is important, but the security and the bigger picture around software developemnt (beyond the code), is an important aspect to also know and learn when building apps with just Ai.

So anyways witnout further ado let's go down the list! Spoiltes: these 

The goal of the skill I made: These are the most common security mistakes I have seen AI-generated apps make, so we have this skill to identify and report them to us, so that a developer can prove it, enumerate and take appropriate action. The report is then taken into a developers hand or even handed straight back to the person who can take it from there.

1. Broken Auth: includes IDOR, CSRF, broken access control (OWASP Top 10), also just missing basic auth flows; no password changing, no forgot my password flows, etc. I even saw one where the e-mail switching feature was sent to the wrong e-mail?

2. No Server Side Validation: missing per-route schemas; raw client input written straight to the DB or an LLM call

3. No Rate Limiting: login, password reset, LLM, email/SMS endpoints with no limits

4. Bad file upload validation: type checked only by extension/Content-Type, no size cap, SVG/script uploads

5. Enumeration & Injection Vulnerabilities: string-built queries, user-controlled sort/filter/column params

6. Secrets: Good grief I can’t believe this is still a problem.

7. Exposing PII Data: emails and other PII returned in API responses, search, or social features

8. No Logging & Monitoring: no error capture, no security event logs, no alerting on spikes. Not just for attackers going into the system but also for when users have bugs to report. How will you even know what's wrong?

9. No Backups: no backups, or backups that have never been restore-tested

10. Supply Chain Vulnerabilities: AI can install dependencies that are old, and even have known CVEs. even setting up depende bot can be miles ahead, or just run npm audit, even if that isn't the best it's still better than not having any type of CVE check.

Bonus Interesting Ones:

* Admin Panels: admin UI living in the same app as customer-facing code, under-audited. I find it interesting how common this is, nothing wrong with it per say. But imagine if you have an admin panel and your app contains all the 10 issues I mentioned? Given that if someone could just easily escalate their priviledges to admin, they have access to all the sensitive and controlling data that your admin panel makes.

