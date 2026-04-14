/**
 * Weather Service for MeteoYork
 * Fetches data from Open-Meteo API for NYC (40.71, -74.01)
 */

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const NYC_LAT = 40.7128;
const NYC_LNG = -74.0060;

export const BOROUGHS = [
  { id: 'nyc', name: 'NYC Overall', lat: 40.7128, lng: -74.0060 },
  { id: 'manhattan', name: 'Manhattan', lat: 40.7831, lng: -73.9712 },
  { id: 'brooklyn', name: 'Brooklyn', lat: 40.6782, lng: -73.9442 },
  { id: 'queens', name: 'Queens', lat: 40.7282, lng: -73.7949 },
  { id: 'bronx', name: 'Bronx', lat: 40.8448, lng: -73.8648 },
  { id: 'si', name: 'Staten Island', lat: 40.5795, lng: -74.1502 }
];

export async function fetchWeather(lat = NYC_LAT, lng = NYC_LNG) {
  const isArray = Array.isArray(lat);
  const params = new URLSearchParams({
    latitude: isArray ? lat.join(',') : lat,
    longitude: isArray ? lng.join(',') : lng,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m',
    hourly: 'temperature_2m,apparent_temperature,precipitation_probability,wind_speed_10m',
    timezone: 'America/New_York',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    forecast_days: 1
  });

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Weather data fetch failed');
    
    const data = await response.json();
    
    if (isArray) {
      return data.map(result => processWeatherData(result));
    }
    return processWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

export async function fetchAllBoroughs() {
  const lats = BOROUGHS.map(b => b.lat);
  const lngs = BOROUGHS.map(b => b.lng);
  
  const results = await fetchWeather(lats, lngs);
  
  return BOROUGHS.map((b, index) => ({
    ...b,
    ...results[index]
  }));
}

function processWeatherData(data) {
  // Format current conditions
  const current = {
    temp: Math.round(data.current.temperature_2m),
    feel: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    wind: Math.round(data.current.wind_speed_10m),
    precip: data.current.precipitation,
    time: data.current.time
  };

  // Format hourly for the curve (next 24 hours)
  const hourly = data.hourly.time.map((time, index) => ({
    time: time,
    displayTime: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    hour: new Date(time).getHours(),
    temp: Math.round(data.hourly.temperature_2m[index]),
    feel: Math.round(data.hourly.apparent_temperature[index]),
    precipProb: data.hourly.precipitation_probability[index],
    wind: Math.round(data.hourly.wind_speed_10m[index])
  }));

  return { current, hourly };
}
