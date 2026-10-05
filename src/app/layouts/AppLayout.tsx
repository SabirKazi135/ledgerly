import { NavLink, Outlet } from "react-router-dom";
import Topbar from "../../components/Topbar";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

function AppLayout() {
  const [open, setopen] = useState(false);
  return (
    <div className=" min-h-screen">
      <Topbar open={open} setOpen={setopen} />
      <div className="flex">
        <Sidebar open={open} setOpen={open} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
