import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  CloudSun, 
  Search, 
  Calendar, 
  Wind, 
  Droplets, 
  Thermometer, 
  Navigation,
  Sparkles,
  Plane,
  Sun,
  Sunset,
  Moon,
  Utensils,
  Info
} from 'lucide-react';
import { generateItinerary } from './itineraryData';

const WEATHER_CODES = {
  0: 'Clear sky ☀️',
  1: 'Mainly clear 🌤️',
  2: 'Partly cloudy ⛅',
  3: 'Overcast ☁️',
  45: 'Foggy 🌫️',
  48: 'Depositing rime fog 🌫️',
  51: 'Light drizzle 🌦️',
  61: 'Slight rain 🌧️',
  63: 'Moderate rain 🌧️',
  65: 'Heavy rain ⛈️',
  71: 'Slight snow 🌨️',
  80: 'Rain showers 🌦️',
  95: 'Thunderstorm ⚡'
};

const POPULAR_DESTINATIONS = ['Tokyo', 'Paris', 'Zurich', 'New York', 'Dubai', 'Bali'];

export default function App() {
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripData, setTripData] = useState(null);

  // Directly fetch from Open-Meteo as primary client (mirroring FastMCP backend logic)
  const handleSearch = async (destinationName) => {
    const target = (destinationName || cityInput).trim();
    if (!target) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Geocode location
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(target)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError(`No destination found matching "${target}". Try another city!`);
        setLoading(false);
        return;
      }

      const place = geoData.results[0];

      // 2. Fetch live weather & 3-day forecast
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&forecast_days=3&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      // 3. Discover real local restaurants & attractions via OpenStreetMap Nominatim
      let realAttractions = [];
      let realRestaurants = [];

      try {
        const [placesRes, eatsRes] = await Promise.allSettled([
          fetch(`https://nominatim.openstreetmap.org/search?q=attractions+in+${encodeURIComponent(place.name)}&format=json&limit=4`, {
            headers: { 'User-Agent': 'AITripPlanner/1.0 (interview-demo)' }
          }).then(r => r.json()),
          fetch(`https://nominatim.openstreetmap.org/search?q=restaurants+in+${encodeURIComponent(place.name)}&format=json&limit=4`, {
            headers: { 'User-Agent': 'AITripPlanner/1.0 (interview-demo)' }
          }).then(r => r.json())
        ]);

        if (placesRes.status === 'fulfilled' && Array.isArray(placesRes.value)) {
          realAttractions = placesRes.value
            .filter(item => item.name && item.name.length > 2)
            .map(item => ({
              name: item.name,
              note: item.display_name.split(',').slice(1, 3).join(',').trim() || 'Notable attraction'
            }));
        }

        if (eatsRes.status === 'fulfilled' && Array.isArray(eatsRes.value)) {
          realRestaurants = eatsRes.value
            .filter(item => item.name && item.name.length > 2)
            .map(item => ({
              name: item.name,
              note: item.display_name.split(',').slice(1, 3).join(',').trim() || 'Local dining'
            }));
        }
      } catch (poiErr) {
        console.warn('Could not fetch external POIs, using smart fallbacks:', poiErr);
      }

      setTripData({
        destination: {
          name: place.name,
          country: place.country,
          region: place.admin1,
          latitude: place.latitude,
          longitude: place.longitude,
          timezone: weatherData.timezone,
          elevation: place.elevation
        },
        current: weatherData.current,
        daily: weatherData.daily,
        realAttractions,
        realRestaurants
      });
    } catch (err) {
      console.error(err);
      setError('Failed to fetch destination data. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(cityInput);
  };

  const getWeatherDescription = (code) => WEATHER_CODES[code] || 'Variable conditions';

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <Compass size={24} color="#050811" />
          </div>
          <div>
            <h1 className="brand-title">AI Trip Planner</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
              Intelligent Destination Explorer & MCP Engine
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span className="brand-badge">FastMCP Connected</span>
        </div>
      </header>

      {/* Hero Search Box */}
      <div className="glass-panel hero-search-card">
        <h2 className="hero-title">Where are we going next?</h2>
        <p className="hero-subtitle">
          Discover weather conditions, geographical insights, and automated daily itineraries.
        </p>

        <form onSubmit={onSubmit} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              id="city-search-input"
              type="text"
              className="search-input"
              placeholder="Search destination (e.g. Kyoto, Reykjavik, Barcelona)..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
          </div>
          <button id="search-submit-btn" type="submit" className="btn-primary" disabled={loading}>
            {loading ? <Sparkles className="spinner" size={18} /> : <Plane size={18} />}
            <span>{loading ? 'Analyzing...' : 'Plan Trip'}</span>
          </button>
        </form>

        {/* Quick Suggestions */}
        <div className="quick-tags">
          <span className="quick-label">Trending:</span>
          {POPULAR_DESTINATIONS.map((dest) => (
            <button
              key={dest}
              type="button"
              className="tag-btn"
              onClick={() => {
                setCityInput(dest);
                handleSearch(dest);
              }}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          style={{
            padding: '16px 20px',
            marginBottom: '24px',
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            borderRadius: '12px',
            color: '#fca5a5',
            fontSize: '14px'
          }}
        >
          {error}
        </div>
      )}

      {/* Initial Empty State */}
      {!tripData && !loading && !error && (
        <div className="glass-panel state-container">
          <Compass size={48} style={{ color: 'var(--primary)', marginBottom: '16px', opacity: 0.6 }} />
          <h3>Ready for Departure</h3>
          <p style={{ marginTop: '8px', fontSize: '14px' }}>
            Enter a city above or tap any trending destination to generate live insights.
          </p>
        </div>
      )}

      {/* Dashboard View */}
      {tripData && (
        <div className="dashboard-grid">
          {/* Left Column: Destination & Weather */}
          <div>
            {/* Main Destination Card */}
            <div className="glass-panel destination-header-card">
              <div>
                <h3 className="city-title">{tripData.destination.name}</h3>
                <div className="city-location">
                  <MapPin size={16} color="var(--primary)" />
                  <span>
                    {tripData.destination.region ? `${tripData.destination.region}, ` : ''}
                    {tripData.destination.country}
                  </span>
                </div>
              </div>
              <div className="weather-badge-large">
                <div className="weather-temp">
                  {Math.round(tripData.current.temperature_2m)}°C
                </div>
                <div className="weather-desc">
                  {getWeatherDescription(tripData.current.weather_code)}
                </div>
              </div>
            </div>

            {/* Quick Stats Metrics */}
            <div className="stats-row">
              <div className="stat-pill">
                <Thermometer size={18} color="var(--primary)" />
                <div className="stat-value">{Math.round(tripData.current.apparent_temperature)}°C</div>
                <div className="stat-label">Feels Like</div>
              </div>
              <div className="stat-pill">
                <Droplets size={18} color="#60a5fa" />
                <div className="stat-value">{tripData.current.relative_humidity_2m}%</div>
                <div className="stat-label">Humidity</div>
              </div>
              <div className="stat-pill">
                <Wind size={18} color="#a78bfa" />
                <div className="stat-value">{tripData.current.wind_speed_10m} km/h</div>
                <div className="stat-label">Wind Speed</div>
              </div>
            </div>

            {/* 3-Day Forecast */}
            <div className="glass-panel forecast-section">
              <div className="section-title">
                <Calendar size={18} color="var(--primary)" />
                <span>3-Day Climate Outlook</span>
              </div>
              <div className="forecast-days-grid">
                {tripData.daily.time?.map((date, idx) => (
                  <div key={date} className="forecast-day-card">
                    <div className="forecast-date">
                      {idx === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '20px', margin: '4px 0' }}>
                      {getWeatherDescription(tripData.daily.weather_code[idx]).split(' ').pop()}
                    </div>
                    <div className="forecast-high-low">
                      {Math.round(tripData.daily.temperature_2m_max[idx])}° / {Math.round(tripData.daily.temperature_2m_min[idx])}°
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
                      Rain: {tripData.daily.precipitation_probability_max?.[idx] || 0}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Smart Itinerary Planner */}
          {(() => {
            const itinerary = generateItinerary(
              tripData.destination,
              tripData.current.temperature_2m,
              getWeatherDescription(tripData.current.weather_code),
              tripData.daily.precipitation_probability_max?.[0] || 0,
              tripData.realAttractions || [],
              tripData.realRestaurants || []
            );

            return (
              <div className="glass-panel itinerary-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div className="section-title" style={{ marginBottom: '4px' }}>
                      <Sparkles size={20} color="var(--primary)" />
                      <span>3-Day Tailored Itinerary</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                      {itinerary.heroTag}
                    </p>
                  </div>
                  <span className="brand-badge">Weather-Adaptive & Real Venues</span>
                </div>

                {/* Real Highlights & Top Eateries Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {itinerary.topAttractions && itinerary.topAttractions.length > 0 && (
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Must-Visit Sights in {tripData.destination.name}:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {itinerary.topAttractions.map((att, i) => (
                          <div key={i} title={att.note} style={{
                            fontSize: '12px',
                            background: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            color: '#e0f2fe'
                          }}>
                            🏛️ {att.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {itinerary.topEateries && itinerary.topEateries.length > 0 && (
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#f59e0b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Recommended Local Restaurants & Cafes:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {itinerary.topEateries.map((eat, i) => (
                          <div key={i} title={eat.note} style={{
                            fontSize: '12px',
                            background: 'rgba(245, 158, 11, 0.08)',
                            border: '1px solid rgba(245, 158, 11, 0.25)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            color: '#fef3c7'
                          }}>
                            🍽️ {eat.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {itinerary.days.map((item) => (
                  <div key={item.day} className="itinerary-day">
                    <div className="day-badge">Day {item.day} • {item.title}</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13.5px' }}>
                        <Sun size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <div><strong>Morning:</strong> <span style={{ color: 'var(--text-muted)' }}>{item.morning}</span></div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13.5px' }}>
                        <Sunset size={16} color="#ec4899" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <div><strong>Afternoon:</strong> <span style={{ color: 'var(--text-muted)' }}>{item.afternoon}</span></div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13.5px' }}>
                        <Moon size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <div><strong>Evening:</strong> <span style={{ color: 'var(--text-muted)' }}>{item.evening}</span></div>
                      </div>

                      <div style={{ 
                        marginTop: '6px', 
                        padding: '8px 12px', 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        borderRadius: '8px', 
                        fontSize: '12px',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                      }}>
                        <Utensils size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                        <span><strong>Cuisine Tip:</strong> {item.diningTip}</span>
                      </div>

                      {item.weatherNote && (
                        <div style={{ 
                          fontSize: '11.5px', 
                          color: 'var(--text-dim)', 
                          display: 'flex', 
                          gap: '6px', 
                          alignItems: 'center',
                          fontStyle: 'italic'
                        }}>
                          <Info size={12} />
                          <span>{item.weatherNote}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    marginTop: 'auto',
                    padding: '12px 16px',
                    background: 'rgba(56, 189, 248, 0.05)',
                    border: '1px solid rgba(56, 189, 248, 0.15)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '12px',
                    color: 'var(--text-muted)'
                  }}
                >
                  <Navigation size={16} color="var(--primary)" />
                  <span>
                    Coordinates: {tripData.destination.latitude.toFixed(2)}°, {tripData.destination.longitude.toFixed(2)}° • Timezone: {tripData.destination.timezone}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
