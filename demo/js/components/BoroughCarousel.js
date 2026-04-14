/**
 * Borough Carousel Component for MeteoYork
 * Renders a horizontal scroll container with snap points for each borough.
 */

import { StatusCard } from './StatusCard.js';

export function BoroughCarousel(boroughsData) {
  const cardsHtml = boroughsData.map(data => StatusCard(data)).join('');

  return `
    <div class="carousel-outer">
      <div class="borough-carousel" id="borough-carousel">
        ${cardsHtml}
      </div>
      <div class="carousel-indicators">
        ${boroughsData.map((_, i) => `<div class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
      </div>
    </div>
  `;
}
