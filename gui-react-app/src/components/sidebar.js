import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const [closedmenu, setclosemenu] = useState(true);

  const handleclosemenu = () => {
    setclosemenu(!closedmenu);
  };

  return (
    <>
      {/* When sidebar is closed, show only the open menu button */}
      {closedmenu && (
        <div className="openmenu" onClick={handleclosemenu}>
          <img src="../../sidebaricon.png" className="openbutton" alt="Open Menu" />
        </div>
      )}

      {/* When sidebar is open, show full sidebar */}
      <div className={closedmenu ? "sidebarinactive" : "sidebar"}>
        <div className="closemenu" onClick={handleclosemenu}>
          <img src="../../closemenu.png" className="closebutton" alt="Close" />
        </div>
        <div className="greeting">
          <h1>Hello,</h1>
          <h2>John Doe</h2>
        </div>
        <div className="items">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
