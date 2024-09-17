import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const ShowWeather = ({ selectedCountry }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}&appid=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
      });
  }, []);

  if (!weather) return null;

  return (
    <>
      <h2>Weather in {selectedCountry.capital}</h2>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
      <img
        style={{ height: "150px", width: "150px" }}
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default ShowWeather;
