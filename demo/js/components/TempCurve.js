import { NYCMap } from './NYCMap.js';

export function TempCurve(boroughsData, activeIndex, mode = 'temp', vizMode = 'trends') {
  const activeBorough = boroughsData[activeIndex];
  const hourly = activeBorough.hourly;
  
  // Use the first 24 hours
  const data = hourly.slice(0, 24);
  const isTemp = mode === 'temp';
  const isWind = mode === 'wind';
  const isRain = mode === 'rain';
  const isTrends = vizMode === 'trends';
  
  const values = data.map(d => {
    if (isTemp) return d.temp;
    if (isWind) return d.wind;
    return d.precipProb;
  });
  
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = (maxValue - minValue) || 1;

  // SVG Dimensions
  const width = 800;
  const height = 200;
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  const colors = {
    temp: 'var(--color-blue-apple)',
    wind: '#00a699',
    rain: '#5856d6' // iOS Indigo
  };

  const themeColor = colors[mode] || colors.temp;
  const unit = isTemp ? '°' : (isWind ? ' mph' : '%');
  
  const titleMap = {
    temp: '24-Hour Temperature Curve',
    wind: '24-Hour Wind Speed Trend',
    rain: '24-Hour Rain Probability'
  };

  const subtitleMap = {
    temp: 'See the drop before it hits.',
    wind: 'Feel the gust before it blows.',
    rain: 'Know the pour before you go.'
  };

  const title = isTrends ? titleMap[mode] : 'NYC Borough Conditions';
  const subtitle = isTrends ? subtitleMap[mode] : 'Current readings across the city.';

  // Map data to SVG coordinates
  const points = data.map((d, i) => {
    const val = isTemp ? d.temp : (isWind ? d.wind : d.precipProb);
    const x = padding + (i * (chartWidth / (data.length - 1)));
    const y = height - padding - ((val - minValue) * (chartHeight / range));
    return { x, y, val: val, time: d.displayTime };
  });

  // Generate Path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cp1x = curr.x + (next.x - curr.x) / 2;
    const cp2x = curr.x + (next.x - curr.x) / 2;
    pathD += ` C ${cp1x} ${curr.y}, ${cp2x} ${next.y}, ${next.x} ${next.y}`;
  }

  return `
    <section class="light temperature-viz">
      <div class="viz-header">
        <div class="header-content">
          <h2>${title}</h2>
          <p class="subtitle">${subtitle}</p>
        </div>
        <div class="toggle-container">
          <div class="viz-toggle-group main-toggle">
            <button class="viz-toggle ${isTrends ? 'active' : ''}" data-viz="trends">Trends</button>
            <button class="viz-toggle ${!isTrends ? 'active' : ''}" data-viz="map">NYC Map</button>
          </div>
          <div class="viz-toggle-group sub-toggle" style="${isTrends ? '' : 'display: none'}">
            <button class="viz-toggle ${isTemp ? 'active' : ''}" data-mode="temp">Temp</button>
            <button class="viz-toggle ${isWind ? 'active' : ''}" data-mode="wind">Wind</button>
            <button class="viz-toggle ${isRain ? 'active' : ''}" data-mode="rain">Rain</button>
          </div>
        </div>
      </div>
      
      <div class="viz-container trends-viz" style="${isTrends ? '' : 'display: none'}">
        <svg viewBox="0 0 ${width} ${height}" class="curve-svg">
          <defs>
            <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${themeColor};stop-opacity:0.2" />
              <stop offset="100%" style="stop-color:${themeColor};stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="${pathD}" fill="none" stroke="${themeColor}" stroke-width="3" stroke-linecap="round" class="main-curve" />
          ${points.filter((_, i) => i % 6 === 0).map(p => `
            <line x1="${p.x}" y1="${padding}" x2="${p.x}" y2="${height - padding}" stroke="rgba(0,0,0,0.05)" stroke-dasharray="4" />
            <text x="${p.x}" y="${height - padding + 20}" font-size="10" text-anchor="middle" fill="rgba(0,0,0,0.4)">${p.time.split(':')[0]}${p.time.slice(-2)}</text>
          `).join('')}
          <text x="${points[values.indexOf(maxValue)].x}" y="${points[values.indexOf(maxValue)].y - 15}" font-weight="600" text-anchor="middle" fill="${themeColor}">${maxValue}${unit}</text>
          <text x="${points[values.indexOf(minValue)].x}" y="${points[values.indexOf(minValue)].y + 25}" font-weight="600" text-anchor="middle" fill="${themeColor}">${minValue}${unit}</text>
        </svg>
      </div>

      <div class="viz-container map-viz" style="${!isTrends ? '' : 'display: none'}">
        ${NYCMap(boroughsData, activeBorough.id)}
      </div>
    </section>
  `;
}
