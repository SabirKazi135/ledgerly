import { Menu, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type TopbarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function Topbar({ open, setOpen }: TopbarProps) {
  return (
    <div className="sticky top-0 z-30 flex items-center gap-5 border-b border-gray-200/50 bg-white px-7 py-3 backdrop-blur-[2px]">
      <button
        type="button"
        className="block text-black lg:hidden"
        aria-label="Toggle sidebar"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
      </button>

      <img
        src="/logo1.png"
        alt="Ledgerly"
        className="h-14 w-35 cursor-pointer bg-transparent object-contain md:ml-5"
      />
    </div>
  );
}

export default Topbar;
