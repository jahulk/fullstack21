import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});

  const api_key = process.env.REACT_APP_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      const { temperature, wind_speed, wind_dir, weather_icons } =
        response.data.current;

      const weatherObject = {
        temperature,
        wind_speed,
        wind_dir,
        icon: weather_icons[0],
      };
      setWeather(weatherObject);
    });
  }, [url]);

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>
        <b>temperature: </b> {weather.temperature} Celsius
      </p>
      <img src={weather.icon} alt={city} />
      <p>
        <b>wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
