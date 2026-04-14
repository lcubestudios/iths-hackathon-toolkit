# Architecture

## Components

| Component | Responsibility | Tech |
|-----------|---------------|------|
| `weatherService.js` | Fetches batched data for multiple boroughs using Open-Meteo's coordinate array API. | Fetch API |
| `feelCalculator.js` | Pure logic module to map numerical temperatures to subjective labels. | Javascript |
| `BoroughCarousel.js` | Horizontal scroll-snap UI for browsing borough-specific weather cards. | CSS Snap / JS |
| `StatusCard.js` | UI component for the "Hero" section showing current borough real-feel. | Template Literal |
| `NYCMap.js` | Interactive SVG map of NYC boroughs with temperature labels and click-to-sync navigation. | SVG / JS |
| `TempCurve.js` | Data viz component with modes for Temperature, Wind, and Rain trends. | SVG / Bezier |
| `script.js` | Orchestrator managing state (active borough, viz mode) and component rendering. | ES6 Modules |

## Data flow

1. **Initialization**: `script.js` triggers on DOMContentLoaded.
2. **Batched Fetch**: `weatherService.js` makes a single async call for all 5 boroughs (NYC, Manhattan, Brooklyn, Queens, Bronx, Staten Island).
3. **Reactive Interaction**: 
   - Swiping the `BoroughCarousel` updates the active borough state via `IntersectionObserver`.
   - Clicking the `NYCMap` toggles specific borough focus.
4. **Render**: The processed data is passed into `StatusCard`, `TempCurve`, and `NYCMap` components.
5. **Visualization Toggle**: `script.js` manages switching between 24h Trends and the interactive Map view.

## Infrastructure

- **Hosting**: GitHub Pages or any static file host.
- **Client-Side**: 100% client-side execution; no backend server required.
- **Regions**: Specifically optimized for NYC's 5 boroughs.

## Key decisions

- **Batched Fetching**: Moved from parallel requests to a single batched array request to prevent API rate limiting (429 errors).
- **Scroll-Snap UX**: Implemented a horizontal "deck" for boroughs to mimic native mobile app behavior.
- **SVG over Canvas**: Chosen for `TempCurve` and `NYCMap` to ensure high-density display (Retina) support and easier DOM-based interaction.
- **Unified Map Aesthetic**: Removed internal borough strokes to create a "clean" urban landmass look.

See [decisions.md](decisions.md) for more details.
