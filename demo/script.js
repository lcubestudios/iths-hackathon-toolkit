/**
 * MeteoYork Orchestrator
 * Connects the data layer to the UI components.
 */

import { fetchAllBoroughs } from './js/weatherService.js';
import { BoroughCarousel } from './js/components/BoroughCarousel.js';
import { TempCurve } from './js/components/TempCurve.js';

let boroughsData = [];
let activeIndex = 0;
let currentMode = 'temp';
let activeViz = 'trends';

async function init() {
  const mainContent = document.getElementById('main-content');
  
  try {
    // 1. Fetch All Data
    boroughsData = await fetchAllBoroughs();
    
    // 2. Render Initial UI
    renderUI();
    
    // 3. Setup Observers and Listeners
    setupInteractions();
    
  } catch (error) {
    mainContent.innerHTML = `
      <section class="dark error-state">
        <h1 style="color: #ff3b30">Station Offline</h1>
        <p class="subtitle">Unable to connect to NYC weather sensors. Please try again later.</p>
        <button onclick="window.location.reload()" class="btn-pill btn-outline" style="margin-top: 20px">Retry Connection</button>
      </section>
    `;
    console.error('Initialization failed:', error);
  }
}

function setupInteractions() {
  const carousel = document.getElementById('borough-carousel');
  const mainContent = document.getElementById('main-content');

  // Intersection Observer to detect focused borough
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const boroughId = entry.target.dataset.borough;
        const newIndex = boroughsData.findIndex(b => b.id === boroughId);
        if (newIndex !== activeIndex) {
          activeIndex = newIndex;
          updateChartAndIndicators();
        }
      }
    });
  }, { 
    root: carousel,
    threshold: 0.6 
  });

  document.querySelectorAll('.borough-card').forEach(card => observer.observe(card));

  // Toggle & Map Listener (Event Delegation)
  mainContent.addEventListener('click', (e) => {
    // Mode Toggle (Temp/Wind)
    if (e.target.dataset.mode) {
      const newMode = e.target.dataset.mode;
      if (newMode !== currentMode) {
        currentMode = newMode;
        updateChartAndIndicators();
      }
    }

    // Viz Toggle (Trends/Map)
    if (e.target.dataset.viz) {
      const newViz = e.target.dataset.viz;
      if (newViz !== activeViz) {
        activeViz = newViz;
        updateChartAndIndicators();
      }
    }

    // Map Borough Click
    const boroughClick = e.target.closest('[data-borough]');
    if (boroughClick && (e.target.classList.contains('borough-path') || e.target.closest('.map-label'))) {
      const boroughId = boroughClick.dataset.borough;
      const newIndex = boroughsData.findIndex(b => b.id === boroughId);
      if (newIndex !== -1 && newIndex !== activeIndex) {
        scrollToBorough(newIndex);
      }
    }
  });
}

function scrollToBorough(index) {
  const carousel = document.getElementById('borough-carousel');
  const cards = carousel.querySelectorAll('.borough-card');
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    activeIndex = index;
    updateChartAndIndicators();
  }
}

function renderUI() {
  const mainContent = document.getElementById('main-content');
  if (boroughsData.length === 0) return;

  let html = BoroughCarousel(boroughsData);
  html += `<div id="chart-container">
            ${TempCurve(boroughsData, activeIndex, currentMode, activeViz)}
           </div>`;
  
  mainContent.innerHTML = html;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateChartAndIndicators() {
  const chartContainer = document.getElementById('chart-container');
  const indicators = document.querySelectorAll('.indicator');

  // Update Section
  chartContainer.innerHTML = TempCurve(boroughsData, activeIndex, currentMode, activeViz);
  
  // Update Indicators
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === activeIndex);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);