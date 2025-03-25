import React, { useState, useEffect } from "react";
import "./reset.css"; // Import the CSS file
import "./homestyle.css"; // Import the CSS file

const apiKey = "fa0315bf1aaefb0d246fe0e1feeca3b3";
/*
const lat = 51.525012;
const lon = -0.033456;
const units = "metric";
const currentApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
const hourlyApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
*/

const dailyTemps = [
  { day: "Monday", temp: "15°/6°", imgSrc: "/image9.png", alt: "Heavy rain"},
  { day: "Tuesday", temp: "11°/3°", imgSrc: "/image4.png", alt: "Partly cloudy" },
  { day: "Wednesday", temp: "15°/8°", imgSrc: "/image15.png", alt: "Partly cloudy" },
  { day: "Thursday", temp: "14°/7°", imgSrc: "/image7.png", alt: "Lightning" },
  { day: "Friday", temp: "21°/10°", imgSrc: "/image5.png", alt: "Sunny" },
];

const activityImages = [
  { imgSrc: "/image11.png", alt: "Basketball" },
  { imgSrc: "/image12.png", alt: "Running" },
  { imgSrc: "/image13.png", alt: "Football" },
];

function Home() {
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [windSpeed, setWindSpeed] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [city, setCity] = useState(""); 

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude);
            setLon(longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setLat(51.525012);  
            setLon(-0.033456);   
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        setLat(51.525012);  
        setLon(-0.033456);  
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (lat && lon) {
      const units = "metric";
      const currentApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
      const hourlyApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

      fetch(currentApiURL)
        .then((response) => response.json())
        .then((data) => {
          console.log("Current Weather API response:", data);
          if (data.cod !== 200) {
            throw new Error("Error fetching current weather data");
          }

          const cityName = data.name;

          if (data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
            const { temp, feels_like } = data.main;
            const weatherIconCode = data.weather[0].icon;
            const windSpeedInMph = data.wind ? (data.wind.speed * 2.237).toFixed(1) : "N/A"; 

            setCity(cityName); 
            setCurrentWeather(temp);
            setFeelsLike(feels_like);
            setWindSpeed(windSpeedInMph); 
            setWeatherIcon(getWeatherIcon(weatherIconCode));
          } else {
            throw new Error("Weather data is missing or malformed.");
          }
        })
        .catch((error) => {
          console.error("❌ Error fetching current weather data:", error.message);
        });

      fetch(hourlyApiURL)
        .then((response) => response.json())
        .then((data) => {
          if (!data.list) throw new Error("Invalid API response format");

          const now = new Date();
          const currentHour = now.getHours();

          const filteredForecasts = data.list.filter((item) => {
            const forecastDate = new Date(item.dt * 1000);
            const forecastHour = forecastDate.getHours();
            return forecastHour >= currentHour && forecastHour < 24;
          });

          const nextFiveHours = filteredForecasts.slice(0, 5).map((item) => ({
            time: new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            imgSrc: getWeatherIcon(item.weather[0].icon),
            alt: item.weather[0].description,
            temp: `${Math.round(item.main.temp)}°C`,
          }));

          setHourlyTemps(nextFiveHours);
        })
        .catch((error) => console.error("❌ Error fetching weather data:", error));
    }
  }, [lat, lon]); 


  function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  return (
    <section className="app">
      {/* Location flex box */}
      <section className="locationBox">
        <div className="weatherimage">
          <img src="/locationimage.png" alt="Background" />
        </div>
        <div className="locationtext">
          <h1>{city ? `${city}` : "Loading location..."}</h1>
        </div>
      </section>
      {/* Weather flex box */}
      <section className="weatherBox">
        <div className="currentweather">
          <h1>{currentWeather ? `${Math.round(currentWeather)}°C` : "Loading..."}</h1>
        </div>
        <div className="weathericon">
          <img src={weatherIcon || "/defaultIcon.png"} // fallback to default icon if loading
            alt="Current Weather"/>
        </div>
        <div className="windspeed">
          <h1>{windSpeed ? `Wind Speed: ${windSpeed} mph` : "Loading wind speed..."}</h1>
        </div>
        <div className="feelslike">
          <h1>{feelsLike !== null ? `Feels like ${Math.round(feelsLike)}°C` : "Loading feels like..."}</h1>
        </div>
      </section> 
      {/* Hourly temperature overview */}
      <section className="tempBox">
        {hourlyTemps.map((hourlyTemp, index) => (
          <div className="miniTemp" key={index}>
            <h1>{hourlyTemp.time}</h1>
            <img src={hourlyTemp.imgSrc} alt={hourlyTemp.alt} />
            <h1>{hourlyTemp.temp}</h1>
          </div>
        ))}
        <div className="miniTemp">
          <h1></h1>
          <button>...</button>
          <h1></h1>
        </div>
      </section>
      {/* Daily temperature overview */}
      <section className="dailyTempBox">
        {dailyTemps.map((dailyTemp, index) => (
          <div className="dailyTemp" key={index}>
            <h1>{dailyTemp.day}</h1>
            <h2>{dailyTemp.temp}</h2>
            <img src={dailyTemp.imgSrc} alt={dailyTemp.alt} />
          </div>
        ))}
      </section>
      {/* Activities flex box */}
      <section className="activitiesBox">
        <h1>Best activities to do today</h1>
        <div className="activityImages">
          {activityImages.map((activityImage, index) => (
            <div className="activity" key={index}>
              <img src={activityImage.imgSrc} alt={activityImage.alt} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Home;