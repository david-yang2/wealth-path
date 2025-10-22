import useAuth from "./auth/useAuth";
import NavModal from "./NavModal";
import { useState } from "react";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();

  return (
    <div className='bg-green-400 hidden w-full md:flex flex-row justify-between items-center px-[2.5%] py-5 mb-3'>
      <div className="text-4xl font-bold flex items-center">
        Wealth Path
      </div>
      <div className="relative">
        <i onClick={() => setOpenMenu(true)} className="fa-solid fa-bars text-4xl"></i>
        {openMenu ? <NavModal user={user} setOpenMenu={setOpenMenu} /> : null}
      </div>
    </div>
  );
};

export default NavBar;
