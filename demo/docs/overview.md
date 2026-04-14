# Overview

> **MeteoYork**: An onboarding and explanation doc for the NYC Real Feel weather application.

## Purpose

MeteoYork solves a common NYC problem: standard weather apps provide "the numbers" (62°F and sunny) but fail to communicate the **"Real Feel"** influenced by microclimates and wind chill. New Yorkers often find themselves underdressed because an app didn't account for the bite of the wind on the platform or the shadows of Midtown.

## Context

Built as a demo for the ITHS Hackathon, this project demonstrates how to build a premium, cinematic UI using vanilla web technologies. It leverages the **Open-Meteo API** to fetch real-time data without requiring complex backend infrastructure or API keys.

## Key concepts

- **Real Feel**: A descriptive label (e.g., Cold, Crisp, Comfortable) that categorizes the weather based on subjective human comfort rather than just raw temperature.
- **The Drop**: A mental model for New Yorkers who need to know if the temperature will plummet while they are out for the day.
- **Microclimate Sensitivity**: Designing for a city where the difference between a sunny street and a windy subway station is significant.

## System boundaries

- **MeteoYork (This Repo)**: Handles UI, state management, and the `feelCalculator` logic.
- **Open-Meteo API (External)**: Provides the raw meteorological data.
- **Browser**: The execution environment; no server-side processing is required.
