# Instructions and constraints for the coding agent

## Project scope

- Treat this as a new project at the planning stage. Do not begin implementation until requested.
- Follow `SPEC.md` and keep the MVP small. Ask before expanding the agreed scope.
- Build a personal-first web app with optional collaboration, not a group-only planner.
- Start with English and one destination per trip across the five agreed US cities.
- Use a colorful, social-inspiration design that works on desktop and mobile.

## Language and framework

- Use TypeScript, Next.js, and React for the frontend and backend.
- Use PostgreSQL hosted on Supabase, with Drizzle for database access and migrations.
- Use Clerk for Google sign-in and email verification; do not build custom authentication.
- Keep code readable and components small. Avoid unnecessary dependencies and services.

## Security, data, and cost

- No secrets in code or Git. Keep private API keys on the backend and use environment variables.
- Keep trips private and enforce permissions on the backend/database, not just in the UI.
- Let all invited members edit trip content. Reserve trip deletion, access management,
  member removal, and ownership transfer for the owner.
- Use real travel APIs. Never invent places, reviews, social comments, prices, or travel times.
- Clearly label assumptions, estimates, missing information, and sample data.
- Respect TikTok/Instagram access restrictions and provider terms; do not promise unrestricted scraping.
- Start with a $0 prototype budget where practical. Ask before enabling paid services.
- Limit AI usage while keeping saved trips viewable and manually editable after quota exhaustion.
- Preserve user edits; require confirmation before applying AI-generated replacements.

## Working practices

- Work on separate branches, not directly on `main`. Preserve existing user work.
- Do not commit, push, deploy, or publish issues unless requested.
- When implementation begins, check types, lint, builds, permissions, and key user flows.
- Check mobile layouts and keyboard accessibility. Report limitations and failures honestly.
- Keep documentation aligned with agreed plans; do not describe planned features as completed.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
