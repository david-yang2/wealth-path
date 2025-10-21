import homepageImage from "../assets/homepage.png";
import { useNavigate } from "react-router-dom";
const containerVisual = "border-2 border-red-600";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-around items-center h-full max-w-[95%] ">
      {/* description and button */}
      <div>
        <div
          id="homepageText"
          className={`w-full flex flex-col justify-evenly items-center`}
        >
          <div className="text-5xl text-center font-bold mb-10">
            Welcome to Wealth Path
          </div>
          <div className="text-2xl text-center mb-10 ">
            Manage your finances and plan for the future
          </div>
        </div>
        <div className="w-full flex justify-center">

        <button
          className="bg-blue-500 py-2 px-3 text-white rounded-md"
          onClick={() => navigate("/login")}
          >
          Get Started
        </button>
            </div>
      </div>

      {/* image */}
      <div className="w-full aspect-square mx-auto rounded-2xl overflow-hidden bg-slate-200 flex items-center justify-center">
        <img
          src={homepageImage}
          alt="homepage"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default HomePage;
