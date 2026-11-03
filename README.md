# AI Trip Planner & Autonomous Agent Ecosystem

A full-stack, production-ready AI Travel Planning platform featuring a containerized **Model Context Protocol (MCP)** server in Python, an interactive **React 19 & Vite** frontend, and **Docker Compose** orchestration.

The system integrates real-time geospatial geocoding, live meteorological forecasts, and OpenStreetMap Points of Interest (POIs) to synthesize dynamic, weather-adaptive 3-day travel itineraries with real restaurant and attraction recommendations for any city worldwide.

---

## Architecture Overview

```text
┌───────────────────────────────────────────────┐
│              React 19 + Vite UI               │  <-- Port 5173 (Dev) / 3000 (Prod Nginx)
│      (Glassmorphism, Live POIs, Weather)      │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             FastMCP Python 3.11               │  <-- Port 8000 (/mcp)
│  (search_location, get_weather, plan_trip)    │
└───────────┬───────────────────────┬───────────┘
            │                       │
            ▼                       ▼
┌───────────────────────┐   ┌────────────────────────────────┐
│   Open-Meteo APIs     │   │   OpenStreetMap (Nominatim)    │
│ (Geocoding & Forecast)│   │ (Real Attractions & Restaurants│
└───────────────────────┘   └────────────────────────────────┘
```

---

## Key Features

- **Model Context Protocol (MCP) Backend**: Built using the official Python FastMCP SDK with streamable HTTP transport (`/mcp`), enabling native tool integration with AI agents (Claude Desktop, Antigravity, Cursor).
- **Modern React 19 Frontend**: Dark glassmorphic user interface built with Vite, Tailwind-grade styling, and Lucide icons.
- **Dynamic POI Discovery**: Discovers real, verified restaurants and tourist attractions for any searched city worldwide without paid API keys.
- **Weather-Adaptive Itineraries**: Adapts daily activities dynamically based on real-time rain probability and temperature (e.g., shifts to indoor museums and covered arcades when rainy).
- **Production-Ready Docker Orchestration**: Multi-stage Docker builds for the React frontend (Nginx Alpine < 25MB) and optimized Python slim container for the MCP service.

---

## Project Structure

```text
ai-trip-planner/
├── .agents/
│   └── skills/
│       └── trip-planner/
│           └── SKILL.md            # Agent Skill definition & guidelines
├── mcp-server/
│   ├── server.py                   # FastMCP Python server (tools provider)
│   ├── requirements.txt            # Python dependencies (mcp, requests)
│   ├── Dockerfile                  # Python container specification
│   └── .dockerignore               # Image build exclusions
├── ui/
│   ├── src/
│   │   ├── App.jsx                 # Main application dashboard
│   │   ├── itineraryData.js        # Dynamic itinerary synthesis & POI stitching
│   │   ├── index.css               # Design system & glassmorphism theme
│   │   └── main.jsx                # React DOM entry point
│   ├── Dockerfile                  # Multi-stage build (Node -> Nginx Alpine)
│   ├── package.json                # React 19 & Vite dependencies
│   ├── vite.config.js              # Reverse proxy & build configuration
│   └── index.html                  # HTML template
├── docker-compose.yml              # Multi-container orchestration
├── .gitignore                      # Git exclusion rules
└── README.md                       # Documentation
```

---

## Quickstart Guide

### Option 1: Run with Docker Compose (Recommended)

Ensure Docker Desktop is running, then run from the project root:

```bash
docker compose up --build
```

- **Frontend UI**: [http://localhost:3000](http://localhost:3000)
- **FastMCP Service**: [http://localhost:8000/mcp](http://localhost:8000/mcp)

---

### Option 2: Run Locally (Development Mode)

#### 1. Start the FastMCP Backend

```bash
cd mcp-server
python -m venv .venv

# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
python server.py
```
Backend runs at `http://localhost:8000`.

#### 2. Start the React Frontend

Open a new terminal tab:

```bash
cd ui
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## MCP Tools Reference

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `search_location` | `city: str` | Resolves coordinates, country, timezone, and elevation using Open-Meteo Geocoding. |
| `get_weather` | `latitude: float, longitude: float` | Retrieves current temperature, humidity, wind speed, and 3-day forecast. |
| `plan_trip` | `city: str` | Bundles geocoding and live meteorological data into a single structured response. |

---

## Author & License

Developed by [Kavss23](https://github.com/Kavss23). Licensed under the MIT License.
