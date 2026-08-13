---
title: 'Ten Common Security Mistakes AI-Generated Apps Make'
date: '2026-08-11'
category: ai
summary: 'These are the most common security mistakes I have seen AI-generated apps make.'
---

Shipping an app has never been easier. It's really cool to see that more people are getting into software development. Welcome!

However, more and more projects are being released without doing the most basics of security checks.

I have been working with a few clients and noticed a similar pattern of mistakes that fully AI-generated apps make. So my goal here is to enumarate the most common ones I have seen. I even made a skill to help developers who are helping out other people making apps with AI coding agents. Of course a non-technical person can use it too; but using Anthropics own words "Treat findins as suggestions, not as a substitue for human code review...", and "automated security reviews help identify many common vulnerabilities, they should complement, not replace, your existing security practices and manual code reviews."

I think education into not just how using AI is important, but the security and the bigger picture around software development (beyond the code), is an important aspect to also know and learn when building apps with just AI.

So anyways without further ado let's go down the list! Spoiler alert: these are really common issues that I am sure you have seen/know already!

The goal of the skill I made: These are the most common security mistakes I have seen AI-generated apps make, so we have this skill to identify and report them to us, so that a developer can prove it, enumerate and take appropriate action. The report is then taken into a developers hand or even handed straight back to the person who can take it from there.

## 1. Broken Auth
At number one we have broken auth, which is not only the most common issue I have ran into, it's also the OWASP 10 number 1 A01:2021 Broken Access Control, which has been found in 94% of tested apps!

## 2. No Server Side Validation

Endpoints can receive essentially any json request body and the app will handle it. What happens when a malicious user sends a Shakespear novel instead of their first name? Now it might be funny but it's not something you want to be dealing with. In addition what if it's not a long text but a malicious html/script tag that your website then renders on the page? That can leave you open to XSS. Not only that it can also injection type of vulnerability where, if you can perform updates on your user account, if there's no validation then you can simply upgrade your free acount to pro for fee without paying! Another big violator I saw here was in which an app allowed to have AI features, it had a count for how many tries you could try their AI features. Well you could just go ahead and update your settings to a large amount of usage and essentially get around that paywalled feature.

Not just by passing stuff, but you can also send any raw input into the LLM... yeah let's not do that.

## 3. No Rate Limiting

It's bad enough that people are now sending Shakespear novels to your app, but what if they have a script around this to create infinite users like this? 

It's not just rate limiting on your own app too, it must be imposed as well on any external API calls you make, even say, your AI API feature that you have. If your app in itself doesnt have rate limiting, and you have some dedicate feature that then talks with an external API, you can bet that you will be getting a large bill.

## 4. Bad file upload validation

Some apps I have seen contain some social media accept, whether it's uploading photos, videos, audio, etc.

What is stopping someone from uploading a virus? Now it might not execute sure, but if someone manages to download an insoate looking photo... Not only that but you can also inadverntely render that malicious photo 

When allowing for photo uploads, dont just check for size and limits, make sure that photos are also hosted from your own app. If you allow external images to be linked, make sure proper security measures are in place, such as..

## 5. Enumeration & Injection Vulnerabilities

We've all heard of SQL Injection. Funny enough I have seen AI do an OK job here, though it still pops up. However a more interesting one is enumarting attacks.

If you have a search filter be careful attention to the complex queries that it might be doing. You could be inadverently be allowing any arbitery query to pass on to the database. THis way an attack using the API can send a custom query that can reveal data that shouldn't be allowed, such as admins or every user who has a gmail account.

## 6. Secrets Leaked

THis is not so much the fault of the AI, it's usually good at this. But it's more so the users doing this. I can kinda get the justifications (barely) if you have a private repo. But if/once that repo goes public, you better rotate those keys immediately. Not only that but the history is there forever, so the only way around is to rotate your keys.

We have already solved this problem, please never hard code your api keys to the UI nor even on the backend. Use secured environment variables or setup a proper vault service.

## 7. Exposing PII Data

This one is a huge problem!! Your API is probably returning more field than the client needs, and that big one is the customers e-mail.

If you're really trying to get users to use your app, you need to make sure you're not sending your customers sensitive data out on your API. This is especially common on social type apps of course. E-mail is the biggest problem,

## 8. No Logging & Monitoring

Picture this, your app stops working but for how long was it down for? An attacker could be performing a DDoS attack and you won't even know that it's happening.

Or maybe a user hits a problem and reaches out to you for support, but nobody can see what happened, because there's no error tracking or metrics. Monitoring isn't only for attackers; it's how you support real
users. You won't be able to help them at all, and now that bug is off to the wind, never to be understood again.

## 9. No Backups

This is essential especially if you're going to be iterating a lot on your app. If you get real users, and the AI suddenly decides to do a massive database migration because you are adding or changing a new feature. It will hopefully generate a proper run book, but things dont always go smoothly. If you accidentally destroy your database or environment, the quickest way to restore is with a backup. And make sure you are testing them too, because if you have it but never test it, then you don't really know if it's going to work.

## 10. Supply Chain Vulnerabilities
AI can install dependencies that are old, and even have known CVEs. even setting up depende bot can be miles ahead, or just run npm audit, even if that isn't the best it's still better than not having any type of CVE check.

## Bonus Interesting Ones: 

There are more but I think that this covers the vast majority of them. I do have some bonus ones that I included that didn't really fit it being a major mistake/security concern.

### Admin Panels:
Admin UI living in the same app as customer-facing code. I find it interesting how common this is, nothing wrong with it per say. But imagine if you have an admin panel and your app contains all the 10 issues I mentioned? Given that if someone could just easily escalate their priviledges to admin, they have access to all the sensitive and controlling data that your admin panel makes. This just introduces another uncessary attack vector in my app.

If you need / want an “admin operation” dashboard, it’s totally FINE to have it on the same project/web app under “myapp.com/admin”. If it’s properly locked up of course.

Personally I’m not a big fan of that, because if you say, have a vulnerability on your app, not just your main web app is in trouble, so is your admin panel.

How would I solve this? Create a separate project with its own creds, deployment, etc, entirely under something like a admin.myapp.com, that can only be accessed by the companies / my own VPN. Of course this will still have proper auth in place, and yes if someone has access to the VPN they can access the portal but at least the admin portal won’t be publically available on the internet. But I know that this might be a bit too much work, so AT LEAST have a separate dedicate app entirely on a separate domain so that your two separate apps won't (hopefully) contain the same attack vector.

### No staging site:
I don't think this is necessary but it definitely should be once you have real users. It can help you have a dedicate place to test and break your app, and avoid the "testing in prod" that you're probably doing already.

## Conclusion + My Skill

Checkout my skill https://github.com/dannyreg/vibechecktech-skills that should help cover all these issues. This **doesn't** replace a proper human code review, audit review and/or pen test.

Remember that "AI can make mistakes" and we *KNOW* this, so imagine what it's doing to our code.

