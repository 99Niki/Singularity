# Singularity — MVP product proposal

## Project stage

Singularity is at the planning stage. This document describes the intended product,
agreed first-release scope, and proposed technical direction. It is not a record of
completed implementation or a claim that integrations are already available.

## Problem and smallest useful experience

Travelers waste time turning scattered recommendations into a practical trip plan.
The smallest useful experience is one workspace that produces a complete,
editable itinerary for a single destination from the traveler's preferences.
Collaboration is optional, not a prerequisite for planning.

## Product vision

Build a colorful, social-inspiration travel app that connects conversational planning,
real travel information, and an editable itinerary in one place. The conversation is
the starting point; the main product is the saved trip workspace, not a chat response.

A person should be able to say, “Help me plan a three-day trip to New York,” answer
a few relevant questions, and receive the full trip draft. They can refine it alone
or invite others to work on exactly the same plan without starting over.

## Planned MVP capabilities

### 1. Account and trip setup

- Require an account to create or join a trip. Use Clerk Google sign-in and email verification.
- Support English and five cities: New York, Los Angeles, Chicago, San Francisco, Las Vegas.
- Plan one destination per trip. New York is the proposed initial validation city,
  with all five cities included in the intended first-release coverage.
- Collect trip length, optional dates, departure location when relevant, traveler count,
  interests, pace, transportation/accessibility needs, and accommodation preferences.
- Ask only for missing information, a few questions at a time. Allow optional answers to be skipped.
- Offer quick-choice answers where useful and allow “you decide.” Save answers as
  structured preferences so later requests such as “make it cheaper” do not require starting over.
- Let one person provide preferences for all travelers initially; do not require
  separate questionnaires from each person.
- Keep traveler count separate from the number of people collaborating.
- Allow per-person or whole-group budget input. Label currency and budget basis explicitly.
- Permit exploratory planning without exact dates or a confirmed hotel. Show assumptions,
  including the provisional starting area, and let users change them.
- When dates or accommodation are confirmed later, recheck affected hours, routes,
  and timing and propose adjustments rather than silently replacing the user's plan.

### 2. Complete, editable itinerary

- Generate all days at once from structured preferences and verified place candidates.
- Show each stop's name, location, reason to visit, estimated visit duration, and suggested start time.
- Explain why a place is appealing and why the day's stops fit together, using
  grounded summaries rather than fabricated claims or copied review text.
- Include meal breaks and suggested transportation with API-backed travel-time estimates.
- Consider geography and available opening-hour information; flag unknown or date-dependent details.
- Let users add, remove, replace, reorder, and move stops between days.
- Support conversational refinements such as “less walking,” “more local shops,” or
  “make Day 2 more relaxed,” including targeted changes instead of full-trip rewrites.
- Present a flexible schedule rather than a rigid minute-by-minute agenda. Show
  daily visit/travel totals and warn when a day appears overpacked.
- Recalculate affected routes after edits settle. Clearly mark pending or unavailable estimates.
- Preserve manual edits: AI regeneration creates a preview that requires confirmation.
- Reject or refresh outdated previews if the shared trip changed during generation.
- Keep an activity history and support undoing recent edits.
- Show understandable planning progress and recoverable errors while a draft is prepared.

### 3. Budget and supporting travel information

- Show separate estimate categories for accommodation, restaurants/meals, flights,
  local transportation such as subway, and experiences.
- Explain whether an estimate is per person, shared, per night, or for the whole trip.
- Do not treat unknown costs as zero or present partial totals as complete trip costs.
- Flight estimates require appropriate departure/date information and provider access.
  Missing flight data remains explicitly unavailable and does not block itinerary generation.
- Accommodation/transport suggestions may link out to providers; no in-app booking.
- Suggest a small set of hotels and relevant flight or intercity rail options with
  trade-offs when data is available. Provider access and geographic coverage still
  need evaluation; unavailable suggestions must not block the core destination plan.
- Identify sample values, live quotes, and broad estimates distinctly. Account for taxes
  and fees where available; otherwise disclose exclusions.

### 4. Optional shared workspace

- Trips are private by default. Owners can create and revoke invitation links.
- A recipient must sign in and explicitly accept before becoming a member.
- Warn owners that anyone holding a valid link can join. Revoking a link prevents new
  joins; removing an existing member is a separate owner action.
- All members can edit trip content and preferences and request full regeneration.
- Shared content includes dates, budgets, accommodation/transport details, inspiration,
  places, and schedules. The MVP does not have organizer-only hidden trip preferences.
- Only owners can delete the trip, manage invitations/members, or transfer ownership.
- Ownership transfer must go to an existing member and leave exactly one owner.
- Enforce permissions on the backend/database, not only in the interface.
- Share one itinerary and propagate updates to authorized members.
- Distinguish travelers from collaborators: a person can plan for several travelers
  without inviting them, or invite someone to help plan a solo trip.

### 5. Social inspiration

- Save HTTPS TikTok and Instagram source links to a trip's ideas list.
- Let users associate an idea with a verified place, manually if the content cannot be accessed.
- Preserve the original source link for collaborators.
- Use official embeds only when supported and permitted. Do not require content retrieval
  for a saved link to be useful.
- A user should be able to bring a place discovered in a post into the itinerary,
  with clarification if the place cannot be identified reliably from accessible information.

## AI, travel data, and real traveler feedback

The proposed planner combines three kinds of information:

