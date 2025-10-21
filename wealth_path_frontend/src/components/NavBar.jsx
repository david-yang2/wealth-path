import useAuth from "./auth/useAuth";
import NavModal from "./NavModal";
import { useState } from "react";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();

  return (
    <div className="max-w-[95%] w-full border-2 border-red-200 flex flex-row justify-between items-center px-2 py-5 h-[56px] my-3">
      <div className="text-2xl font-bold flex items-center">
        Wealth Path
      </div>
      <div className="relativ">
        <i onClick={() => setOpenMenu(true)} className="fa-solid fa-bars text-3xl"></i>
        {openMenu ? <NavModal user={user} setOpenMenu={setOpenMenu} /> : null}
      </div>
    </div>
  );
};

export default NavBar;
