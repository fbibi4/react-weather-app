+import React from "react";
import axios from "axios";

+export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loader, setLoader] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoader(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "f8e14a21ac2a08b12d64743366f61697";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  function changeCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type in a city" onChange={changeCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loader) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
function App() {
  return (
    <form>
      <input type="search" placeholder="Enter a City....." />
      <button type="Submit">Search</button>
      <button type="Submit">Current</button>
    </form>
  );
}