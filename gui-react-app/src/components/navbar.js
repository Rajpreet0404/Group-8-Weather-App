import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu, ProSidebarProvider } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const CustomSidebar = () => {
  return (
    <ProSidebarProvider>
      <Sidebar style={{ height: "100vh", backgroundColor: "#2c3e50", color: "#fff" }}>
        <Menu>
          <MenuItem component={<Link to="/" />}>Home</MenuItem>
          <MenuItem component={<Link to="/settings" />}>Settings</MenuItem>
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  );
};

export default CustomSidebar;