1. **An existing AI model API:** interpret requests, ask follow-up questions, organize
   verified candidates, explain recommendations, and propose changes. The model
   provider remains to be selected; a chat subscription does not imply API access.
2. **Travel data APIs:** supply real place identifiers, coordinates, available hours,
   routing and travel times, and accommodation/transport information where supported.
   Weather is a possible later enhancement, not a required first-release integration.
3. **Traveler feedback and social inspiration:** retain source links and, where access
   and licensing permit, show real review themes or social content to help people
   understand the experience of visiting a place.

TikTok and Instagram are the initial social platforms of interest. Saving a link does
not guarantee access to its video, caption, or comments. Automatic social discovery,
video understanding, and comment retrieval require separate feasibility and permission
checks and are not dependencies for the first release.

Any future feedback display should link to original sources, show dates where available,
distinguish actual quotations from AI summaries, and avoid treating a few opinions as
universal agreement. Social posts are not proof of current hours, prices, safety, or
availability. Never invent reviews or imply that inaccessible comments were analyzed.

## Intended user journey

1. Open the web app and create an account or sign in.
2. Describe a trip and answer only the relevant missing questions.
3. Review visible assumptions and receive a complete day-by-day draft.
4. Explore the plan, budget estimates, and available place/transport information.
5. Edit stops directly or request a conversational refinement; review proposed AI changes.
6. Save TikTok/Instagram inspiration and associate ideas with places.
7. Optionally invite other people, who sign in and explicitly join the same trip.
8. Return to the saved workspace and continue planning alone or together.

## Experience and design direction

- Responsive web app first, usable on desktop and mobile; English initially.
- Colorful, welcoming, social-inspiration styling rather than a plain chat interface.
- A cohesive workspace for conversational intake, day-by-day itinerary, map/route
  context, budget details, saved inspiration, and sharing controls.
- Clear separation between confirmed information, estimates, assumptions, and missing data.
- Accessible controls, readable content, keyboard navigation, and helpful loading/error states.
- Personal planning must feel complete without ever creating a group or sending an invitation.

## Outside the MVP

- Native iOS/Android apps, multiple languages, or multi-city trips.
- In-app reservations, payments, ticket purchases, or guaranteed pricing/availability.
- Automatic merging of every traveler's individual preference questionnaire.
- Public trip discovery, a social feed, or direct messaging.
- Unrestricted Instagram/TikTok search, video extraction, scraping, or comment access.
- Unlimited free AI generation or a guarantee of zero-cost public operation.

Place comments, voting, presence indicators, personal notes, and individual preference
merging were discussed as possible enhancements. They are not confirmed first-release
requirements. A shared activity history and safe editing remain part of the core plan.

Fabricated places, ratings, reviews, hours, routes, or quotes are unacceptable at any stage.

## Proposed language and architecture

- **Language:** TypeScript throughout the application.
- **Framework:** Next.js App Router and React for a responsive web application.
- **Backend:** Next.js server routes/services; long-running planning work must not depend
  on a browser connection remaining open.
- **Identity:** Clerk; link database users to Clerk user IDs. Trip membership lives in
  PostgreSQL, not Clerk Organizations.
- **Database:** PostgreSQL hosted on Supabase, with Drizzle queries and migrations.
- **Realtime:** evaluate authenticated Supabase Realtime with Clerk; subscribe only to
  authorized trip data. Document the selected authentication/access approach before implementation.
- **Integrations:** replaceable server-side AI, places, and routing adapters. Check
  provider coverage, licensing, caching rules, and current free-tier terms first.
- **Core entities:** users, trips, preferences, memberships, invitations, days, stops,
  inspiration links, route estimates, revisions/activity, and generation usage/jobs.
- **Cost controls:** limited AI quota, request limits, usage tracking, and provider spending
  caps where supported. Viewing/manual editing remain available after quota exhaustion;
  route refreshes may remain pending. Never silently substitute fabricated data.

## Access and planned setup

End users will access the hosted application through a browser; no installation is
intended. They will sign in through Clerk before creating or joining trips.

For development, the planned workflow is a Node.js/npm environment, a local Next.js
server, environment-based service credentials, and PostgreSQL migrations. Exact
installation commands, environment variables, and deployment instructions will be
documented when implementation begins and providers are selected. No executable setup
is being promised at the planning stage.

## Budget and feasibility

Start with a $0 development/prototype budget where practical. Local development and
limited free service tiers may support early evaluation, but a reliable public app
cannot assume unlimited free AI, routing, map tiles, email delivery, or hosting.

Before implementation, evaluate current free-tier allowances, commercial-use terms,
provider approval requirements, data retention restrictions, and overage behavior.
No paid service should be enabled without approval. Use limited generation quotas
and transparent unavailable/pending states rather than silently incurring costs or
inventing data. Viewing and manual editing of saved trips should remain available
when AI quotas are exhausted; route updates may need to wait for service availability.

## Decisions still to evaluate

- AI, places, routing, map-tile, and accommodation/transport providers and their coverage.
- Feasibility of licensed review summaries and supported TikTok/Instagram embeds.
- Exact generation quotas, maximum trip size, and a sustainable public-launch budget.
- Authenticated realtime integration and the approach to concurrent edits and undo.
- Whether weather, voting, comments, or personal notes should follow the first release.

These decisions should refine the implementation plan without changing the agreed
personal-first experience, five-city scope, or shared-editing permissions.
