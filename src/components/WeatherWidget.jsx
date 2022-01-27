import React from 'react'
import ReactWeather, { useOpenWeather } from 'react-open-weather'

function WeatherWidget ({lat, lon, city}) {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "06ce70b80d6c024ca4bc7863002bbd0a",
    lat,
    lon,
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });
  const customStyles = {
    gradientStart: "#f8f9fa",
    gradientMid: "#f8f9fa",
    gradientEnd: "#f8f9fa",
    forecastBackgroundColor: "#f8f9fa",
  };
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel={city}
      unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      theme={customStyles}
      showForecast
    />
  );
};

export default WeatherWidget