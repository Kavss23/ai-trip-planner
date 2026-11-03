"""Trip Planner MCP Server.

A minimal Model Context Protocol (MCP) server providing location search
capabilities using the free Open-Meteo Geocoding API.
"""

from typing import Any, Dict
import requests
from mcp.server.fastmcp import FastMCP

# Initialize the MCP server with stateless HTTP enabled for straightforward HTTP/Postman requests
mcp = FastMCP("Trip Planner MCP Server", stateless_http=True)

# Free Open-Meteo geocoding endpoint (no API key required)
OPEN_METEO_GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"


@mcp.tool()
def search_location(city: str) -> Dict[str, Any]:
    """Search for geographical coordinates and location details for a given city name.

    Calls the free Open-Meteo Geocoding API without requiring any API key.

    Args:
        city: Name of the city or municipality (e.g., 'Tokyo', 'Paris', 'New York').

    Returns:
        A structured dictionary containing search results, including:
        - status: 'success', 'not_found', or 'error'
        - message: Human-readable summary
        - query: The original search term
        - count: Total matches found
        - results: List of location objects with coordinates, country, region, and timezone
    """
    cleaned_city = city.strip()
    if not cleaned_city:
        return {
            "status": "error",
            "message": "City name cannot be empty.",
            "query": city,
            "count": 0,
            "results": [],
        }

    params = {
        "name": cleaned_city,
        "count": 5,
        "language": "en",
        "format": "json",
    }

    try:
        response = requests.get(
            OPEN_METEO_GEOCODING_URL,
            params=params,
            timeout=10,
            headers={"User-Agent": "AITripPlanner/1.0 (BeginnerProject)"},
        )
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.Timeout:
        return {
            "status": "error",
            "message": "Request timed out while connecting to the Open-Meteo geocoding service.",
            "query": cleaned_city,
            "count": 0,
            "results": [],
        }
    except requests.exceptions.RequestException as err:
        return {
            "status": "error",
            "message": f"Failed to fetch location data: {err}",
            "query": cleaned_city,
            "count": 0,
            "results": [],
        }
    except ValueError:
        return {
            "status": "error",
            "message": "Received an invalid JSON response from the geocoding service.",
            "query": cleaned_city,
            "count": 0,
            "results": [],
        }

    raw_results = data.get("results")
    if not raw_results:
        return {
            "status": "not_found",
            "message": f"No locations found matching '{cleaned_city}'.",
            "query": cleaned_city,
            "count": 0,
            "results": [],
        }

    # Format the raw API output into a clean, structured dictionary
    formatted_results = []
    for item in raw_results:
        formatted_results.append(
            {
                "name": item.get("name"),
                "latitude": item.get("latitude"),
                "longitude": item.get("longitude"),
                "country": item.get("country"),
                "country_code": item.get("country_code"),
                "region": item.get("admin1"),
                "timezone": item.get("timezone"),
                "elevation": item.get("elevation"),
                "population": item.get("population"),
            }
        )

    return {
        "status": "success",
        "message": f"Found {len(formatted_results)} location(s) for '{cleaned_city}'.",
        "query": cleaned_city,
        "count": len(formatted_results),
        "results": formatted_results,
    }


@mcp.tool()
def get_weather(latitude: float, longitude: float) -> dict:
    """Get current weather and a 3-day forecast for a location."""

    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        "forecast_days": 3,
        "timezone": "auto"
    }

    try:
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()

        return {
            "status": "success",
            "location": {
                "latitude": latitude,
                "longitude": longitude,
                "timezone": data.get("timezone")
            },
            "current": data.get("current", {}),
            "forecast": data.get("daily", {})
        }

    except requests.RequestException as e:
        return {
            "status": "error",
            "message": f"Could not fetch weather: {e}"
        }


@mcp.tool()
def plan_trip(city: str) -> dict:
    """Get the location and current weather for a trip destination."""

    # Step 1: Find the city
    location_url = "https://geocoding-api.open-meteo.com/v1/search"

    try:
        response = requests.get(
            location_url,
            params={
                "name": city,
                "count": 1,
                "language": "en",
                "format": "json"
            },
            timeout=15
        )
        response.raise_for_status()

        locations = response.json().get("results", [])

        if not locations:
            return {
                "status": "not_found",
                "message": f"Could not find the city: {city}"
            }

        place = locations[0]

        # Step 2: Get the city's weather
        weather_url = "https://api.open-meteo.com/v1/forecast"

        weather_response = requests.get(
            weather_url,
            params={
                "latitude": place["latitude"],
                "longitude": place["longitude"],
                "current": "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
                "daily": "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
                "forecast_days": 3,
                "timezone": "auto"
            },
            timeout=15
        )
        weather_response.raise_for_status()
        weather = weather_response.json()

        # Step 3: Return combined results
        return {
            "status": "success",
            "destination": {
                "name": place["name"],
                "country": place.get("country"),
                "region": place.get("admin1"),
                "latitude": place["latitude"],
                "longitude": place["longitude"],
                "timezone": weather.get("timezone")
            },
            "current_weather": weather.get("current", {}),
            "forecast": weather.get("daily", {})
        }

    except requests.RequestException as e:
        return {
            "status": "error",
            "message": f"Could not plan trip: {e}"
        }


if __name__ == "__main__":
    # Start the FastMCP server over HTTP (Streamable HTTP)
    # Accessible at http://127.0.0.1:8000/mcp
    mcp.run(transport="streamable-http")
