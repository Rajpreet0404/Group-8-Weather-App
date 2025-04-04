import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./reset.css";
import "./homestyle.css";

const apiKey = "fa0315bf1aaefb0d246fe0e1feeca3b3";

const activityImages = [
  { imgSrc: "/image11.png", alt: "Basketball" },
  { imgSrc: "/image12.png", alt: "Running" },
  { imgSrc: "/image13.png", alt: "Football" },
];

function Home() {
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [dailyTemps, setDailyTemps] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [windSpeed, setWindSpeed] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [city, setCity] = useState("");
  const [settings, setSettings] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [darkMode, setDarkMode] = useState(false);
  const [dynamicBackground, setDynamicBackground] = useState(false);

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('weatherAppSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        setDarkMode(parsedSettings.darkMode || false);
        setDynamicBackground(parsedSettings.dynamicBackground || false);
      } else {
        setSettings({
          temperatureUnit: "celsius",
          currentLocation: "A",
          manualLocation: "",
          updateFrequency: 60 * 60 * 1000, // 1hr
          darkMode: false,
          dynamicBackground: false
        });
      }
    };

    loadSettings();
    window.addEventListener('storage', loadSettings);
    
    return () => {
      window.removeEventListener('storage', loadSettings);
    };
  }, []);

  // Set up location based on settings
  useEffect(() => {
    if (!settings) return;

    const getLocation = async () => {
      if (settings.currentLocation === "A") {
        // Use automatic geolocation
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
              setLat(51.5235);
              setLon(0.0330);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
          setLat(51.5235);
          setLon(0.0330);
        }
      } else if (settings.currentLocation === "M" && settings.manualLocation) {
        // Use manual location
        try {
          const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(settings.manualLocation)}&limit=1&appid=${apiKey}`;
          const response = await fetch(geocodeURL);
          const data = await response.json();
          
          if (data && data.length > 0) {
            setLat(data[0].lat);
            setLon(data[0].lon);
          } else {
            console.error("Location not found");
            // Fall back to default location
            setLat(51.5235);
            setLon(0.0330);
          }
        } catch (error) {
          console.error("Error getting location coordinates:", error);
          setLat(51.5235);
          setLon(0.0330);
        }
      } else {
        // Fall back to default location
        setLat(51.5235);
        setLon(0.0330);
      }
    };

    getLocation();
  }, [settings]);

  // Periodic updates based on settings
  useEffect(() => {
    if (!settings) return;

    const updateInterval = setInterval(() => {
      if (Date.now() - lastUpdate >= settings.updateFrequency) {
        setLastUpdate(Date.now());
      }
    }, 60000); // Check every minute

    return () => clearInterval(updateInterval);
  }, [settings, lastUpdate]);

  // Fetch weather data
  useEffect(() => {
    if (!lat || !lon || !settings) return;

    const units = "metric";
    const currentApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    const hourlyApiURL = `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    const dailyApiURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=${units}`;

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
          return forecastHour <= currentHour + 5;
        });

        const nextFiveHours = filteredForecasts.slice(0, 5).map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          imgSrc: getWeatherIcon(item.weather[0].icon),
          alt: item.weather[0].description,
          temp: formatTemperature(item.main.temp),
        }));

        setHourlyTemps([
          { 
            time: "Now", 
            imgSrc: weatherIcon, 
            alt: "Current weather", 
            temp: currentWeather ? formatTemperature(currentWeather) : "Loading..." 
          }, 
          ...nextFiveHours
        ]);
      })
      .catch((error) => console.error("❌ Error fetching weather data:", error));

    fetch(dailyApiURL)
      .then((response) => response.json())
      .then((data) => {
        if (!data.list) throw new Error("Invalid API response format");

        const nextSevenDays = data.list.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          return {
            day: index === 0 ? "Today" : dayName,
            temp: `${formatTemperature(item.temp.max, true)}/${formatTemperature(item.temp.min, true)}`,
            imgSrc: getWeatherIcon(item.weather[0].icon),
            alt: item.weather[0].description,
          };
        });

        setDailyTemps(nextSevenDays);
      })
      .catch((error) => console.error("❌ Error fetching daily forecast:", error));
  }, [lat, lon, lastUpdate, settings, currentWeather, weatherIcon]);

  function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

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

  const appClasses = `app${darkMode ? ' dark-mode' : ''}${dynamicBackground ? ' dynamic-background' : ''}`;

  return (
    <section className={appClasses}>
      {/* Location flex box */}
      <section className="home-locationBox">
        <div className="home-weatherimage">
          <img src="/locationimage.png" alt="Background" />
        </div>
        <div className="home-locationtext">
          <h1>{city ? `${city}` : "Loading location..."}</h1>
        </div>
      </section>
      {/* Weather flex box */}
      <section className="home-weatherBox">
        <div className="home-currentweather">
          <h1>{currentWeather ? formatTemperature(currentWeather) : "Loading..."}</h1>
        </div>
        <div className="home-weathericon">
          <img
            src={weatherIcon || "/defaultIcon.png"}
            alt="Current Weather"
          />
        </div>
        <div className="home-windspeed">
          <h1>{windSpeed ? `Wind Speed: ${windSpeed} mph` : "Loading wind speed..."}</h1>
        </div>
        <div className="home-feelslike">
          <h1>
            {feelsLike !== null
              ? `Feels like ${formatTemperature(feelsLike)}`
              : "Loading feels like..."}
          </h1>
        </div>
      </section>
      {/* Hourly temperature overview */}
      <section className="home-tempBox">
        {hourlyTemps.map((hourlyTemp, index) => (
          <div className="home-miniTemp" key={index}>
            <h1>{hourlyTemp.time}</h1>
            <img src={hourlyTemp.imgSrc} alt={hourlyTemp.alt} />
            <h1>{hourlyTemp.temp}</h1>
          </div>
        ))}
        <div className="home-miniTemp">
          <h1>More</h1>
          <Link to="/graph" className="miniTempLink">
            ...
          </Link>
          <h1>Details</h1>
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