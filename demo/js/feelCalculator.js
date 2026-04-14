/**
 * Feel Calculator for MeteoYork
 * Translates apparent temperature and wind speed into human-friendly NYC labels.
 */

export function getFeelLabel(feel, wind) {
  // Base labels by apparent temperature (F)
  if (feel <= 32) return { label: "Freezing", icon: "thermometer-snowflake", color: "#2997ff" };
  if (feel <= 45) return { label: "Cold", icon: "thermometer", color: "#0071e3" };
  
  // The "Betrayal" zone: 45-60 degrees where wind chill makes or breaks the day
  if (feel <= 60) {
    if (wind > 12) return { label: "Crisp", icon: "wind", color: "#0066cc" };
    return { label: "Brisk", icon: "cloud-sun", color: "#5ac8fa" };
  }
  
  if (feel <= 72) return { label: "Comfortable", icon: "sun", color: "#34c759" };
  if (feel <= 85) return { label: "Warm", icon: "sun", color: "#ff9500" };
  
  return { label: "Hot", icon: "flame", color: "#ff3b30" };
}

export function getClothingAdvice(label) {
  const advice = {
    "Freezing": "Heavy coat, gloves, and hat. Don't risk it.",
    "Cold": "Proper winter jacket. The wind will bite.",
    "Crisp": "Light jacket or heavy sweater. Don't trust the sun.",
    "Brisk": "Layer up. A hoodie or light windbreaker is perfect.",
    "Comfortable": "T-shirt or light long-sleeve. Peak NYC weather.",
    "Warm": "Summer clothes. Stay hydrated.",
    "Hot": "Lightest clothes possible. Stick to the shade."
  };
  
  return advice[label] || "Check the curve before you leave.";
}
