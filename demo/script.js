// Module 1: Fetching and parsing data
const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=apparent_temperature";

async function getWeatherData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Data received:", data); // Check this in your browser console!
    return data.hourly;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

function transformData(hourlyData) {
  const times = hourlyData.time.slice(0, 24);
  const temps = hourlyData.apparent_temperature.slice(0, 24);

  return times.map((time, index) => {
    return {
      time: time.split('T')[1], // Extract just the "HH:MM"
      temp: temps[index]
    };
  });
}

async function renderChart(transformedData) {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = ''; // Clear loading

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;
  appDiv.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const labels = transformedData.map(d => d.time);
  const dataPoints = transformedData.map(d => d.temp);

  // Simple Bar Chart Logic
  const barWidth = 10;
  const gap = 2;
  const startX = 50;
  const startY = 250;
  const scale = 5; // 5 pixels per degree

  ctx.font = "12px Arial";

  dataPoints.forEach((temp, index) => {
    const x = startX + index * (barWidth + gap);
    const y = startY - (temp * scale);
    const height = temp * scale;

    // Draw Bar
    ctx.fillStyle = 'rgba(0, 123, 255, 0.6)';
    ctx.fillRect(x, y, barWidth, height);

    // Draw Label
    ctx.fillStyle = 'black';
    ctx.fillText(temp.toFixed(1), x, y - 5);
  });

  // Draw X Axis Labels
  labels.forEach((label, index) => {
    const x = startX + index * (barWidth + gap);
    ctx.fillText(label, x, startY + 20);
  });

  function getTempLabel(temp) {
    if (temp < 0) return "Freezing";
    if (temp < 10) return "Crisp";
    return "Comfortable";
  }
}


// Main execution
(async function main() {
  const rawData = await getWeatherData();
  if (rawData) {
    const processedData = transformData(rawData);
    renderChart(processedData);
  }
})();