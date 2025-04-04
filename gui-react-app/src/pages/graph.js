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
  const [clothingAdvice, setClothingAdvice] = useState("");
  const [sportsAdvice, setSportsAdvice] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dynamicBackground, setDynamicBackground] = useState(false);
  const [settings, setSettings] = useState(null);


 
  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('weatherAppSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings); 
        setDarkMode(parsedSettings.darkMode || false);
        setDynamicBackground(parsedSettings.dynamicBackground || false);
      }
    };
  
    loadSettings();
    
    window.addEventListener('storage', loadSettings);
    
    return () => {
      window.removeEventListener('storage', loadSettings);
    };
  }, []);


  useEffect(() => {
    if (!settings) return;

    const getLocation = async () => {
      if (settings.currentLocation === "A") {
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
      }
      else if (settings.currentLocation === "M" && settings.manualLocation) {
        try {
          const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(settings.manualLocation)}&limit=1&appid=${apiKey}`;
          const response = await fetch(geocodeURL);
          const data = await response.json();
          
          if (data && data.length > 0) {
            setLat(data[0].lat);
            setLon(data[0].lon);
          } else {
            console.error("Location not found");
            setLat(51.525012);
            setLon(-0.033456);
          }
        } catch (error) {
          console.error("Error getting location coordinates:", error);
          setLat(51.525012);
          setLon(-0.033456);
        }
      } else {
        setLat(51.525012);
        setLon(-0.033456);
      }

    };

    getLocation();
  }, [settings]);

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
          getClothingAdvice();
          getSportsAdvice();

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
            return forecastHour <= currentHour + 24; // Filter for the next 24 hours
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

  const getClothingAdvice = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clothing-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temp: Math.round(currentWeather),
          feelsLike: Math.round(feelsLike),
          windSpeed: windSpeed,
          city: city
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Clothing advice:", data.advice);
      setClothingAdvice(data.advice);
    } catch (error) {
      console.error("Error fetching clothing advice:", error);
    }
  };

  const getSportsAdvice = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/sports-advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                temp: Math.round(currentWeather),
                windSpeed: windSpeed,
                city: city
            })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Sports advice:", data.advice);
        setSportsAdvice(data.advice);
    } catch (error) {
        console.error("Error fetching sports advice:", error);
    }
};
  
  const appClasses = `app${darkMode ? ' dark-mode' : ''}${dynamicBackground ? ' dynamic-background' : ''}`;

  // Format temperature based on settings
  function formatTemperature(temp, includeUnit = true) {
    if (!settings) return `${Math.round(temp)}°C`;
    
    if (settings.temperatureUnit === "fahrenheit") {
      const fahrenheit = (temp * 9) / 5 + 32;
      return includeUnit ? `${Math.round(fahrenheit)}°F` : `${Math.round(fahrenheit)}`;
    } else {
      return includeUnit ? `${Math.round(temp)}°C` : `${Math.round(temp)}°`;
    }
  }

  return (
    <section className={`graph-app ${appClasses}`}>
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
          <h1>{currentWeather ? formatTemperature(currentWeather, true) : "Loading..."}</h1>
        </div>
        <div className="weathericon">
          <img src={weatherIcon || "/defaultIcon.png"} // fallback to default icon if loading
            alt="Current Weather"/>
        </div>
        <div className="windspeed">
          <h1>{windSpeed ? `Wind Speed: ${windSpeed} mph` : "Loading wind speed..."}</h1>
        </div>
        <div className="feelslike">
          <h1>
          {feelsLike !== null
            ? `Feels like ${formatTemperature(feelsLike, true)}`
            : "Loading feels like..."}
          </h1>
        </div>
      </section> 
      {/* Hourly temperature overview */}
      <section className="tempBox">
        {hourlyTemps.map((hourlyTemp, index) => (
          <div className="miniTemp" key={index}>
            <h1>{hourlyTemp.time}</h1>
            <img src={hourlyTemp.imgSrc} alt={hourlyTemp.alt} />
            <h1>{formatTemperature(parseFloat(hourlyTemp.temp), true)}</h1>
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
      <section className="gptcontainer">
        <section className="gptBox">
          <h2>Clothing Advice</h2>
          <p>{clothingAdvice ? clothingAdvice : "Loading advice..."}</p>
        </section>
        <section className="sportsBox">
          <h2>Sports Advice</h2>
          <p>{sportsAdvice ? sportsAdvice : "Loading sports advice..."}</p>
        </section>
      </section>

    </section>
    
  );
}

export default GraphMain;