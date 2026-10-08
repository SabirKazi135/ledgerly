import { NavLink } from "react-router-dom";

type SidebarProps = {
  open: boolean;
};

function Sidebar({ open }: SidebarProps) {
  return (
    <aside
      className={`fixed top-[70px] left-0 z-40 h-[calc(100vh-70px)] w-64 border-r border-gray-200 bg-white p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Profile */}
      <div className="mb-7 mt-3 flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-900">
          SK
        </div>

        <h5 className="font-medium leading-6 text-gray-950">Sabir Kazi</h5>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `mb-2 flex items-center gap-4 rounded-lg px-6 py-3 text-[15px] transition ${
              isActive
                ? "bg-[#16A24A] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/income"
          className={({ isActive }) =>
            `mb-2 flex items-center gap-4 rounded-lg px-6 py-3 text-[15px] transition ${
              isActive
                ? "bg-[#16A24A] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Income
        </NavLink>

        <NavLink
          to="/expense"
          className={({ isActive }) =>
            `mb-2 flex items-center gap-4 rounded-lg px-6 py-3 text-[15px] transition ${
              isActive
                ? "bg-[#16A24A] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Expense
        </NavLink>
      </nav>

      {/* Logout */}
      <button className="mb-3 flex w-full items-center gap-4 rounded-lg px-6 py-3 text-[15px] text-gray-700 hover:bg-gray-100">
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
