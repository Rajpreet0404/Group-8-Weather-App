import React, { useState, useEffect } from "react";
import "./reset.css"; // Import the CSS file
import "./graphmain.css"; // Import the CSS file

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const apiKey = "fa0315bf1aaefb0d246fe0e1feeca3b3";

const activityImages = [
  { imgSrc: "/image11.png", alt: "Basketball" },
  { imgSrc: "/image12.png", alt: "Running" },
  { imgSrc: "/image13.png", alt: "Football" },
];

function GraphMain() {
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [dailyTemps, setDailyTemps] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [windSpeed, setWindSpeed] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [hourlyHumidity, setHourlyHumidity] = useState([]);
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
      const hourlyApiURL = `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
      const dailyApiURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}&units=${units}`;
      
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

          console.log("Hourly Weather API response:", data);

          const now = new Date();
          const currentHour = now.getHours();


          const filteredForecasts = data.list.filter((item) => {
            const forecastDate = new Date(item.dt * 1000);
            const forecastHour = forecastDate.getHours();
            return forecastHour > currentHour && forecastHour < 24;
          });

          const nextFiveHours = filteredForecasts.slice(0, 24).map((item) => ({
            time: new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            imgSrc: getWeatherIcon(item.weather[0].icon),
            alt: item.weather[0].description,
            temp: `${Math.round(item.main.temp)}°C`,


          }));

          setHourlyTemps([{ time: "Now", imgSrc: weatherIcon, alt: "Current weather", temp: `${Math.round(currentWeather)}°C` }, ...nextFiveHours]);

          const humidityData = filteredForecasts.slice(0, 24).map((item) => {
            const date = new Date(item.dt * 1000);
            const hour = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
            return {
              hour: hour,
              humidity: item.main.humidity,
            };
          });
          console.log("✅ Hourly Humidity Data:", humidityData);
          setHourlyHumidity(humidityData);

          


        })
        .catch((error) => console.error("❌ Error fetching weather data:", error));

        fetch(dailyApiURL)
        .then((response) => response.json())
        .then((data) => {
          console.log("Daily Weather API response:", data);
          if (!data.list) throw new Error("Invalid API response format");

          const nextSevenDays = data.list.map((item, index) => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

            return {
              day: index === 0 ? "Today" : dayName,
              temp: `${Math.round(item.temp.max)}°/${Math.round(item.temp.min)}°`,
              imgSrc: getWeatherIcon(item.weather[0].icon),
              alt: item.weather[0].description,
            };
          });

          setDailyTemps(nextSevenDays);
        })
        .catch((error) => console.error("❌ Error fetching daily forecast:", error));

    }
  }, [lat, lon, currentWeather, weatherIcon]); 


  function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  return (
    <section className="graph-app">
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
      <section className="home-tempBox">
        {hourlyTemps.map((hourlyTemp, index) => (
          <div className="miniTemp" key={index}>
            <h1>{hourlyTemp.time}</h1>
            <img src={hourlyTemp.imgSrc} alt={hourlyTemp.alt} />
            <h1>{hourlyTemp.temp}</h1>
          </div>
        ))}
        <div className="miniTemp">
          <h1></h1>
          <h1></h1>
        </div>
      </section>



      {/* Daily Humidity Graph */}
      {hourlyHumidity.length > 0 && (
        <section className="humidityBox">
          <h2>24-Hour Humidity Forecast</h2>
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: "800px", height: "300px" }}>
              <Line
                data={{
                  labels: hourlyHumidity.map((data) => data.hour),
                  datasets: [
                    {
                      label: "Humidity (%)",
                      data: hourlyHumidity.map((data) => data.humidity),
                      fill: true,
                      borderColor: "#2196F3", 
                      backgroundColor: "rgba(2, 14, 24, 0.9)", 
                      tension: 0.4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                    title: {
                      display: true,
                      text: "Humidity Over Time",
                      font: { size: 20 },
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: "Humidity (%)",
                        font: { size: 16 },
                      },
                      min: 0,
                      max: 100,
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Hour",
                        font: { size: 16 },
                      },
                      ticks: {
                        maxRotation: 90,
                        minRotation: 45,
                        font: { size: 14 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </section>
      )}





    </section>
  );
}

export default GraphMain;