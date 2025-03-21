import React, { useState } from "react";
import "./reset.css";
import "./style.css"; // Import the CSS file
import { Switch } from "@mui/material";

function App() {
  // State for each section
  const initialState = {
    darkMode: false,
    dynamicBackground: false,
    fontSize: false,
    temperatureUnit: false,
  };

  const [settings, setSettings] = useState([
    { ...initialState },
    { ...initialState },
    { ...initialState },
    { ...initialState },
  ]);

  const handleToggle = (sectionIndex, settingKey) => {
    setSettings((prevSettings) =>
      prevSettings.map((section, index) =>
        index === sectionIndex
          ? { ...section, [settingKey]: !section[settingKey] }
          : section
      )
    );
  };

  return (
    <div className="container">
      <nav className="box sidebar">
        <div className="sidebarimage">
          <img src="/sidebaricon.png" alt="sidebar" />
        </div>
      </nav>

      <header className="box title">
        <div className="settingstext">
          <h1>Settings</h1>
        </div>
      </header>

      {/* Reusable Section Component */}
      {[
        { title: "Appearance" },
        { title: "Location Settings" },
        { title: "Notification Settings" },
        { title: "About and Support" },
      ].map((section, sectionIndex) => (
        <section className="box appearance" key={sectionIndex}>
          <div className="appearancetitle">
            <h1>{section.title}</h1>
          </div>
          <article className="settings">
            <h1>Dark Mode</h1>
            <Switch
              checked={settings[sectionIndex].darkMode}
              onChange={() => handleToggle(sectionIndex, "darkMode")}
            />
          </article>
          <article className="settings">
            <h1>Dynamic Background</h1>
            <Switch
              checked={settings[sectionIndex].dynamicBackground}
              onChange={() => handleToggle(sectionIndex, "dynamicBackground")}
            />
          </article>
          <article className="settings">
            <h1>Font Size</h1>
            <Switch
              checked={settings[sectionIndex].fontSize}
              onChange={() => handleToggle(sectionIndex, "fontSize")}
            />
          </article>
          <article className="settings">
            <h1>Temperature Unit</h1>
            <Switch
              checked={settings[sectionIndex].temperatureUnit}
              onChange={() => handleToggle(sectionIndex, "temperatureUnit")}
            />
          </article>
        </section>
      ))}
    </div>
  );
}

export default App;
