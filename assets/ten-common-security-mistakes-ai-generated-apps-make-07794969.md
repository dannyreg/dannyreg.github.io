---
title: 'Ten Common Security Mistakes AI-Generated Apps Make'
date: '2026-08-17'
category: ai
summary: 'These are the most common security mistakes I have seen AI-generated apps make.'
---

Shipping an app has never been easier. It's really cool to see that more people are getting into software development. Welcome!

However, more and more projects are being released without doing the most basic of security checks.

I think education into not just how to use AI, but the security and the bigger picture around software development (beyond the code), is an important aspect to also know and learn when building apps with just AI.

So let's go down the list shall we?


## 1. Broken Access Control

At number one we have broken access control, which is not only the most common issue I have run into, it's also OWASP's number one: [A01:2021 Broken Access Control](https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/). In OWASP's dataset, 94% of applications were tested for some form of broken access control, and it had over 318,000 occurrences, which is more than any other category. It's *that* big of a problem!

It's definitely the most serious issue. This can come in different ways and forms, but the most common versions of this that I have seen are: escalating roles from free to pro without paying and accessing/editing resources you don't own.

###### The Fix:
Your server must check on every request that the authenticated user is actually allowed to touch the resource they're asking for. Never trust the client to enforce this. But better yet, if your database can support policies, implement them. Supabase, for example, allows you to set [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), which lets you write policies directly in Postgres that filter which rows each user can read or write (typically keyed off `auth.uid()`). That way, even if your app code forgets a check, the database itself refuses to hand over rows that don't belong to that user. Consider also the idea [zero trust](https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/) but for your app, where you give the least amount of access to everyone and simply go up from there.


## 2. No Server Side Validation

Endpoints can receive essentially any JSON request body and the app will handle it. What happens when a malicious user sends a Shakespeare novel instead of their first name? It might be funny, but it's not something you want to be dealing with. And what if it's not a long text but a malicious HTML/script tag that your website then renders on the page? Now you're open to [XSS](https://owasp.org/www-community/attacks/xss/).

The nastier version I've seen is when update endpoints accept *any* field you send them, allowing you to update properties on the database schema without any checks. If there's no validation on your "update account" endpoint, a user can simply upgrade their free account to pro for free (which is still part of broken access control and pertains to permission checks). Or what if you have AI features paywalled, but you give a user three tries to try out the AI feature? Well with no request validation, you can simply send a request like so

```bash
curl -X PATCH https://myapp.com/api/me \
  -H "Authorization: Bearer <your-own-token>" \
  -d '{"plan": "pro", "aiCreditsRemaining": 999999}'
```

This won't just affect your database, it can also affect third-party APIs that you're using. If you aren't validating the user's input when you send their request to your AI chat feature, you could be inadvertently sending the user's submitted Shakespeare novel to your AI API, and thus costing you money now!

