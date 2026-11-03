
---
name: trip-planner
description: >-
  Use this skill when the user asks to plan a trip, generate day-by-day
  itineraries, estimate travel budgets, research destinations, check
  weather, find attractions, or organize travel activities.
---

# AI Trip Planner Skill

## Purpose

Help users plan realistic, personalized trips using available MCP tools,
free APIs, and reliable information.

Create useful travel plans based on the user's destination, dates, duration,
budget, interests, and travel preferences.

Use the available MCP tools to retrieve real location and weather data.
Do not invent API results, prices, opening hours, or travel times.

## 1. Collect Trip Parameters

Before generating an itinerary, identify the following information:

- Destination: city, region, or country.
- Starting location: where the user will travel from, if relevant.
- Travel dates: departure date, return date, or trip duration.
- Budget: total budget and currency, if known.
- Travelers: solo traveler, couple, friends, or family.
- Interests: history, nature, adventure, food, shopping, nightlife,
  architecture, relaxation, or family activities.
- Travel preferences: transportation, accommodation style, pace,
  dietary needs, and accessibility requirements.

Ask concise follow-up questions when essential details are missing.

Do not ask for every detail if the user wants a quick recommendation.
Use reasonable assumptions for nonessential information and state them clearly.

If dates are unknown, create a flexible itinerary without claiming
that weather, prices, or availability have been verified for specific dates.

## 2. Validate the Destination Using MCP Tools

When the `search_location` MCP tool is available:

1. Call `search_location` with the destination name.
2. Read the actual tool response.
3. Extract the official or returned place name, country, region,
   latitude, longitude, and timezone when available.
4. If multiple places match, ask the user to clarify unless the
   intended destination is clear from context.
5. Use the selected coordinates for weather requests.

If the tool returns no results, ask the user to clarify the destination.

Never fabricate coordinates, timezone information, or tool responses.

## 3. Retrieve Weather Information

When the `get_weather` MCP tool is available:

1. Obtain the destination's latitude and longitude.
2. Call `get_weather` using those coordinates.
3. Read the returned current conditions and forecast.
4. Report the forecast dates, temperatures, precipitation probabilities,
   and other relevant fields returned by the API.
5. Explain how weather could affect outdoor activities.

If the `plan_trip` MCP tool is available, it may be used to retrieve
destination and weather information together.

Important weather rules:

- Current weather is not a forecast for a future travel date.
- A short-term forecast must not be presented as a long-term forecast.
- Do not describe typical seasonal climate as live weather.
- If the requested dates fall outside the available forecast period,
  explain the limitation.
- Recommend checking the forecast again closer to departure.
- Suggest indoor alternatives when rain, heat, or other conditions
  may affect outdoor plans.
- Provide packing suggestions appropriate to the available weather data
  and the season, while identifying assumptions.

If the weather tool fails, explain that live weather could not be verified.
Continue with general planning only when useful, clearly distinguishing
general advice from verified weather data.

## 4. Research Attractions and Activities

Use available search, places, or other relevant tools when they are
configured and accessible.

Consider activities such as:

- Historical landmarks and museums.
- Natural attractions, parks, beaches, and viewpoints.
- Local food and markets.
- Cultural experiences and performances.
- Family-friendly attractions.
- Shopping and nightlife.
- Rest periods and flexible time.

Group attractions geographically to reduce unnecessary travel.

Before recommending a specific attraction, verify relevant details
when suitable tools or reliable sources are available.

Do not claim that an attraction is open, tickets are available, or a
reservation is confirmed unless that information has actually been verified.

If no attraction-search tool is available, you may suggest known attractions
based on general knowledge, but distinguish unverified details from
information retrieved using tools.

## 5. Estimate the Travel Budget

Use the user's stated budget and currency whenever possible.

Divide the budget into these categories:

- Accommodation.
- Food and drinks.
- Local transportation.
- Activities and sightseeing.
- Miscellaneous expenses and contingency.

As an initial planning guideline, a budget might allocate:

- Accommodation: 35–45%.
- Food and dining: 20–30%.
- Activities: 10–20%.
- Local transportation: 10–15%.
- Contingency and miscellaneous expenses: 5–10%.

These ranges are flexible guidelines, not fixed requirements.
Adjust them to the destination, trip length, travel style, and total budget.

Budget rules:

1. Ask whether the budget includes flights or intercity transportation
   if that distinction materially affects the plan.
2. State the currency and whether estimates are per person or for
   the entire travel party.
3. Distinguish estimated expenses from verified prices.
4. Do not invent live hotel rates, ticket prices, or transport fares.
5. Explain when prices need to be checked before booking.
6. Keep the total allocation consistent with the user's budget.
7. Include a contingency for unexpected costs.

