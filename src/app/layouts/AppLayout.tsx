import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function AppLayout() {
  const location = useLocation();

  return <AppLayoutContent key={location.pathname} />;
}

function AppLayoutContent() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Topbar open={open} setOpen={setOpen} />

      <div className="flex">
        <Sidebar open={open} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
