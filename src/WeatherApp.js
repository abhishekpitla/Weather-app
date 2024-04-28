import React, { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '6c56d510f76d209a14f2d6082683e152'; // Replace 'YOUR_API_KEY' with your actual API key

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found!');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <div className="weather-app">
      <h1 className="title">Weather App</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-msg">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2 className="city-name">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
          <p className="description">Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;