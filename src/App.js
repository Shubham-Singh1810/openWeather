import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  // setting parameter for calling api
  const [city, setCity] = useState("patna");
  const API_KEY = "71d962bc2e836f9c6e073ff22e6d52a2";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  // calling getData function with dependency city
  useEffect(() => {
    getData();
  }, [city]);

  // defining getData function and storing to the data state
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      let response = await axios.get(URL);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // toggle effect logic for show/hide details
  const [btnMsg, setBtnMsg] = useState("View More Details");
  const [toggle, setToggle] = useState(false);
  const showDetails = () => {
    if (!toggle) {
      setBtnMsg("Hide Details");
      setToggle(true);
    } else {
      setBtnMsg("View More Details");
      setToggle(false);
    }
  };

  return (
    <div className="App">
      {/* navigation start */}
      <nav>
        <div className="brandName">
          <span>W</span>eather<span>A</span>pp
        </div>
        <div className="searchBar">
          <input
            type="search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </nav>
      {/* navigation end */}

      {/* body start */}
      {data == null ? (
        <h1>Your data is fetching</h1>
      ) : (
        <div className="weatherDetails">
          <div className="container">
            <div className="leftContainer">
              <h1>{data.name}</h1>
              <hr />
              <hr />
              <p>
                <b>{data.weather[0].main}</b> || <b>Humidity</b>{" "}
                {data.main.humidity}%
              </p>
            </div>
            <div className="rightContainer">
              <h1>
                <span>{(data.main.temp - 273.15).toFixed(0)}</span>
                <sup>o</sup>C{" "}
              </h1>
              <h3>
                Min : {(data.main.temp_min - 273.15).toFixed(0)}
                <sup>o</sup>C || Max :{" "}
                {(data.main.temp_max - 273.15).toFixed(0)}
                <sup>o</sup>C <span></span>
              </h3>
            </div>
          </div>
          <div className="windDetails">
            <p>
              <b>Wind Speed :</b> {data.wind.speed} mile/hr
            </p>
            <p>
              <b>Clouds : {data.clouds.all} %</b>
            </p>
          </div>
          <button onClick={showDetails}>{btnMsg}</button>
          <hr />
          {toggle && (
            <div className="showMore">
              <p>
                <b>Feels Like :</b> {(data.main.feels_like - 273.15).toFixed(0)}
                <sup>o</sup>C
              </p>
              <p>
                <b>Pressure :</b>
                {data.main.pressure} hPa
              </p>
              <p>
                <b>Visibility : {data.visibility} m</b>
              </p>
              <p>
                <b>Wind Degree :</b> {data.wind.deg} <sup>o</sup>
              </p>
            </div>
          )}
        </div>
      )}
      {/* body end */}
    </div>
  );
}
export default App;