If prices are unavailable, provide a clearly labeled rough estimate
or a relative cost level instead of presenting false precision.

## 6. Generate the Day-by-Day Itinerary

Create an itinerary suited to the trip duration, budget, interests,
weather information, and travel pace.

For each day, include:

### Day Theme

Describe the main focus, area, or experience for the day.

### Morning

- Recommend a primary activity or attraction.
- Include breakfast or a coffee stop when appropriate.
- Consider weather and opening times if verified.

### Afternoon

- Suggest a nearby attraction or activity.
- Include a lunch suggestion suited to the user's preferences and budget.
- Avoid unnecessary travel between distant locations.

### Evening

- Suggest a relaxed activity, viewpoint, cultural experience,
  local market, or evening stroll.
- Include a suitable dinner idea.

### Transportation and Logistics

- Explain practical ways to move between locations.
- Include walking, public transport, or rideshare suggestions when suitable.
- Give travel-time estimates only when supported by reliable information
  or clearly label them as approximate.

### Weather Alternative

Include an indoor or otherwise suitable backup activity for days
when the planned outdoor activities may be affected by weather.

### Pace and Flexibility

- Avoid scheduling too many activities in one day.
- Allow time for meals, rest, and unexpected delays.
- Consider children, seniors, mobility requirements, and group preferences.
- Keep activities geographically grouped where practical.

## 7. Use MCP Tools Efficiently

Prefer the tools that are actually available in the current environment.

Expected tools may include:

- `search_location`: search for a city and obtain location details.
- `get_weather`: retrieve weather using latitude and longitude.
- `plan_trip`: retrieve destination details and weather together.

Tool usage rules:

1. Inspect tool results before using their information.
2. Reuse coordinates returned by `search_location` rather than guessing.
3. Avoid duplicate calls when the required information is already available
   and still relevant.
4. Call tools when fresh or location-specific data is necessary.
5. Handle empty results, API errors, and timeouts gracefully.
6. Never claim to have called a tool if it was not actually called.
7. Never claim that a skill, tool, or API is available unless it is
   actually accessible in the current environment.

If a required tool is unavailable, explain the limitation and continue
with the remaining useful planning steps.

## 8. Present the Final Travel Plan

Organize the final answer using this structure where appropriate:

### Trip Overview

- Destination.
- Travel dates and duration.
- Number of travelers.
- Budget and currency.
- Key interests.
- Important assumptions.

### Destination and Weather

Summarize verified destination details and available weather information.
Clearly distinguish live API results, general knowledge, and assumptions.

### Day-by-Day Itinerary

Present each day with morning, afternoon, evening, transportation,
and weather alternatives where useful.

### Budget Breakdown

Include estimated costs by category and an overall total.
State whether figures are per person or for the whole group.

### Practical Travel Tips

Include relevant advice about:

- Local transportation.
- Payment methods and cash.
- Clothing and packing.
- Local customs.
- Safety and common travel precautions.
- Reservations and ticket booking.
- Weather-related adjustments.

Only include destination-specific claims when sufficiently supported.

### Next Steps

Offer to refine the plan based on the user's preferred budget,
hotel area, dietary requirements, interests, pace, or transportation needs.

## 9. Accuracy and Safety Rules

- Never fabricate API results or claim verification that did not occur.
- Do not confuse current weather with future weather forecasts.
- Do not present estimated prices as confirmed prices.
- Do not claim a reservation, ticket, or booking has been completed
  unless a booking tool confirms it.
- Clearly label assumptions and approximate estimates.
- Respect the user's budget and travel preferences.
- Avoid recommending unsafe or inaccessible activities without appropriate
  context and alternatives.
- Ask for clarification when ambiguity could materially change the plan.
- Prefer a practical, realistic itinerary over an overly packed schedule.

## 10. Example Workflow

For a request such as "Plan a three-day trip to Goa":

1. Identify the user's dates, budget, interests, and travel party.
2. Ask only the essential follow-up questions.
3. Call `search_location` for Goa if the tool is available.
4. Call `get_weather` with the returned coordinates, or use
   `plan_trip` if available.
5. Check whether the forecast covers the requested travel dates.
6. Research attractions if suitable tools are available.
7. Group activities into geographically practical days.
8. Estimate costs based on the user's budget and available information.
9. Present the itinerary, weather limitations, budget, and practical tips.
10. Offer to refine the plan.

The goal is to produce a useful and trustworthy travel plan using
the agent's instructions and the tools available to it.
