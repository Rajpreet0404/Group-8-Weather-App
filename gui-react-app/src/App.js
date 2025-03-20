// App.js
import React from "react";
import "./reset.css"
import "./style.css"; // Import the CSS file

function App() {
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

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>Appearance</h1>
        </div>
        <article className="settings darkmode">
          <h1>Dark Mode</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Dynamic Background</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Font Size</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Temperature Unit</h1>
          <h1>test</h1>      
        </article>
      </section>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>Location Settings</h1>
        </div>
        <article className="settings darkmode">
          <h1>Dark Mode</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Dynamic Background</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Font Size</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Temperature Unit</h1>
          <h1>test</h1>      
        </article>
      </section>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>Notification Settings</h1>
        </div>
        <article className="settings darkmode">
          <h1>Dark Mode</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Dynamic Background</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Font Size</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Temperature Unit</h1>
          <h1>test</h1>      
        </article>
      </section>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>About and Support</h1>
        </div>
        <article className="settings darkmode">
          <h1>Dark Mode</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Dynamic Background</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Font Size</h1>
          <h1>test</h1>      
        </article>
        <article className="settings dynamic">
          <h1>Temperature Unit</h1>
          <h1>test</h1>      
        </article>
      </section>
      
    </div>
  );
}

export default App;