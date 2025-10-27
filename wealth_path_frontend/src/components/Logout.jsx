import { useNavigate } from "react-router";
import useAuth from "./auth/useAuth";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const buttonStyle = 'px-10 py-2 text-xl'

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data?.success) setUser(null);
    navigate("/");
  };

  return (
    <div className="h-full w-full bg-slate-300/20 flex justify-center items-center">
      <div id="logout-container" className="h-auto w-auto py-5 flex flex-col justify-center items-center bg-white rounded-2xl">
        <div className="text-2xl font-bold">Logout Confirmation</div>
        <div className="text-center w-[60%] my-3 text-l">Are you sure you want to log out from Wealth Path?</div>
        <div className="flex w-full justify-center">
          <button className={`${buttonStyle} rounded-lg shadow-lg shadow-black-20 hover:bg-slate-100 mr-5`}
          onClick={() => navigate(-1)}>Cancel</button>
          <button className={`${buttonStyle} shadow-lg shadow-red-500/50 hover:bg-red-600 rounded-lg bg-red-500 text-white`} onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
