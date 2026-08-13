# postfeed — Product Requirements Document

A Reddit client built with React + Redux Toolkit, for the Codecademy Front-End Engineer Career Path portfolio project — run as a 3-person group project.

Repo: https://github.com/abdioshaikhyt/postfeed

---

## Problem Statement

Codecademy's Reddit Client portfolio project requires demonstrating end-to-end front-end engineering: React, Redux, routing, testing (unit + e2e), responsive/accessible design, and deployment — all built from an unopinionated brief with no starter code. Doing this well, to a professional finish, with wireframes, a design system, animations, and 90+ Lighthouse scores, is a lot of surface area for one person to cover to a high standard in reasonable time. Codecademy explicitly supports tackling it as a group project instead, splitting the work across complementary roles.

## Solution

Build "postfeed" — a read-only Reddit client using Reddit's public JSON API (no OAuth required), with a home feed, subreddit browsing, sorting, search, and a full post detail + nested comments view. Ship it as a polished, tested, deployed portfolio piece with a clear division of labour across three collaborators, so each person can point to a real owned piece of the finished product.

## Team Roles

Based on Codecademy's suggested group project structure:

1. **Team Lead / Core Developer** (Abdul) — owns Redux architecture, API integration layer, routing, and overall technical direction. Final call on architectural decisions.
2. **UX/UI Designer–Developer** — owns the design system (colour, type, spacing), dark/light theming, skeleton loading states, animations/transitions, and translating the wireframes below into real CSS. Also codes their own components.
3. **Front-End Developer** — owns comment rendering (nested threads + Markdown), search, and testing (Jest/Enzyme unit tests + Cypress e2e). Also codes their own components.

All three roles write code and tests for their own areas — this isn't a designer-plus-two-devs split, everyone ships working, tested features.

## Wireframes

### Home Feed
Subreddit sidebar for navigation, sort tabs (Hot / New / Top / Rising), and a scrolling list of post cards. Includes an example of the skeleton loading state.

![Home Feed Wireframe](./wireframe-home-feed.svg)

### Post Detail
Full post view with subreddit info sidebar and a nested comment thread below, indented by reply depth.

![Post Detail Wireframe](./wireframe-post-detail.svg)

### Search Results
Search results list with a placeholder for the empty/error state and retry action.

![Search Wireframe](./wireframe-search.svg)

## Technologies Used

- **React** — UI
- **Redux Toolkit + React Redux** — state management
- **React Router (v6)** — client-side routing
- **Vite** — build tool / dev server
- **Reddit JSON API** — data source (no auth — append `.json` to any Reddit URL)
- **react-markdown** — rendering comment bodies (Reddit returns comments as Markdown)
- **Jest + Enzyme** — unit tests
- **Cypress** — end-to-end tests
- **Netlify** — hosting + CI/CD (auto-deploy on push to `master`)

## User Stories

