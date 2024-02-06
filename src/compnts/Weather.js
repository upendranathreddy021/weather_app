import search_icon from './search.jpg';
// import sunny_icon from "./sunnny.webp";
import { useState } from "react";
import "./Weather.css";
import Sunny from "./sunny.webp";
import humidity1 from "./humidity1.png";
import windspeed from "./windspeed.jpg";
import Rainy from "./rainy.jpg";
import Snow from "./snow.jpg";
import Drizzle from "./drizzle1.jpg";
import Cloudy from "./cloudy.png";
import ThunderStrom from "./thunderstrom.jpg";
let Weather = () => {
  let api_key = "208e419490cd47654e869c3f66d5b0d2";
  const [wincon, setWincon] = useState(Cloudy);

let [loc,setloc]=useState("")
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
     setloc("invalid location")
      return; // Exit the function if the input is empty
    }
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
  
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data'); // Handle non-200 responses
      }
      let data = await response.json();
  
      if (data.cod !== 200) {
       
    setloc("Invalid Location")
        return; // Exit the function if the location is invalid
      }
      setloc("")
  
      // Proceed with updating the UI with weather data
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
  
      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
      temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
      location[0].innerHTML = data.name;
  
      // Conditionally set the weather icon based on the response
      setWeatherIcon(data.weather[0].icon);
  
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setloc("invalid location") 
    }
  };
  
  const setWeatherIcon = (icon) => {
    if (icon === "01d" || icon === "01n") {
      setWincon(Sunny);
    } else if (icon === "02d" || icon === "02n") {
      setWincon(Cloudy);
    } else if (icon === "03d" || icon === "03n") {
      setWincon(ThunderStrom);
    } else if (icon === "50d" || icon === "50n") {
      setWincon(Snow);
    } else if (icon === "09d" || icon === "09n") {
      setWincon(Drizzle);
    } else if (icon === "10d" || icon === "10n") {
      setWincon(Rainy);
    } else if (icon === "13d" || icon === "13n") {
      setWincon(Snow);
    } else {
      setWincon(Rainy);
    }
  };
  
 
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        {/* <div className='cancel' onClick={()=>{cancel()}}><i class="fa-solid fa-xmark"></i></div> */}
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          {/* <img src="sunny.jpeg" alt="this is sunny logo"/> */}
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="weather-image">
        {/* <img src={sunny_icon} alt=''/> */}
        {/* <img src={wicon} alt="sunny img"/> */}
        {/* <img src="https://image.ibb.co/gmmneK/children_593313_340.jpg" alt="sunny img"/> */}
        <img src={wincon} alt="sunny img" style={{ height: "100px" }} />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img
            src={humidity1}
            alt="humdty icons"
            className="icon"
            style={{ width: "120px", height: "100px" }}
          />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img
            src={windspeed}
            alt="wind icon"
            className="icon"
            style={{ width: "110px", height: "90px" }}
          />
          <div className="data">
            <div className="wind-rate">18km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
      <h1>{loc}</h1>
    </div>
  );
};
export default Weather;
