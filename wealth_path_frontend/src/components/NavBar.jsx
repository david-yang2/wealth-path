import useAuth from "./auth/useAuth";
import NavModal from "./NavModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      id="nav-component"
      className="bg-black w-full flex flex-row justify-center items-center px-[2.5%] py-5"
    >
      <div className="w-full flex flex-row justify-between max-w-6xl">
        <div
          className="text-4xl text-white font-bold flex items-center"
          onClick={() => navigate("/")}
        >
          Wealth Path
        </div>

        {/* Dropdown + Modal */}
        <div>
          <i
            onClick={() => setOpenMenu(true)}
            className="fa-solid fa-bars text-4xl text-white relative"
          ></i>
          {openMenu ? (
            <NavModal user={user} onClose={() => setOpenMenu(false)} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
