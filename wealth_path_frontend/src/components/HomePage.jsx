import homepageImage from "../assets/homepage.png";
import { useNavigate } from "react-router-dom";
import useAuth from "./auth/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-6"
    id="homepage">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl w-full items-center">
        
        {/* Text Content */}
        <div className="flex flex-col space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Wealth Path
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-xl">
            Your clear path to smarter money decisions and long-term financial confidence.
          </p>

          <ul className="space-y-4 text-lg text-gray-700">
            <li>• Track spending</li>
            <li>• Monitor savings and financial progress</li>
            <li>• Create, update, and manage transactions</li>
            <li>• Stay organized with a complete financial overview</li>
          </ul>

          <div className="flex gap-4">
            <button
              onClick={() => user ? navigate("/dashboard") : navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={homepageImage}
              alt="Wealth Path dashboard preview"
              className="w-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
