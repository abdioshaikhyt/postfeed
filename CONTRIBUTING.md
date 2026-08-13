# Contributing to postfeed

Workflow guide for the team. Read this before your first PR.

## Branch Strategy

`master` is always deployable — Netlify auto-deploys from it on every merge. Nobody commits directly to `master`. Every ticket gets its own branch.

**Branch naming:** tie it to the Jira ticket key, e.g. `KAN-7-redux-store-setup`. This is linked to Jira, so the ticket automatically shows the branch and PR in its Development panel — you can jump from Jira straight to the code.

## Day-to-Day Workflow

1. **Pull latest master first**
   ```bash
   git checkout master
   git pull
   ```
   Make sure you're branching off current code, not something days old.

2. **Create your branch**
   ```bash
   git checkout -b KAN-7-redux-store-setup
   ```

3. **Work and commit**
   Reference the ticket key in commit messages so Smart Commits pick it up:
   ```bash
   git commit -m "KAN-7: add posts slice and Reddit fetch layer"
   ```

4. **Push the branch**
   ```bash
   git push -u origin KAN-7-redux-store-setup   # first push only
   git push                                      # after that
   ```

5. **Open a Pull Request on GitHub**
   Target `master`, tag a teammate to review. Don't merge your own PR without at least one other person looking at it — that's the point of doing this as a team.

6. **Merge and clean up**
   Once approved, use "Squash and merge" (keeps `master`'s history clean — one commit per ticket instead of ten messy WIP commits), then delete the branch. Netlify redeploys automatically.

## Handling Merge Conflicts

Conflicts happen when two branches edit the same lines of the same file and Git can't automatically tell which version to keep. With three of us mostly working in separate folders (`src/features/`, `src/components/`, `src/pages/`), conflicts should be rare — most likely in shared files like the Redux store setup or `App.jsx`.

When it happens, Git marks the conflicting section directly in the file:

```
<<<<<<< HEAD
const sortOptions = ['hot', 'new', 'top'];
=======
const sortOptions = ['hot', 'new', 'top', 'rising'];
>>>>>>> KAN-10-sort-tabs
```

- Everything between `<<<<<<< HEAD` and `=======` is what's on your current branch.
- Everything between `=======` and `>>>>>>> branch-name` is what's coming in from the other branch.

Manually edit the file to keep the correct version (or merge both), delete all three marker lines, then:

```bash
git add .
git commit -m "resolve conflict in sortOptions"
```

**Two habits that keep conflicts rare:**
- Keep PRs small and scoped to one ticket. A PR touching 15 files is where conflicts pile up.
- If your ticket is taking more than a day, pull `master` into your branch partway through:
  ```bash
  git checkout master
  git pull
  git checkout your-branch
  git merge master
  ```
  This catches conflicts early in small doses instead of one big mess at the end.

## Code Review Expectations

- Every PR needs one approval before merging.
- Leave comments as questions where possible, not commands — we're all learning here.
- If you're the reviewer and the PR looks good but has minor nits, approve with comments rather than blocking.
