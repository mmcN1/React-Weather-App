import React from 'react';
import './App.css'
import Search from './components/Search/Search';
import { REACT_APP_API_KEY, REACT_APP_API_URL } from './API';
import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';


const App = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handelOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${REACT_APP_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })
      })
      .catch(err => console.log(err))
  }

  console.log(currentWeather);
  console.log(forecast)



  return (
    <div className='container'>
      <Search onSearchChange={handelOnSearchChange} />
      {currentWeather && <CurrentWeather weatherData={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  )
}

export default App;