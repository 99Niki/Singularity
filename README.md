Travelers waste time turning scattered recommendations into a practical trip plan. The smallest version is one itinerary workspace that turns their preferences into an editable, day-by-day plan for one city.

# Singularity

A personal-first travel planner with optional shared editing. Start with your own
trip, then invite others to view and edit the same plan.

## MVP scope

- English-language web app for New York, Los Angeles, Chicago, San Francisco, and Las Vegas.
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
