# AI Trip Planner

An AI-powered travel planning project built with **Google Antigravity Agent Skills** and a custom **Python Model Context Protocol (MCP)** server.

This project does not use LangChain, LangGraph, or paid API keys. It uses the official MCP Python SDK and free Open-Meteo services.

---

## Project Structure

```text
ai-trip-planner/
│
├── .agents/
│   └── skills/
│       └── trip-planner/
│           └── SKILL.md         # Antigravity Agent Skill instructions
│
├── mcp-server/
│   ├── server.py                # Python MCP server using MCPServer
│   └── requirements.txt         # Python dependencies (mcp, requests)
│
└── README.md                    # Project documentation & guide
```

---

## How It Works

```text
User Prompt ("Plan a 3-day trip to Tokyo...")
         │
         ▼
┌─────────────────────────────────┐
│   Google Antigravity Agent      │
└────────────────┬────────────────┘
                 │
                 ├──► Reads: .agents/skills/trip-planner/SKILL.md
                 │    (Learns how to budget, schedule, and structure trips)
                 │
                 └──► Calls MCP Tool: search_location("Tokyo")
                             │
                             ▼
                 ┌───────────────────────────┐
                 │     mcp-server/server.py  │
                 │   (FastMCP Python Server) │
                 └───────────┬───────────────┘
                             │
                             ▼
                 ┌───────────────────────────┐
                 │  Open-Meteo Geocoding API │
                 │  (Free, No API key needed)│
                 └───────────────────────────┘
```

1. **Antigravity Agent Skill (`SKILL.md`)**: Teaches the Antigravity agent a specialized step-by-step workflow for trip planning (gathering requirements, validating destination coordinates, tailoring to budgets, factoring in weather, and organizing balanced daily itineraries).
2. **Model Context Protocol (MCP) Server (`server.py`)**: Acts as a bridge between the AI agent and external data. It exposes tools that the agent can call directly.
3. **Open-Meteo API**: A 100% free, open weather and geocoding service that provides location coordinates and details without requiring an account or API key.

---

## File Explanations

| File | Purpose |
| :--- | :--- |
| [`.agents/skills/trip-planner/SKILL.md`](file:///.agents/skills/trip-planner/SKILL.md) | **Agent Skill Definition**: Contains instructions and heuristics for the Antigravity AI on how to plan trips based on destination, dates, budget, interests, and weather. |
| [`mcp-server/server.py`](file:///mcp-server/server.py) | **MCP Tool Provider**: Implements a lightweight Python server with FastMCP exposing the `search_location` tool to fetch latitude, longitude, and country information. |
| [`mcp-server/requirements.txt`](file:///mcp-server/requirements.txt) | **Dependency List**: Specifies the two required Python packages: `mcp` (the official SDK) and `requests` (for HTTP calls). |
| [`README.md`](file:///README.md) | **Documentation**: Explains the setup, architecture, and commands in clear, beginner-friendly language. |

---

## Getting Started (Setup & Run Guide)

### Prerequisites
- Python 3.10 or newer installed on your computer.

### Step 1: Create a Python Virtual Environment
A virtual environment keeps the project dependencies isolated so they don't conflict with other Python projects on your machine.

Open your terminal in the `ai-trip-planner` folder and run:

```powershell
python -m venv .venv
```
- **What this command does**: Asks Python to create an isolated environment folder named `.venv`.

### Step 2: Activate the Virtual Environment
Activate the environment so that subsequent `pip` installs go directly into `.venv`:

- **On Windows (PowerShell)**:
  ```powershell
  .venv\Scripts\Activate.ps1
  ```
- **On macOS / Linux**:
  ```bash
  source .venv/bin/activate
  ```

### Step 3: Install Dependencies
Install the required packages listed in `requirements.txt`:

```powershell
pip install -r mcp-server/requirements.txt
```
- **What this command does**: Downloads and installs `mcp` (FastMCP server library) and `requests` (HTTP library).

### Step 4: Run the MCP Server
To start the MCP server over standard input/output (stdio):

```powershell
python mcp-server/server.py
```
- **What this command does**: Runs the FastMCP server, listening for tool requests over standard input/output. (Press `Ctrl + C` in the terminal to stop it when running interactively).

---

## Status and Next Steps

- **Completed in Step 1**: Project structure, initial Agent Skill definition, minimal FastMCP server with `search_location` tool, requirements file, and project documentation.
- **Next Steps**:
  1. Test the MCP server locally with Python.
  2. Register the MCP server in Antigravity's configuration (`mcp_config.json`) so the agent can discover and call `search_location` directly.
