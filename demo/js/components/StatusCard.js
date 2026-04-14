/**
 * Status Card Component for MeteoYork
 * Displays the current 'Real Feel' and actionable advice.
 */

import { getFeelLabel, getClothingAdvice } from '../feelCalculator.js';

export function StatusCard(data) {
  const current = data.current;
  const boroughName = data.name || 'NYC';
  const { label, icon, color } = getFeelLabel(current.feel, current.wind);
  const advice = getClothingAdvice(label);

  return `
    <section class="dark status-hero borough-card" data-borough="${data.id || 'nyc'}">
      <div class="card current-status" style="border-top: 4px solid ${color}">
        <div class="status-header">
          <div class="header-left">
            <i data-lucide="${icon}" class="status-icon" style="color: ${color}"></i>
            <span class="status-label" style="color: ${color}">${label.toUpperCase()}</span>
          </div>
          <span class="borough-badge">${boroughName}</span>
        </div>
        
        <div class="temp-display">
          <h1 class="current-temp">${current.temp}°</h1>
          <p class="real-feel">Feels like <strong>${current.feel}°</strong></p>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">WIND</span>
            <span class="stat-value">${current.wind} mph</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">PRECIP</span>
            <span class="stat-value">${current.precip}"</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">HUMIDITY</span>
            <span class="stat-value">${current.humidity}%</span>
          </div>
        </div>

        <div class="clothing-advice">
          <p class="advice-text">${advice}</p>
        </div>
      </div>
    </section>
  `;
}