###### The fix
Every endpoint should have a dedicated schema validation tool (such as [zod](https://zod.dev), [Joi](https://joi.dev), whatever your stack uses) on what the request body should look like. Also: reject unknown fields instead of silently accepting them (zod's `.strict()`, Joi's `stripUnknown`), enforce maximum lengths on every string, and never spread the raw request body into a database update. Instead, explicitly pick the fields a user is allowed to change.

## 3. No Rate Limiting

It's bad enough that people are now sending Shakespeare novels to your app, but what if they wrap this around a looping script and hit all your sensitive endpoints? Your API being called 10,000 times a minute? What will happen exactly? The targets for this are login, password resets, your AI feature endpoints, and anything that can send an e-mail or SMS.


###### The fix
Implement server-side rate limiting, such as a fixed-window, sliding-window, or token-bucket limiter per IP and per user, or at least pull in a dependency that can perform some simple level of it (like [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit) if you're on Node). Even bare minimum is better than nothing because you can at least prevent a catastrophic disaster. If you have an endpoint that can send e-mails and/or text messages (e.g., e-mail invite, 2FA), make sure these endpoints have a 30 second to 1 minute cooldown between each request being sent.

Services like Upstash Redis (with their [`@upstash/ratelimit`](https://github.com/upstash/ratelimit-js) library) can be enabled on your application in a few lines and give you a sliding-window counter per IP and user.

## 4. Bad file upload validation

Some apps I have seen contain some social media aspect, whether it's uploading photos, videos, audio, etc.

What's stopping someone from uploading a virus? Sure, it won't execute on your server, but your app just became a distribution point: someone downloads an innocent-looking "photo" and it's an executable. Or worse... some "image" formats can carry scripts, such as an SVG with JavaScript inside or an HTML file with a renamed extension, and if your app serves that file back and the browser renders it, you've got [stored XSS](https://owasp.org/www-community/attacks/xss/#stored-xss-attacks).


###### The Fix
When uploading media, check file types by actual content ([magic bytes](https://en.wikipedia.org/wiki/List_of_file_signatures)), not just extension; enforce size limits; strip metadata; and serve uploads from object storage on a separate domain with the correct `Content-Type` so the browser never renders them as pages. That combo should kill most stored-XSS risks, which is the realistic threat for most apps.

If your app's whole job is distributing files to other users (photo sharing, a marketplace, general file hosting), add actual malware scanning on top.

## 5. Enumeration & Injection Vulnerabilities

We've all heard of [SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection). Funny enough I have seen AI do an OK job here, though it still pops up.

The more interesting one I keep finding are in search and filter features. If your API takes a filter object from the client and passes it more or less directly into a database query, you're letting the client write your queries for you. An attacker can send a custom filter that reveals data that should never be reachable, like listing every admin account, or every user with a gmail address. It's a bit surprising how often this one has come up.


###### The Fix
Never pass client-supplied query structures to the database. Allowlist which fields and operators are filterable on the server, and build the query yourself from those. We can also look at the queries being sent and think: how can we manipulate this query by changing the initial request? We can go from there on fixing it.


## 6. Secrets Leaked

This one is not so much the AI's fault, since it's usually pretty good here. It's the humans. I can *barely* understand the justification if you have a private repo. But if that repo ever goes public, rotate those keys immediately. And remember: git history is forever. Deleting the line in a new commit does nothing; the key is still in the history. Rotation is the only fix.

We solved this problem ages ago. Please never hardcode API keys in the UI or the backend.

###### The Fix
Secrets live in environment variables or a proper vault service, and turn on secret scanning ([GitHub push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection) or [gitleaks](https://github.com/gitleaks/gitleaks)) so keys never make it into history in the first place.

## 7. Exposing PII Data

This one is a huge problem!! Your API is probably returning more fields than the client needs, and the big one is the customer's e-mail.

If you're really trying to get users to use your app, you need to make sure you're not sending your customers' sensitive data out on your API. This is especially common on social type apps of course. E-mail is the biggest problem.

###### The Fix
You're more than likely storing a customer's e-mail; tell your AI to look for [PII](https://en.wikipedia.org/wiki/Personal_data) data and see where it's being returned on the API. The less information you can provide the better off you are.

## 8. No Logging & Monitoring

Picture this: your app stops working, but how long was it down for? An attacker could be hammering your API and you won't even know that it's happening.

Or maybe a user hits a problem and reaches out to you for support, but nobody can see what happened, because there's no error tracking or metrics. Monitoring isn't only for attackers; it's how you support real
users. You won't be able to help them at all, and now that bug is off to the wind, never to be understood again.

###### The Fix
At minimum, an error tracker ([Sentry](https://sentry.io/) or similar), an uptime check, and alerts. This is such an easy thing to add that will save you a TON of problems in the future.

## 9. No Backups

This is essential especially if you're going to be iterating a lot on your app. If you get real users, and the AI suddenly decides to do a massive database migration because you are adding or changing a new feature. It will hopefully generate a proper runbook, but things don't always go smoothly. If you accidentally destroy your database or environment, the quickest way to restore is with a backup. And make sure you are testing them too, because if you have it but never test it, then you don't really know if it's going to work.

###### The Fix
Ask your AI what your backup strategy should be for your system. Everything is different, but something needs to be in place. This especially must be done once you have live customers because you do not want to have data loss; it's how you lose customers and their trust!

Once in place, have automated scheduled backups, and actually run a restore once in a while to prove they work.

## 10. Supply Chain Vulnerabilities
AI can and will install dependencies that are old, sometimes with known CVEs. It picked those versions because they were common in its training data, not because they're current.

###### The Fix
Setup [Dependabot](https://docs.github.com/en/code-security/dependabot) (or [Renovate](https://docs.renovatebot.com/)), and run [`npm audit`](https://docs.npmjs.com/cli/commands/npm-audit) in CI. Neither is perfect, but either one is miles ahead of no CVE checking at all.

## Bonus Interesting Ones

There are more but I think that this covers the vast majority of them, at least the most important ones. I do have some bonus ones that I included that didn't really fit being a major mistake/security concern.

### Admin Panels
Admin UI living in the same app as customer-facing code. I find it interesting how common this is, and there's nothing wrong with it per se. But imagine if you have an admin panel and your app contains all the 10 issues I mentioned? If someone could just easily escalate their privileges to admin, they have access to all the sensitive data and controls that your admin panel exposes. This just introduces another unnecessary attack vector in your app.

###### The Fix
This is more personal opinion, but this is how I would solve it: A separate project entirely, with its own credentials and deployment at something like `admin.myapp.com`, reachable only over the company (or your own) VPN. Yes, it still needs proper auth (VPN access alone isn't authorization) but at least the admin portal isn't sitting on the public internet. If that's too much work, then *at least* make it a separate app on a separate domain or subdomain so the two don't share the same attack surface.

### No staging site
I don't think this is necessary at first, but it definitely should be once you have real users. It can help you have a dedicated place to test and break your app, and avoid the "testing in prod" that you're probably doing already.

###### The Fix
Ask your AI what existing structures you have for a staging environment, what steps you need to take to create one, and what it would look like based on your current architecture. Come up with a plan (you can ask AI to help here) on how to have a proper code change -> staging -> test -> production deployment flow. You can set up a dedicated pipeline on GitHub or wherever and have it deploy to a dedicated subdomain of the domain name you own.


### No Privacy Policy, Terms of Service nor GDPR
This is the more legal "boring" side of things... but it's important to have.

You need to explain to the user how you are using their data and for what, especially on apps that are charging money.

On the [GDPR](https://gdpr.eu/what-is-gdpr/) front, you more than likely have European users, so it should be taken into account. GDPR applies based on where your *users* are, not where your company is, and fines can reach €20 million or 4% of global annual revenue, whichever is higher. Start with baby steps.

###### The Fix
Use a policy generator ([Termly](https://termly.io/products/terms-and-conditions-generator/), iubenda, GetTerms, or similar) to get a baseline Privacy Policy and Terms of Service up, and link them in your footer and signup flow. Only collect the data you actually need; the less PII you store, the less you have to worry about. For GDPR specifically: add cookie consent if you're running analytics or trackers, and make sure a user can request a copy of their data and have their account deleted (the rights of access and erasure).


## Conclusion + My Skill

Checkout my [skill](https://github.com/dannyreg/vibechecktech-skills) that should help cover all these issues. This **doesn't** replace a proper human code review, audit review and/or pen test. The skill should help you identify these common issues and from there you can take action, either with a specific prompt or resolving it with the proper tools.

If you're a non-technical founder/person that is serious with trying to start something with AI-generated apps, I want to help! Check me out at [VibeCheckTech.com](https://VibeCheckTech.com). You can 100% use these skills and even the ones Anthropic provides, but remember, and I am using Anthropic's exact words here, you should treat these tools as ["a best-effort assistive tool, not a guarantee. Treat findings as suggestions, not as a substitute for human code review, SAST/DAST, dependency scanning, or pen-testing."](https://github.com/anthropics/claude-code/tree/main/plugins/security-guidance#limitations), and ["While automated security reviews help identify many common vulnerabilities, they should complement, not replace, your existing security practices and manual code reviews."](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code)

The disclaimer under every chat box says "AI can make mistakes." Your app is not the exception. Review it like you know that.
