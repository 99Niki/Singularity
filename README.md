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

## Run status

The `UI` branch contains a runnable Next.js + TypeScript frontend
prototype. It uses sample data and does not require API keys or a configured
`.env.local` file.

Requires Node.js 20.9+ and npm. From the project root:

```sh
npm install
npm run dev
```

Open http://localhost:3000 to explore the itinerary, edit sample stops, switch
budget views, and save inspiration links for the current session.

Authentication, backend services, database persistence, AI planning, routing, and
live collaboration are not connected yet. Changes reset on refresh.

### Development checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Current scope

Next.js + TypeScript UI with an editable New York sample itinerary, day tabs,
move/remove/undo controls, illustrative per-person/group budgets, and an inspiration
link list. Changes are in-memory and reset on refresh. Other supported destinations
show a placeholder rather than a misleading New York itinerary.

Authentication, database persistence, AI planning, live prices/routes, social content
retrieval, and shared editing are not connected. See `.env.example` for planned
credentials and [the product plan](docs/product-plan.md) for architecture and scope.
