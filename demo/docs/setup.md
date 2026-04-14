# Setup Guide

## Local Dev Environment

MeteoYork is built with vanilla HTML, CSS, and JS. There is **no build step** and **no compilation** required.

### 1. Simple Open
You can simply open `index.html` in your browser. However, because we use **ES6 Modules**, some browsers may block fetching local files due to CORS.

### 2. Recommended: Local Server
To avoid CORS issues and enable live reloading, we recommend using a simple local server.

**Option A: VS Code Live Server**
- Open the project in VS Code.
- Click "Go Live" in the bottom right corner.

**Option B: Python**
```bash
# In the /demo directory
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

**Option C: Node/npx**
```bash
# In the /demo directory
npx live-server
```

## Dependencies

- **Open-Meteo API**: No key required (Public).
- **Lucide Icons**: Loaded via CDN in `index.html`.
- **Google Fonts**: (Outfit) Loaded via CDN in `style.css`.

## Common issues

| Problem | Fix |
|---------|-----|
| Modules blocked by CORS | Use a local server (Option B or C above). |
| Icons not showing | Ensure you have an active internet connection to load the Lucide CDN. |
| API Fetch fails | Check your internet connection or verify the Open-Meteo API status. |
