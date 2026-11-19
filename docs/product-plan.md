# Singularity — first release

## Product
An English-language, personal-first travel planner with optional collaboration.
Initial destinations: New York, Los Angeles, Chicago, San Francisco, Las Vegas.
One destination per trip. Generate the complete itinerary, not one day at a time.
Exact dates and confirmed accommodation are optional; make assumptions visible.

## Budget
Allow per-person or whole-group budget entry. Track traveler count separately from
collaborator count. Show explicitly labeled estimates for hotels, meals, flights,
local transportation, and experiences. Unavailable costs must remain unknown, not $0.

## Identity and access
Clerk: Google sign-in and email verification. Accounts required to create or join.
Owner-generated, revocable invite links; authenticated recipients explicitly join.
All members edit preferences, dates, accommodation, stops, and schedules and can
request complete itinerary regeneration. Only owners delete trips, manage access,
remove members, or transfer ownership. Enforce permissions on the server/database.

## Safe collaboration
AI changes are previews requiring confirmation. Use trip revisions to prevent a
stale generation from replacing newer edits. Keep history and undo. Share one trip,
not member-specific copies. Do not use last-write-wins for full-trip replacements.

## Architecture
Next.js/React/TypeScript; PostgreSQL hosted on Supabase; Drizzle migrations;
Clerk identity; authenticated Supabase Realtime integration to evaluate; server-side
AI/places/routing adapters. Secrets never go in client bundles. Evaluate Zod for
request validation and Tailwind if useful; initial UI uses plain CSS.

## Initial UI prototype
Local sample itinerary and budget; day selection, moving/removing stops, undo,
budget display mode, and saved inspiration links. Sample values are not live quotes.
No account system, database, AI generation, verified routing, or collaboration yet.
Other cities are selectable but must not display the New York sample as their own.

## External data and cost
Verify places through a licensed API; derive routes from routing services, not AI.
Save TikTok/Instagram source links first. Do not promise arbitrary social search,
video access, or comment retrieval. No fabricated reviews. Check embed permissions.
Verify current free-tier limits before selecting/deploying providers. Enforce AI
quotas; viewing and manual edits remain possible after exhaustion. Recomputed
travel times may remain pending when provider quotas are exhausted.

## Next implementation milestones
1. Clerk integration, database schema/migrations, authorization tests.
2. Persistent personal trips and structured conversational intake.
3. Verified places, AI generation previews, routing, and usage limits.
4. Invitations, realtime, revision checks, activity history, undo.
5. Supported social embeds and validation across all five cities.
