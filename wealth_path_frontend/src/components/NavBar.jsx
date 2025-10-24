import useAuth from "./auth/useAuth";
import NavModal from "./NavModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-green-400 w-full flex flex-row justify-between items-center px-[2.5%] py-5 mb-3">
      <div
        className="text-4xl font-bold flex items-center"
        onClick={() => navigate("/")}
      >
        Wealth Path
      </div>

      {/* Dropdown + Modal */}
      <div className="relative">
        <i
          onClick={() => setOpenMenu(true)}
          className="fa-solid fa-bars text-4xl"
        ></i>
        {openMenu ? <NavModal user={user} onClose={() => setOpenMenu(false)} /> : null}
      </div>
    </div>
  );
};

export default NavBar;
