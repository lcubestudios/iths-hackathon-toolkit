# Project Scope: MeteoYork

## Overview
**Project Name:** MeteoYork  
**Tagline:** NYC weather that actually tells you what to do with your day.

## The Problem
Standard weather apps provide "the numbers" (e.g., 62°F and sunny) but often fail to communicate the "Real Feel" influenced by NYC's microclimates and wind chill. New Yorkers frequently find themselves underdressed because an app didn't account for the bite of the wind on the A train or the shadows of Midtown.

## Target Audience
Anyone living in or commuting to NYC who has felt betrayed by a standard weather app and needs a reliable "what it actually feels like" assessment.

## MVP Features (Phase 1)
- **Current Conditions with REAL Feel:** 
    - Real-time temperature, wind speed, and precipitation chance.
    - A descriptive "What it actually feels like" label (e.g., Cold, Crisp, Comfortable, Warm, Hot).
- **24-Hour Temperature Curve:**
    - A visual, animated graph showing temperature trends over the next 24 hours.
    - Focus on "seeing the drop" before it hits.
- **Location:** Hardcoded to NYC (New York, NY).
- **Branding:** Apple-inspired premium aesthetic (minimalist, high contrast, cinematic).

## Technical Specifications
- **Data Source:** Open-Meteo API (No key required).
- **Coordinates:** Lat: 40.7128, Lng: -74.0060.
- **Tech Stack:** Vanilla HTML, CSS (Vanilla), Javascript (ES6 Modules).

## Out of Scope (Not Building)
- 7-day forecast.
- Location search/GPS.
- Push notifications.
- User accounts/Personalization.
- Radar maps.
- Hourly alerts.

## The "Wow" Moment
The 24-hour temperature curve animating in on load, providing an immediate visual understanding of the day's progression—specifically highlighting sudden temperature drops.
