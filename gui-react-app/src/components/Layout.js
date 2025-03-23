import React from "react";
import CustomSidebar from "./navbar"; // Import your CustomSidebar
import { Outlet } from "react-router-dom"; // This is used to render the content of each route

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <CustomSidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
