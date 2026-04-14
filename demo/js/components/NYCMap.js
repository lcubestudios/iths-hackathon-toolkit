/**
 * NYC Map Component for MeteoYork
 * Renders a stylized SVG map of NYC boroughs with dynamic weather data labels.
 */

export function NYCMap(boroughsData, activeBoroughId) {
  // Stylized paths for NYC boroughs (Simplified for clean look)
  const boroughPaths = [
    { id: 'bronx', name: 'Bronx', d: "M205,15 L265,25 L290,70 L245,95 L200,90 Z" },
    { id: 'manhattan', name: 'Manhattan', d: "M185,90 L205,100 L175,185 L145,170 Z" },
    { id: 'queens', name: 'Queens', d: "M240,100 L345,115 L355,225 L265,220 L235,175 Z" },
    { id: 'brooklyn', name: 'Brooklyn', d: "M225,170 L260,225 L235,315 L145,280 L165,185 Z" },
    { id: 'si', name: 'Staten Island', d: "M75,285 L135,290 L150,345 L110,385 L55,345 Z" }
  ];

  const labels = boroughPaths.map(path => {
    const data = boroughsData.find(b => b.id === path.id);
    if (!data) return '';

    // Centroid-ish positions for labels
    const positions = {
      bronx: { x: 240, y: 50 },
      manhattan: { x: 175, y: 130 },
      queens: { x: 290, y: 160 },
      brooklyn: { x: 200, y: 240 },
      si: { x: 100, y: 330 }
    };

    const pos = positions[path.id];
    const isActive = path.id === activeBoroughId;

    return `
      <div class="map-label ${isActive ? 'active' : ''}" 
           style="left: ${pos.x}px; top: ${pos.y}px;" 
           data-borough="${path.id}">
        <span class="label-name">${path.name}</span>
        <span class="label-temp">${data.current.temp}°</span>
      </div>
    `;
  }).join('');

  return `
    <div class="map-container">
      <svg viewBox="0 0 400 400" class="nyc-svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        ${boroughPaths.map(p => `
          <path d="${p.d}" 
                class="borough-path ${p.id === activeBoroughId ? 'active' : ''}" 
                data-borough="${p.id}" />
        `).join('')}
      </svg>
      <div class="map-labels">
        ${labels}
      </div>
    </div>
  `;
}
