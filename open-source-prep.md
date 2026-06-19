# Pre-Launch Checklist: Making TxShield Open Source

Hey team, 

Before we flip the repository to public, we need to run through this checklist to make sure we don't accidentally leak any sensitive data. Once a secret is pushed to a public repo, it's compromised immediately by bots.

Here is exactly what we need to verify.

## 1. Scrub the Git History (Crucial)
We just updated the `.gitignore` so it blocks `.env` files and `txshield.db`. **However**, if anyone committed these files *before* the `.gitignore` was updated, those files still live in our git history. 

**Action item:** 
- Run `git rm --cached .env` and `git rm --cached server/.env` (and do the same for `.db` files) to stop tracking them.
- If we actually committed real API keys in the past, we need to either invalidate/rotate those keys right now, or use a tool like [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to scrub them from the history completely. Honestly, rotating the keys is the safer and easier route.

## 2. Hunt for Hardcoded Secrets
Let's do a quick sweep of the codebase for anything we might have hardcoded during early testing instead of putting in the `.env`.

**Action item:**
- Search the codebase for terms like `API_KEY`, `secret`, `password`, `Bearer`, or `sk-` (OpenAI keys). 
- Make sure everything connects via `process.env`.

## 4. Proprietary Assets
Do we have any logos, icons, or images that we don't own the rights to? 

**Action item:**
- Quick check of the `public/` folders to make sure we aren't using licensed assets we shouldn't be giving away.

---

## What's Already Done

I've already set up the baseline for the open source transition:
- **`LICENSE`**: Added the MIT License under "CodeCommunity".
- **`README.md`**: Wrote a fresh README explaining the stack, features, and how to run both the frontend and backend locally.
- **`CONTRIBUTING.md`**: Added a guide explaining how people can fork the repo, set up their env, and submit pull requests.
- **`CODE_OF_CONDUCT.md`**: Added the standard Contributor Covenant so we have ground rules for community behavior.
- **`.gitignore`**: Consolidated the gitignores into a heavy-duty root config that catches node_modules, build folders, and sensitive files.

Once we clear items 1 through 4 above, we are 100% good to make the repository public.
