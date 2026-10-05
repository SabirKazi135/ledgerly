function Sidebar({ open, setOpen }) {
  return (
    <aside
      className={`fixed top-[70px] left-0 z-40 h-[calc(100vh-70px)] w-64 border-r border-gray-200 bg-white p-5 transition-transform duration-300 lg:static  lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h1>Sidebar</h1>
    </aside>
  );
}

export default Sidebar;
