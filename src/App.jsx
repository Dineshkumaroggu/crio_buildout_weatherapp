import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "0cea17fcc2b74b23a7a55601250103"; 
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if (!response.ok) throw new Error("Invalid city");

      const data = await response.json();
      setWeather({
        temperature: `${data.current.temp_c}°C`,
        humidity: `${data.current.humidity}%`,
        condition: data.current.condition.text,
        windSpeed: `${data.current.wind_kph} kph`,
      });
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading ? <p id="loading-message">Loading data…</p> : null}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <strong>Temperature</strong>
            <p>{weather.temperature}</p>
          </div>
          <div className="weather-card">
            <strong>Humidity</strong>
            <p>{weather.humidity}</p>
          </div>
          <div className="weather-card">
            <strong>Condition</strong>
            <p>{weather.condition}</p>
          </div>
          <div className="weather-card">
            <strong>Wind Speed</strong>
            <p>{weather.windSpeed}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
