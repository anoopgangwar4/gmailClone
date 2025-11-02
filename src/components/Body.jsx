import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Body() {
  return (
    <div className="flex h-[92vh]">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Body;
