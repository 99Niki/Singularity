## Travelers waste time turning scattered recommendations into a practical trip plan. The smallest version is one command and a few questions that turns their preferences into editable and sharable plan for destinations.

# Singularity

A personal-first travel planner with optional shared editing. Start with your own
trip, then invite others to view and edit the same plan.

## MVP scope

- English-language web app for trip planner with U.S. Cities.
- One destination per trip; exact dates and a confirmed hotel are optional.
- Conversational preferences followed by a complete itinerary draft.
- Editable stops, suggested timing, meal breaks, and API-backed transportation estimates.
- Per-person or whole-group budgets with clearly labeled cost estimates.
- Clerk accounts and optional invitation-based collaboration.
- Saved TikTok and Instagram inspiration links, not unrestricted social scraping.

See [SPEC.md](SPEC.md) for requirements, exclusions, and proposed setup.
See [AGENTS.md](AGENTS.md) for implementation instructions.

## Technology

TypeScript, Next.js, React, Clerk, PostgreSQL hosted on Supabase, and Drizzle.
AI, places, and routing integrations run on the backend.
