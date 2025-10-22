import homepageImage from "../assets/homepage.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col md:flex-row justify-betwen items-center h-full max-w-[85%] md:max-w-[95%]">
      {/* image */}
      <div className="w-full max-w-[70%] md:max-w-[95%] aspect-square mx-auto rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={homepageImage}
          alt="homepage"
          className="object-cover w-full h-full"
        />
      </div>
      {/* description and button */}
      <div className=" w-full max-h-[50%] md:max-h-[100%] md:h-full md:flex md:flex-col md:justify-around p-[5%]">
        <div
          id="homepageText"
          className={`w-full flex flex-col justify-evenly items-center`}
        >
          <div className=" text-3xl md:text-6xl text-center font-bold mb-10">
            Welcome to Wealth Path
          </div>
          <div className="text-xl md:text-3xl text-center mb-10 ">
            Manage your finances and plan for the future
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 md:text-3xl py-[5%] px-[20%] text-white rounded-md"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
