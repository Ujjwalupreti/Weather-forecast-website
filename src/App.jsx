import React, { useState } from 'react';
import "./App.css"

const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({
    name: '',
    temp: '',
    description: ''
  });

  const apiKey = 'd1b883d65e837220b6d8b60cf22109d8';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async () => {
    if (!location) return;

    try {
      const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather({
          name: data.name,
          temp: `${Math.round(data.main.temp)}°C`,
          description: data.weather[0].description,
        });
      } else {
        setWeather({
          name: '',
          temp: '',
          description: 'City not found!',
        });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather({
        name: '',
        temp: '',
        description: 'Error fetching data.',
      });
    }
  };

  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Weather Website</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a city"
      />
      <button onClick={fetchWeather}>Search</button>
      <div className="weather-info" style={{ marginTop: '20px' }}>
        <h2>{weather.name}</h2>
        <p>{weather.temp}</p>
        <p>{weather.description}</p>
      </div>
    </div>
  );
};

export default App;