1. As a visitor, I want to see a populated feed the moment I land on the site, so that I don't hit a blank page.
2. As a visitor, I want to browse a list of predefined subreddits (r/popular, r/worldnews, r/technology, r/gaming, r/movies, r/science, r/sports, r/aww), so that I can explore different topics without knowing exact subreddit names.
3. As a visitor, I want to click a subreddit in the sidebar and see that subreddit's posts, so that I can browse a specific topic.
4. As a visitor, I want to sort a feed by Hot, New, Top, or Rising, so that I can control how content is ranked.
5. As a visitor, I want to search for posts by keyword, so that I can find specific content across Reddit.
6. As a visitor, I want search results to show the same post-card format as the feed, so that the experience feels consistent.
7. As a visitor, I want to click a post and see its full content and comments, so that I can read the full discussion.
8. As a visitor, I want comments displayed with correct nesting/indentation, so that I can follow reply threads.
9. As a visitor, I want comment bodies rendered from Markdown (bold, links, paragraphs, etc.), so that formatting isn't shown as raw syntax.
10. As a visitor, I want to see upvote counts and comment counts on both post cards and the detail view, so that I can gauge post popularity.
11. As a visitor, I want to see skeleton loading placeholders while data fetches, so that the app feels responsive rather than frozen.
12. As a visitor, I want a clear error message with a retry option if a request fails (e.g. rate limit hit), so that I'm never stuck on a broken screen.
13. As a visitor, I want to toggle between dark and light mode, so that I can use the app comfortably in different lighting.
14. As a visitor, I want the app to work well on both mobile and desktop, so that I can use it on any device.
15. As a visitor, I want smooth transitions/animations (e.g. skeleton shimmer, route transitions, hover states), so that the app feels polished rather than static.
16. As a visitor, I want post images/thumbnails to load without blocking the rest of the page, so that browsing feels fast.
17. As a developer on this project, I want each feature's Redux state isolated in its own slice, so that features can be built and tested independently.
18. As a developer on this project, I want cached responses in the Redux store, so that re-visiting a subreddit doesn't burn API rate limit unnecessarily.
19. As a developer on this project, I want unit tests for components and Redux logic, so that we catch regressions before merging.
20. As a developer on this project, I want e2e tests covering the core user flows (browse → click post → see comments; search → see results), so that we know the whole app works end-to-end, not just in isolation.
21. As a developer on this project, I want CI/CD via Netlify, so that every merge to `master` deploys automatically without manual steps.
22. As a portfolio reviewer, I want a README with wireframes, tech stack, features, and future work clearly documented, so that I can quickly understand the project's scope and quality.

## Implementation Decisions

- **Routing:**
  - `/` — Home feed, defaults to r/popular
  - `/r/:subreddit` — Subreddit feed
  - `/r/:subreddit/comments/:postId` — Post detail + comments
  - `/search` — Search results
- **State management:** Redux Toolkit slices split by feature — `postsSlice`, `commentsSlice`, `searchSlice`, `subredditsSlice`, `uiSlice` (theme, loading/error UI state).
- **Data fetching:** Reddit JSON API via `fetch`, no auth. Append `.json` to Reddit URLs; search uses `/search.json?q=`.
- **Rate limiting (10 req/min):** cache fetched listings in the Redux store keyed by subreddit+sort, so switching back to an already-fetched view doesn't re-fetch. Failed requests surface a retry-able error state rather than failing silently.
- **Folder structure:**
  - `src/components/` — shared/reusable UI (post card, vote control, header, sidebar)
  - `src/pages/` — route-level pages (Home, PostDetail, Search)
  - `src/features/` — Redux slices + feature-specific logic
- **Markdown rendering:** `react-markdown` for comment bodies.
- **Loading UX:** skeleton placeholders matching the shape of the real content (not spinners), with a shimmer animation.
- **Theming:** dark/light mode toggle, likely via a CSS variables + a top-level theme context or `uiSlice` flag.
- **Read-only scope:** no voting, commenting, or posting — JSON API doesn't support write operations. Documented as future work (OAuth login) in the README.

## Testing Decisions

- **Unit tests (Jest + Enzyme):** cover components (post card, sidebar, comment thread, sort tabs) and Redux slices/reducers in isolation. Test behavior (renders correct content given props/state), not implementation details.
- **E2E tests (Cypress):** cover the two core user flows end-to-end — (1) land on home feed → switch subreddit → open a post → see comments render, and (2) search a term → see results → open a result. Also cover the error-state + retry path.
- **Ownership:** Front-End Developer role owns the test suite setup and comment/search test coverage; each contributor writes tests for the components/slices they build.

## Out of Scope

- OAuth login, voting, commenting, or posting (JSON API is read-only)
- Custom domain (optional in spec, skipped — no domain owned)
- User accounts / saved posts
- Real-time updates (no polling/websockets)

## Further Notes

- PWA support and CI/CD are both in scope as "optional" spec items we're treating as included, since Netlify makes CI/CD nearly free and PWA is a stretch goal once core features are done.
- Lighthouse 90+ is a hard target for everything except media-heavy scores directly caused by Reddit's own image/video payloads, per the spec's own carve-out.
- Team communication/kickoff should follow Codecademy's group project guidance: intro with % of path completed, timezone, Codecademy profile link, and a fun fact, then a kickoff call to assign initial issues.
