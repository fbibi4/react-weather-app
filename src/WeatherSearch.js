import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loader, setLoader] = useState(false);
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const apiKey = "f8e14a21ac2a08b12d64743366f61697";
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      axios.get(weatherApiUrl).then(displayWeather);
      axios.get(forecastApiUrl).then(displayForecast);
    });
  }, []);

  function displayWeather(response) {
    setLoader(true);
    setCityName(response.data.name);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function displayForecast(response) {
    const forecastData = response.data.list;
    const uniqueDays = [];
    const filteredForecast = forecastData.filter((item) => {
      const dayOfWeek = getDayOfWeek(item.dt);
      if (!uniqueDays.includes(dayOfWeek)) {
        uniqueDays.push(dayOfWeek);
        return true;
      }
      return false;
    });
    setForecast(filteredForecast.slice(0, 5)); // Get the first 5 unique days of forecast data
  }

  function handleSubmit(event) {
    event.preventDefault();
    const apiKey = "f8e14a21ac2a08b12d64743366f61697";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    setForecast([]);
    axios.get(weatherApiUrl).then(displayWeather);
    axios.get(forecastApiUrl).then(displayForecast);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  function handleCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = "f8e14a21ac2a08b12d64743366f61697";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      setCityName("");

      axios.get(weatherApiUrl).then(displayWeather);
      axios.get(forecastApiUrl).then(displayForecast);
    });
  }

  const getDayOfWeek = (timestamp) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(timestamp * 1000);
    return daysOfWeek[date.getDay()];
  };

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Type in a city....."
        autoComplete="off"
        onChange={changeCity}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleCurrentLocation}
      >
        Current
      </button>
    </form>
  );

  if (loader) {
    return (
      <div>
        {form}
        <h2>{cityName}</h2>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
        <div className="forecast">
          {forecast.map((forecastItem, index) => (
            <div className="forecast-item" key={index}>
              <div className="day">{getDayOfWeek(forecastItem.dt)}</div>
              <img
                src={`http://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}
                alt={forecastItem.weather[0].description}
              />
              <div className="temperature">
                {Math.round(forecastItem.main.temp)}°C
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return form;
  }
}
