import { useState } from 'react';
import './App.css';
import getCityWeather from './services/apiCall';

export default function App() {
  const [cityName, setCityName] = useState("");
  const [searched, setSearched] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true); 
    let data = await getCityWeather(cityName);
    setSearched(true);
    setData(data);
    setLoading(false); 
    console.log(data);
  };

  const handleDelete = () => {
    setSearched(false);
    setCityName("");
  };

  return (
    <>
      <div id='blur'></div>
      <div className='search-box'>
        <div className='input-container'>
          <input
            value={cityName}
            onChange={handleChange}
            type='text'
            id='cityName'
            placeholder='City Name'
            required
          />
          {searched ? <p onClick={handleDelete}>X</p> : null}
        </div>
        <button id='button' onClick={handleSearch}>Check Weather</button>
      </div>

      {loading ? (
        <div className="loading-text">Loading...</div> // Show loading text
      ) : searched ? (
        <div className="weather-dashboard">
          <h1>{cityName}</h1>
          <div className="grid-container">
            <div className="grid-item">
              <h2>Current Temperature</h2>
              <div className="value">{((data.currentConditions.temp - 32) * (5 / 9)).toFixed(1)}°C</div>
            </div>
            <div className="grid-item">
              <h2>Sunrise</h2>
              <div className="value">{data.currentConditions.sunrise}</div>
            </div>
            <div className="grid-item">
              <h2>Sunset</h2>
              <div className="value">{data.currentConditions.sunset}</div>
            </div>
            <div className="grid-item">
              <h2>Air Pressure</h2>
              <div className="value">{data.currentConditions.pressure} hPa</div>
            </div>
            <div className="grid-item">
              <h2>Visibility</h2>
              <div className="value">{(data.currentConditions.visibility * 1.60934).toFixed(0)} km</div>
            </div>
            <div className="grid-item">
              <h2>Wind Speed</h2>
              <div className="value">{(data.currentConditions.windspeed * 1.60934).toFixed(0)} km/h</div>
            </div>
            <div className="grid-item">
              <h2>Chance of Rain</h2>
              <div className="value">{data.currentConditions.precipprob}%</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
