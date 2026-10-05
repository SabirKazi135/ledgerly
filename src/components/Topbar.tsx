import { Menu, X } from "lucide-react";
function Topbar({ open, setOpen }) {
  return (
    <div className="flex sticky top-0 gap-5 border-gray-200/50 border-b bg-white px-7 py-3 backdrop-blur-[2px]">
      <button
        className="block text-black lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
      </button>

      <img
        src="logo1.png"
        alt=""
        className="h-14 w-35 cursor-pointer bg-transparent object-contain md:ml-5"
      />
    </div>
  );
}

export default Topbar;
