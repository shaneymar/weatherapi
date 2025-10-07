import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "cdfecc3b9e564e3b877152525250710"; 

  const handleSearch = () => {
  if (!city) return;
  setLoading(true);      // <-- Set loading BEFORE starting fetch
  setWeatherData(null);

  fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch weather data");
      return res.json();
    })
    .then((data) => {
      setWeatherData(data);
    })
    .catch(() => {
      alert("Failed to fetch weather data");
    })
    .finally(() => {
      setLoading(false);
    });
};


  return (
    <div className="app-container">
      <h1>Weather App</h1>

      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <p>Loading data…</p>}
      </div>

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
