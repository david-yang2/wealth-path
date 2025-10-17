import useAuth from "./useAuth";
import NavModal from "./NavModal";
import { useState } from "react";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex flex-row justify-between bg-slate-100  px-2 py-5 h-24">
      <div className="relative border-2 border-red-300">
        <i onClick={() => setOpenMenu(true)} className="fa-solid fa-bars text-3xl"></i>
        {openMenu ? <NavModal user={user} setOpenMenu={setOpenMenu} /> : null}
      </div>
      <div className="text-2xl font-bold flex items-center pl-5 border-2 border-red-200 w-1/3">
        Wealth Path
      </div>
    </div>
  );
};

export default NavBar;
