// App.js
import React from "react";
import "./reset.css"; // Import the CSS file
import "./style.css"; // Import the CSS file

const hourlyTemps = [
  { time: "13:00", imgSrc: "/image5.png", alt: "Sunny",  temp: "21°"},
  { time: "14:00", imgSrc: "/image4.png", alt: "Partly cloudy",  temp: "15°" },
  { time: "15:00", imgSrc: "/image9.png", alt: "Heavy rain",  temp: "13°" },
  { time: "16:00", imgSrc: "/image7.png", alt: "Lightning",  temp: "11°" },
  { time: "17:00", imgSrc: "/image15.png", alt: "Partly cloudy",  temp: "7°" },
];

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

function App() {
  return (
    <section className="app">
      {/* Location flex box */}
      <section className="locationBox">
        <div className="weatherimage">
          <img src="/locationimage.png" alt="Background" />
        </div>
        <div className="locationtext">
          <h1>Current Location</h1>
        </div>
      </section>
      {/* Weather flex box */}
      <section className="weatherBox">
        <div className="currentweather">
          <h1>19°</h1>
        </div>
        <div className="weathericon">
          <img src="/currentweather.png" alt="Current Weather"/>
        </div>
        <div className="windspeed">
          <h1>Wind Speed: 6 mph</h1>
        </div>
        <div className="feelslike">
          <h1>Feels like 19°</h1>
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

export default App;