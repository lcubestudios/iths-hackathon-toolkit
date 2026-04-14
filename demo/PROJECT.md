# Project Spec: MeteoYork

> **This file**: requirements, acceptance criteria, and user stories.
> For implementation details, see `docs/architecture.md`.

## What we're building

MeteoYork is a high-end, interactive weather dashboard specifically designed for the micro-climates of New York City's five boroughs. It features a tactile card carousel for borough navigation, an interactive SVG map for city-wide context, and detailed 24-hour trend visualizations for temperature, wind, and rain probability.

## Who it's for

- **NYC Commuters**: Need to know if "the drop" is coming before they head out.
- **Hackathon Developers**: A reference architecture for building premium vanilla JS applications.

## Success criteria

- [x] **Multi-Location Support**: Data for all 5 boroughs plus "NYC Overall".
- [x] **Zero-Latency Navigation**: Using batched fetching and intersection observers for smooth swiping.
- [x] **Interactive Context**: Visualizations (trends & map) stay in sync with the active carousel card.
- [x] **Premium Aesthetics**: Dark mode, glassmorphism, and Apple-inspired curves.

## User stories

- As a **commuter**, I want to **swipe between Brooklyn and Manhattan** so that I can **plan my outfit for both sides of the bridge**.
- As a **pedestrian**, I want to **check the rain probability tab** so that I **know if I need an umbrella at 5 PM**.
- As a **manager**, I want to **see a map of the whole city** so that I can **visualize conditions across all field offices at once**.

## Out of scope

- Real-time radar (requires heavy GIS infrastructure).
- Historical data beyond 24 hours.

## Technical Milestones

- [x] **Phase 1**: Base NYC Temperature Graph.
- [x] **Phase 2**: Multi-Borough Carousel & Batched Fetching.
- [x] **Phase 3**: Interactive NYC Map & Trends Expansion (Wind/Rain).
