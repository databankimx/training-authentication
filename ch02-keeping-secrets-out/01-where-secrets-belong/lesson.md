# 1. Where Secrets Belong

A secret needs to be somewhere your script can reach at run time, and nowhere anyone else can read it by accident. Those two requirements point the same way: outside the code, and outside the repository.

The places a secret can sit differ a great deal in how far the secret spreads. The diagram runs from the worst to the best.

~~~text
Secret in source code   --> every copy of the file carries it
Secret in a repository  --> stays in the history, even after deletion
Name in a settings file --> fine. The value belongs elsewhere
Environment variable    --> set by whoever runs the script
Secrets manager         --> access policies, logged reads, rotation
~~~

## Outside the code

A secret written into a source file is a secret that every copy of that file carries. Copies go to colleagues, to backups, to build servers, and into version control history. Once a secret is in a commit, deleting the line later doesn't remove it from the history.

The better place is a value your script reads when it runs. The value lives in the environment of the machine or the service that runs the script, and it's set there by whoever manages that machine or service. The code only says which name to look up.

## Outside the repository

A file of settings can hold the name of a secret, and even its location, but the secret itself belongs somewhere else. If a settings file is in the repository, it must not contain the value. Local settings files that do hold values belong in `.gitignore`, a file that tells Git which files to leave out of a commit. The `.gitignore` in this tutorial's repository already excludes the common ones, and that's a safety net, not a plan.

## Cloud secrets managers

Most cloud platforms offer a service built for this job. You store the secret there once, control who may read it, and your script fetches it when it runs. The three you're most likely to meet are AWS Secrets Manager, Google Cloud Secret Manager, and Azure Key Vault.

They share a few features that matter here. Access is controlled by policies, so only the identities you name can read a secret. Each read can be logged, so you can see who asked for it. Many of them can rotate a secret on a schedule, which a script must then be ready to handle. The exact names of these features differ between the platforms, so check each platform's current documentation before you rely on the details.

There's a catch. To read a secret from a manager, your script has to authenticate to it, and that's a credential too. The usual answer is an identity the platform attaches to the workload, such as an IAM role, a managed identity, or a workload identity. Then the script needs no stored credential at all to fetch the rest. Chapter 12 covers how those identities relate to the platforms.

> **Aside: the first credential is the hard one.**
> A secrets manager moves the problem rather than removing it. Keeping the manager's own login in a settings file defeats the purpose, so use a platform identity wherever one is available.

## Where a secret must never appear

No matter how well you store a secret, a few places must never see it. These are the ones that catch people out:

- source code, including comments and test data
- a repository's history, including commits you later deleted
- logs and error messages, including the debug output you added to find a bug
- a URL, which ends up in logs, history, and proxies
- a chat message, a ticket, or a screenshot

> **Aside: the environment is not a vault.**
> An environment variable is better than a value in code, but it isn't a secure store on its own. Anything that runs as the same account can usually read it, and a crash dump can capture it. Teams that need stronger protection use a dedicated secret store, which Chapter 12 describes in general terms.

> **Common mistake.** Adding a secret to a settings file while testing, and forgetting to take it out before the next commit. Check `git status` and `git diff` before every commit, and look for values you didn't mean to add.

---
