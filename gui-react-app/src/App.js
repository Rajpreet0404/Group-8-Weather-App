import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./pages/settings";
import Home from "./pages/home"
import Sidebar from "./components/sidebar";

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
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;